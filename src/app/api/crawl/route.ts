import { NextRequest } from "next/server";
import { CrawlerManager } from "@/crawler/manager";
import { DemoCrawler } from "@/crawler/sources/demo";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const expectedSecret = process.env.CRON_SECRET;

    if (!expectedSecret) {
      return Response.json({ error: "Server not configured" }, { status: 500 });
    }

    if (!authHeader || authHeader !== `Bearer ${expectedSecret}`) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const manager = new CrawlerManager();
    manager.register(new DemoCrawler());

    // Register additional crawlers here as they are built
    // manager.register(new ShixisengCrawler());
    // manager.register(new NiukeCrawler());

    const result = await manager.runAll();
    return Response.json(result);
  } catch (e) {
    console.error("POST /api/crawl error:", e);
    return Response.json(
      { status: "error", error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
