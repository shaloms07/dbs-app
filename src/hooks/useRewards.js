import { useState, useEffect } from 'react';
import { rewardsService } from '@services/rewardsService';
import { CACHE_KEYS, CACHE_TTL, setCache, getCache } from '@utils/cache';

export function useRewards(category = null, initialPage = 1, limit = 10) {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchRewards = async (pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cacheKey = `${CACHE_KEYS.REWARDS}_${category || 'all'}_p${pageNum}`;
      const cached = getCache(cacheKey);
      if (cached && pageNum === 1) {
        setRewards(cached.rewards);
        setHasMore(cached.hasMore);
        setTotal(cached.total);
        setPage(pageNum);
        setLoading(false);
        return;
      }

      // Fetch from API/mock
      const data = await rewardsService.getRewards(category, pageNum, limit);

      setRewards(data.rewards);
      setHasMore(data.hasMore);
      setTotal(data.total);
      setPage(pageNum);

      // Cache for 24 hours
      setCache(cacheKey, data, CACHE_TTL.LONG);
    } catch (err) {
      setError(err.message || 'Failed to fetch rewards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const loadMore = () => {
    if (hasMore) {
      fetchRewards(page + 1);
    }
  };

  const refetch = () => {
    fetchRewards(1);
  };

  return {
    rewards,
    loading,
    error,
    refetch,
    loadMore,
    hasMore,
    total,
    currentPage: page,
  };
}
