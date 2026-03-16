import { useState, useEffect } from 'react';
import { violationService } from '@services/violationService';
import { CACHE_KEYS, CACHE_TTL, setCache, getCache } from '@utils/cache';

export function useViolations(initialPage = 1, limit = 10) {
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchViolations = async (pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cacheKey = `${CACHE_KEYS.VIOLATIONS}_p${pageNum}`;
      const cached = getCache(cacheKey);
      if (cached && pageNum === 1) {
        setViolations(cached.violations);
        setHasMore(cached.hasMore);
        setTotal(cached.total);
        setPage(pageNum);
        setLoading(false);
        return;
      }

      // Fetch from API/mock
      const data = await violationService.getViolations(pageNum, limit);

      setViolations(data.violations);
      setHasMore(data.hasMore);
      setTotal(data.total);
      setPage(pageNum);

      // Cache for 6 hours
      setCache(cacheKey, data, CACHE_TTL.LONG);
    } catch (err) {
      setError(err.message || 'Failed to fetch violations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViolations(1);
  }, []);

  const loadMore = () => {
    if (hasMore) {
      fetchViolations(page + 1);
    }
  };

  const refetch = () => {
    fetchViolations(1);
  };

  return {
    violations,
    loading,
    error,
    refetch,
    loadMore,
    hasMore,
    total,
    currentPage: page,
  };
}
