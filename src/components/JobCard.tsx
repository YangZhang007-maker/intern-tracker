'use client';
import type { Job } from '@/lib/types';
import { CITY_LABELS, JOB_TYPE_LABELS } from '@/lib/constants';

interface JobCardProps {
  job: Job;
  isApplied: boolean;
  onToggleApplied: (jobId: string) => void;
  onCopyLink: (url: string) => void;
}

export default function JobCard({
  job,
  isApplied,
  onToggleApplied,
  onCopyLink,
}: JobCardProps) {
  const daysAgo = Math.floor(
    (Date.now() - new Date(job.posted_date).getTime()) / 86400000
  );

  return (
    <div
      className={`bg-card border rounded-xl p-5 transition-all hover:shadow-md ${
        isApplied ? 'border-sage/30 opacity-70' : 'border-border'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-base font-semibold text-fg truncate">
              {job.title}
            </h3>
            {isApplied && (
              <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sage/15 text-sage-dark text-[11px] font-medium">
                ✓ 已申请
              </span>
            )}
          </div>
          <p className="text-sm text-fg-secondary mb-2">{job.company}</p>

          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface text-xs text-muted">
              📍 {CITY_LABELS[job.city]}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface text-xs text-muted">
              {JOB_TYPE_LABELS[job.job_type]}
            </span>
            {job.salary && (
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-honey/15 text-xs text-warm font-medium">
                💰 {job.salary}
              </span>
            )}
            <span className="text-xs text-muted">
              {daysAgo === 0
                ? '今天发布'
                : daysAgo === 1
                ? '昨天发布'
                : `${daysAgo}天前发布`}
            </span>
          </div>

          <p className="text-sm text-fg-secondary leading-relaxed line-clamp-2">
            {job.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
        <a
          href={job.apply_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-sage text-white text-sm font-medium hover:bg-sage-dark transition-colors"
        >
          前往申请 ↗
        </a>
        <button
          onClick={() => onCopyLink(job.apply_url)}
          className="px-3 py-1.5 rounded-lg border border-border text-xs text-fg-secondary hover:bg-surface transition-colors cursor-pointer"
        >
          复制链接
        </button>
        <button
          onClick={() => onToggleApplied(job.id)}
          className={`ml-auto px-3 py-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
            isApplied
              ? 'border-sage/50 text-sage-dark hover:bg-sage/5'
              : 'border-border text-fg-secondary hover:bg-surface'
          }`}
        >
          {isApplied ? '取消标记' : '标记已申请'}
        </button>
      </div>
    </div>
  );
}
