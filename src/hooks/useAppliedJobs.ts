'use client';
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'intern-tracker-applied';

function loadAppliedIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveAppliedIds(ids: Set<string>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export function useAppliedJobs() {
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setAppliedIds(loadAppliedIds());
  }, []);

  const markApplied = useCallback((jobId: string) => {
    setAppliedIds((prev) => {
      const next = new Set(prev);
      next.add(jobId);
      saveAppliedIds(next);
      return next;
    });
  }, []);

  const unmarkApplied = useCallback((jobId: string) => {
    setAppliedIds((prev) => {
      const next = new Set(prev);
      next.delete(jobId);
      saveAppliedIds(next);
      return next;
    });
  }, []);

  const isApplied = useCallback(
    (jobId: string) => appliedIds.has(jobId),
    [appliedIds]
  );

  const toggleApplied = useCallback(
    (jobId: string) => {
      if (appliedIds.has(jobId)) {
        unmarkApplied(jobId);
        return false;
      } else {
        markApplied(jobId);
        return true;
      }
    },
    [appliedIds, markApplied, unmarkApplied]
  );

  return { appliedIds, isApplied, toggleApplied, markApplied, unmarkApplied };
}
