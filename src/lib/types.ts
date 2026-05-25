export type City =
  | "beijing"
  | "shanghai"
  | "guangzhou"
  | "shenzhen"
  | "hangzhou"
  | "chengdu"
  | "nanjing"
  | "wuhan"
  | "xian"
  | "other";

export type JobType =
  | "intern_cs"
  | "intern_finance"
  | "fulltime_cs"
  | "fulltime_finance";

export interface Job {
  id: string;
  source: string;
  source_id: string;
  title: string;
  company: string;
  city: City;
  job_type: JobType;
  description: string;
  apply_url: string;
  posted_date: string;
  salary: string | null;
  created_at: string;
  updated_at: string;
}

export interface FilterParams {
  city?: City;
  jobType?: JobType;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  pageSize?: number;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CrawlResult {
  source_id: string;
  title: string;
  company: string;
  city: City;
  job_type: JobType;
  description: string;
  apply_url: string;
  posted_date: string;
  salary: string | null;
}

export interface CrawlSummary {
  scraped: number;
  new: number;
  errors: string[];
}

export interface CrawlResponse {
  status: "ok" | "error";
  sources: Record<string, CrawlSummary>;
}
