'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type { City, JobType } from '@/lib/types';

export function useJobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => ({
      city: (searchParams.get('city') || undefined) as City | undefined,
      jobType: (searchParams.get('jobType') || undefined) as JobType | undefined,
      page: parseInt(searchParams.get('page') || '1', 10),
    }),
    [searchParams]
  );

  const setFilter = useCallback(
    (key: 'city' | 'jobType' | 'page', value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      if (key !== 'page') {
        params.delete('page');
      }
      router.push(`/?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const setCity = useCallback(
    (city: City | undefined) => setFilter('city', city),
    [setFilter]
  );

  const setJobType = useCallback(
    (jobType: JobType | undefined) => setFilter('jobType', jobType),
    [setFilter]
  );

  const setPage = useCallback(
    (page: number) => setFilter('page', String(page)),
    [setFilter]
  );

  return { filters, setCity, setJobType, setPage };
}
