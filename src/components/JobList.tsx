'use client';
import type { Job } from '@/lib/types';
import JobCard from './JobCard';

interface JobListProps {
  jobs: Job[];
  appliedIds: Set<string>;
  onToggleApplied: (jobId: string) => void;
  onCopyLink: (url: string) => void;
}

export default function JobList({
  jobs,
  appliedIds,
  onToggleApplied,
  onCopyLink,
}: JobListProps) {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isApplied={appliedIds.has(job.id)}
          onToggleApplied={onToggleApplied}
          onCopyLink={onCopyLink}
        />
      ))}
    </div>
  );
}
