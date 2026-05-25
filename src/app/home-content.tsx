"use client";
import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import JobList from "@/components/JobList";
import EmptyState from "@/components/EmptyState";
import Toast from "@/components/Toast";
import { useAppliedJobs } from "@/hooks/useAppliedJobs";
import { useJobFilters } from "@/hooks/useJobFilters";
import type { Job, JobsResponse, City, JobType } from "@/lib/types";

export default function HomeContent() {
  const { filters, setCity, setJobType, setPage } = useJobFilters();
  const { appliedIds, toggleApplied } = useAppliedJobs();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters.city) params.set("city", filters.city);
      if (filters.jobType) params.set("jobType", filters.jobType);
      params.set("page", String(filters.page));

      const res = await fetch(`/api/jobs?${params.toString()}`);
      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      const data: JobsResponse = await res.json();
      setJobs(data.jobs);
      setTotal(data.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setJobs([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleToggleApplied = useCallback(
    (jobId: string) => {
      const becameApplied = toggleApplied(jobId);
      setToast(becameApplied ? "已标记为已申请" : "已取消标记");
    },
    [toggleApplied]
  );

  const handleCopyLink = useCallback((url: string) => {
    navigator.clipboard.writeText(url);
    setToast("链接已复制到剪贴板");
  }, []);

  const hasFilters = !!(filters.city || filters.jobType);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-fg">
            实习 & 岗位检索
          </h2>
          <p className="text-sm text-muted mt-1">
            聚焦计算机与金融领域，每日更新
          </p>
        </div>

        <FilterBar
          selectedCity={filters.city}
          selectedJobType={filters.jobType}
          onCityChange={setCity}
          onJobTypeChange={setJobType}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={fetchJobs}
              className="mt-2 text-sm text-red-700 underline cursor-pointer"
            >
              重试
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-sage border-t-transparent" />
            <p className="text-sm text-muted mt-3">加载岗位数据...</p>
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <EmptyState hasFilters={hasFilters} />
        )}

        {!loading && !error && jobs.length > 0 && (
          <>
            <div className="text-xs text-muted mb-4">
              共 {total} 个岗位
            </div>
            <JobList
              jobs={jobs}
              appliedIds={appliedIds}
              onToggleApplied={handleToggleApplied}
              onCopyLink={handleCopyLink}
            />

            {/* Pagination */}
            {total > 10 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  disabled={filters.page <= 1}
                  onClick={() => setPage(filters.page - 1)}
                  className="px-3 py-1.5 rounded-lg border border-border text-sm text-fg-secondary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface transition-colors cursor-pointer"
                >
                  上一页
                </button>
                <span className="text-sm text-muted">
                  {filters.page} / {Math.ceil(total / 10)}
                </span>
                <button
                  disabled={filters.page >= Math.ceil(total / 10)}
                  onClick={() => setPage(filters.page + 1)}
                  className="px-3 py-1.5 rounded-lg border border-border text-sm text-fg-secondary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface transition-colors cursor-pointer"
                >
                  下一页
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-border py-6 text-center">
        <p className="text-xs text-muted">
          InternTracker — 中国实习 & 岗位信息聚合 · 数据每日更新
        </p>
      </footer>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
