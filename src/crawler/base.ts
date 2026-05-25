import type { CrawlResult } from "@/lib/types";

export abstract class BaseCrawler {
  abstract name: string;

  private userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  ];

  protected getRandomUA(): string {
    return this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
  }

  protected async fetch(url: string): Promise<string | null> {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": this.getRandomUA(),
          Accept: "text/html,application/json",
          "Accept-Language": "zh-CN,zh;q=0.9",
        },
        signal: AbortSignal.timeout(15_000),
      });
      if (!res.ok) {
        console.warn(`[${this.name}] HTTP ${res.status} for ${url}`);
        return null;
      }
      return await res.text();
    } catch (e) {
      console.warn(`[${this.name}] Fetch error for ${url}:`, e);
      return null;
    }
  }

  protected sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
  }

  abstract scrape(): Promise<CrawlResult[]>;
}
