import { NextRequest } from "next/server";
import { queryJobs } from "@/lib/db";
import { PAGE_SIZE } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const city = searchParams.get("city") || undefined;
    const jobType = searchParams.get("jobType") || undefined;
    const dateFrom = searchParams.get("dateFrom") || undefined;
    const dateTo = searchParams.get("dateTo") || undefined;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get("pageSize") || String(PAGE_SIZE), 10)));

    const result = await queryJobs({ city, jobType, dateFrom, dateTo, page, pageSize } as any);
    return Response.json(result);
  } catch (e) {
    console.error("GET /api/jobs error:", e);
    return Response.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
