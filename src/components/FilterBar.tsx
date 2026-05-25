'use client';
import { CITIES, JOB_TYPES } from '@/lib/constants';
import type { City, JobType } from '@/lib/types';

interface FilterBarProps {
  selectedCity?: City;
  selectedJobType?: JobType;
  onCityChange: (city: City | undefined) => void;
  onJobTypeChange: (jobType: JobType | undefined) => void;
}

export default function FilterBar({
  selectedCity,
  selectedJobType,
  onCityChange,
  onJobTypeChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label className="block text-xs font-medium text-muted mb-1.5">
          城市
        </label>
        <select
          value={selectedCity || ''}
          onChange={(e) => onCityChange((e.target.value as City) || undefined)}
          className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-sage/50 cursor-pointer"
        >
          <option value="">不限城市</option>
          {CITIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-xs font-medium text-muted mb-1.5">
          岗位类型
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onJobTypeChange(undefined)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              !selectedJobType
                ? 'bg-sage text-white'
                : 'bg-card border border-border text-fg-secondary hover:border-sage/50'
            }`}
          >
            全部
          </button>
          {JOB_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() =>
                onJobTypeChange(
                  selectedJobType === t.value ? undefined : t.value
                )
              }
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                selectedJobType === t.value
                  ? 'bg-sage text-white'
                  : 'bg-card border border-border text-fg-secondary hover:border-sage/50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
