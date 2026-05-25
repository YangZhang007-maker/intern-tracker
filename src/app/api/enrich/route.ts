import { NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { ShixisengCrawler } from "@/crawler/sources/shixiseng";

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

    const { searchParams } = request.nextUrl;
    const limit = Math.min(50, parseInt(searchParams.get("limit") || "20", 10));

    const db = getDb();

    const { data: jobs, error } = await db
      .from("jobs")
      .select("*")
      .eq("source", "shixiseng")
      .or("apply_url.ilike.%shixiseng.com%,apply_url.ilike.%shixiseng.comhttps%")
      .limit(limit);

    if (error) throw error;
    if (!jobs || jobs.length === 0) {
      return Response.json({ status: "ok", enriched: 0, message: "No jobs need enrichment" });
    }

    const crawler = new ShixisengCrawler();
    let enriched = 0;
    const errors: string[] = [];

    for (const job of jobs) {
      try {
        const officialLink = await crawler.fetchOfficialLink(
          job.source_id,
          `https://www.shixiseng.com/intern/${job.source_id}`
        );

        if (officialLink !== job.apply_url) {
          await db.from("jobs").update({ apply_url: officialLink }).eq("id", job.id);
          enriched++;
        }

        await new Promise((r) => setTimeout(r, 500));
      } catch (e) {
        errors.push(`${job.source_id}: ${e instanceof Error ? e.message : String(e)}`);
      }
    }

    return Response.json({
      status: "ok",
      enriched,
      checked: jobs.length,
      errors: errors.slice(0, 10),
    });
  } catch (e) {
    console.error("POST /api/enrich error:", e);
    return Response.json(
      { status: "error", error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
