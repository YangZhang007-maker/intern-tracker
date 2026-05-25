import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Job, FilterParams, JobsResponse } from "./types";
import { PAGE_SIZE } from "./constants";

let client: SupabaseClient | null = null;

export function getDb(): SupabaseClient {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase not configured: set SUPABASE_URL and SUPABASE_ANON_KEY");
  }
  client = createClient(url, key);
  return client;
}

export async function queryJobs(params: FilterParams): Promise<JobsResponse> {
  const db = getDb();
  const { city, jobType, dateFrom, dateTo, page = 1, pageSize = PAGE_SIZE } = params;

  let query = db
    .from("jobs")
    .select("*", { count: "exact" })
    .order("posted_date", { ascending: false });

  if (city) {
    query = query.eq("city", city);
  }
  if (jobType) {
    query = query.eq("job_type", jobType);
  }
  if (dateFrom) {
    query = query.gte("posted_date", dateFrom);
  }
  if (dateTo) {
    query = query.lte("posted_date", dateTo);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) throw error;

  return {
    jobs: (data as Job[]) || [],
    total: count || 0,
    page,
    pageSize,
  };
}

export async function upsertJob(job: Omit<Job, "id" | "created_at" | "updated_at">) {
  const db = getDb();
  const { error } = await db.from("jobs").upsert(
    {
      source: job.source,
      source_id: job.source_id,
      title: job.title,
      company: job.company,
      city: job.city,
      job_type: job.job_type,
      description: job.description,
      apply_url: job.apply_url,
      posted_date: job.posted_date,
      salary: job.salary,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "source,source_id" }
  );
  if (error) throw error;
}
