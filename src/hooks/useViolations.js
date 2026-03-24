import { useEffect, useState } from 'react';
import { violationService } from '@services/violationService';
import { CACHE_KEYS, CACHE_TTL, getCache, setCache } from '@utils/cache';
import { useUser } from '@context/UserContext';

export function useViolations(initialPage = 1, limit = 10) {
  const { activeVehicle } = useUser();
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const registrationNumber = activeVehicle?.registrationNumber;

  const fetchViolations = async (pageNum = 1) => {
    if (!registrationNumber) {
      setViolations([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const cacheKey = `${CACHE_KEYS.VIOLATIONS}_${registrationNumber}_p${pageNum}`;
      const cached = getCache(cacheKey);
      if (cached && pageNum === 1) {
        setViolations(cached.violations);
        setHasMore(cached.hasMore);
        setTotal(cached.total);
        setPage(pageNum);
        setLoading(false);
        return;
      }

      const data = await violationService.getViolations(pageNum, limit);
      setViolations(data.violations);
      setHasMore(data.hasMore);
      setTotal(data.total);
      setPage(pageNum);
      setCache(cacheKey, data, CACHE_TTL.LONG);
    } catch (err) {
      setError(err.message || 'Failed to fetch violations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViolations(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationNumber]);

  return {
    violations,
    loading,
    error,
    refetch: () => fetchViolations(1),
    loadMore: () => {
      if (hasMore) fetchViolations(page + 1);
    },
    hasMore,
    total,
    currentPage: page,
  };
}
