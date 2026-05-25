import * as cheerio from "cheerio";
import { BaseCrawler } from "../base";
import type { CrawlResult, City, JobType } from "@/lib/types";
import { CITY_KEYWORDS } from "@/lib/constants";

const BASE_URL = "https://www.shixiseng.com";

const CS_KEYWORDS = [
  "计算机", "后端开发", "前端开发", "算法工程师",
  "数据分析", "Java", "Python", "Go", "C++",
  "人工智能", "机器学习", "测试开发",
];

const FINANCE_KEYWORDS = [
  "金融", "投行", "量化", "行研", "投资分析",
  "风控", "交易", "基金", "证券", "PE", "VC",
];

const CITY_NAMES: Record<string, City> = {
  "北京": "beijing", "上海": "shanghai", "广州": "guangzhou",
  "深圳": "shenzhen", "杭州": "hangzhou", "成都": "chengdu",
  "南京": "nanjing", "武汉": "wuhan", "西安": "xian",
};

function mapCity(raw: string): City {
  for (const [name, city] of Object.entries(CITY_NAMES)) {
    if (raw.includes(name)) return city;
  }
  return "other";
}

function detectJobType(keywordGroup: "cs" | "finance", title: string, tags: string[]): JobType {
  const fulltimeHints = ["校招", "应届", "全职", "正式"];
  const isFulltime = fulltimeHints.some((h) =>
    title.includes(h) || tags.some((t) => t.includes(h))
  );

  if (keywordGroup === "cs") {
    return isFulltime ? "fulltime_cs" : "intern_cs";
  }
  return isFulltime ? "fulltime_finance" : "intern_finance";
}

function stripIconFont(text: string): string {
  return text
    .replace(/&#x[0-9a-f]+;?/gi, "")
    .replace(/&amp;#x[0-9a-f]+;?/gi, "")
    .replace(/[-]/g, "")
    .replace(/\s+/g, " ")
    .replace(/^-+$/g, "")
    .trim();
}

interface ScrapeResult {
  source_id: string;
  title: string;
  company: string;
  city: string;
  salary: string | null;
  tags: string[];
  link: string;
  description: string;
}

export class ShixisengCrawler extends BaseCrawler {
  name = "shixiseng";

  async fetchPostDate(sourceId: string): Promise<string | null> {
    const url = `${BASE_URL}/intern/${sourceId}`;
    const html = await this.fetch(url);
    if (!html) return null;

    const match = html.match(/j\.refresh\s*=\s*"(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : null;
  }

  private async searchPage(
    keyword: string,
    cityChinese: string,
    page: number
  ): Promise<ScrapeResult[]> {
    const url = `${BASE_URL}/interns?keyword=${encodeURIComponent(keyword)}&city=${encodeURIComponent(cityChinese)}&page=${page}`;
    const html = await this.fetch(url);
    if (!html) return [];

    const $ = cheerio.load(html);
    const results: ScrapeResult[] = [];

    $(".intern-item").each((_, el) => {
      const $el = $(el);

      // Find job title link - must contain /intern/inn_ pattern (not company profile links)
      const titleLink = $el.find("a[href*='/intern/inn_'].title.ellipsis.font");
      const titleRaw = titleLink.text() || titleLink.attr("title") || "";
      const title = stripIconFont(titleRaw);
      if (!title) return;

      const href = titleLink.attr("href") || "";
      const match = href.match(/\/intern\/(inn_[a-z0-9]+)/);
      if (!match) return;
      const sourceId = match[1];

      const salaryRaw = $el.find(".day.font").first().text();
      const salary = stripIconFont(salaryRaw).replace(/[\/\s]*天/, "元/天") || null;

      const cityRaw = $el.find(".city.ellipsis").first().text() || cityChinese;
      const city = stripIconFont(cityRaw);

      const companyEl = $el.find(".intern-detail__company .title.ellipsis");
      const company = stripIconFont(companyEl.attr("title") || companyEl.text() || "");

      const tags: string[] = [];
      $el.find(".intern-label").each((_, tag) => {
        const t = $(tag).attr("title") || $(tag).text();
        const cleaned = stripIconFont(t);
        if (cleaned) tags.push(cleaned);
      });

      const industryEl = $el.find(".intern-detail__company .tip .ellipsis").first();
      const industry = stripIconFont(industryEl.text() || "");
      const description = [industry, ...tags].filter(Boolean).join(" · ");

      results.push({
        source_id: sourceId,
        title,
        company,
        city,
        salary,
        tags,
        link: href.startsWith("http") ? href : `${BASE_URL}${href}`,
        description: description || title,
      });
    });

    return results;
  }

  async scrape(): Promise<CrawlResult[]> {
    const allResults: CrawlResult[] = [];
    const seen = new Set<string>();

    // Fast mode for Vercel Cron (target ~15s), full mode for manual trigger
    const isFast = process.env.VERCEL === "1";
    const cities = isFast ? ["北京", "上海", "深圳"] : ["北京", "上海", "深圳", "杭州", "成都"];
    const csKws = isFast ? ["计算机", "算法工程师"] : CS_KEYWORDS.slice(0, 5);
    const finKws = isFast ? ["金融", "量化"] : FINANCE_KEYWORDS.slice(0, 5);
    const maxPages = isFast ? 1 : 2;
    const pageDelay = isFast ? 500 : 2000;
    const searchDelay = isFast ? 500 : 1500;

    const searches: { keyword: string; city: string; group: "cs" | "finance" }[] = [];
    for (const city of cities) {
      for (const kw of csKws) searches.push({ keyword: kw, city, group: "cs" });
      for (const kw of finKws) searches.push({ keyword: kw, city, group: "finance" });
    }

    for (const search of searches) {
      let page = 1;
      let hasMore = true;

      while (hasMore && page <= maxPages) {
        console.log(`[shixiseng] Searching: ${search.keyword} @ ${search.city} page ${page}`);
        const items = await this.searchPage(search.keyword, search.city, page);

        if (items.length === 0) { hasMore = false; break; }

        for (const item of items) {
          if (seen.has(item.source_id)) continue;
          seen.add(item.source_id);

          // Fetch actual posting date from detail page (skip in fast mode)
          let postedDate = new Date().toISOString().split("T")[0];
          if (!isFast) {
            const realDate = await this.fetchPostDate(item.source_id);
            if (realDate) postedDate = realDate;
            await this.sleep(300);
          }

          allResults.push({
            source_id: item.source_id,
            title: item.title,
            company: item.company,
            city: mapCity(item.city),
            job_type: detectJobType(search.group, item.title, item.tags),
            description: item.description,
            apply_url: item.link,
            posted_date: postedDate,
            salary: item.salary,
          });
        }
        page++;
        await this.sleep(pageDelay);
      }
      await this.sleep(searchDelay);
    }

    return allResults;
  }
}
