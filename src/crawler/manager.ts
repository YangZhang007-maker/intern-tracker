import { getDb, upsertJob } from "@/lib/db";
import { BaseCrawler } from "./base";
import type { CrawlResponse, CrawlResult } from "@/lib/types";

export class CrawlerManager {
  private crawlers: BaseCrawler[] = [];

  register(crawler: BaseCrawler) {
    this.crawlers.push(crawler);
  }

  async runAll(): Promise<CrawlResponse> {
    const sources: CrawlResponse["sources"] = {};

    const results = await Promise.allSettled(
      this.crawlers.map(async (crawler) => {
        const summary = { scraped: 0, new: 0, errors: [] as string[] };

        let items: CrawlResult[] = [];
        try {
          items = await crawler.scrape();
        } catch (e) {
          summary.errors.push(`Scrape failed: ${e instanceof Error ? e.message : String(e)}`);
          return { name: crawler.name, summary };
        }

        summary.scraped = items.length;

        for (const item of items) {
          try {
            const { data: existing } = await getDb()
              .from("jobs")
              .select("id")
              .eq("source", crawler.name)
              .eq("source_id", item.source_id)
              .maybeSingle();

            if (!existing) summary.new++;

            await upsertJob({
              source: crawler.name,
              source_id: item.source_id,
              title: item.title,
              company: item.company,
              city: item.city,
              job_type: item.job_type,
              description: item.description,
              apply_url: item.apply_url,
              posted_date: item.posted_date,
              salary: item.salary,
            });
          } catch (e) {
            summary.errors.push(`${item.title}: ${e instanceof Error ? e.message : String(e)}`);
          }
        }

        // Small delay between sources
        await new Promise((r) => setTimeout(r, 1000));

        return { name: crawler.name, summary };
      })
    );

    for (const result of results) {
      if (result.status === "fulfilled") {
        sources[result.value.name] = result.value.summary;
      }
    }

    return { status: "ok", sources };
  }
}
