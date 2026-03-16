import { useState, useEffect } from 'react';
import { insuranceService } from '@services/insuranceService';
import { CACHE_KEYS, CACHE_TTL, setCache, getCache } from '@utils/cache';

export function useInsurance() {
  const [insurance, setInsurance] = useState(null);
  const [insurers, setInsurers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInsurance = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = getCache(CACHE_KEYS.INSURANCE);
      if (cached) {
        setInsurance(cached);
        setInsurers(cached.insurers || []);
        setLoading(false);
        return;
      }

      // Fetch from API/mock
      const data = await insuranceService.getInsurance();
      setInsurance(data);
      setInsurers(data.insurers || []);

      // Cache for 24 hours
      setCache(CACHE_KEYS.INSURANCE, data, CACHE_TTL.LONG);
    } catch (err) {
      setError(err.message || 'Failed to fetch insurance data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsurance();
  }, []);

  const refetch = () => {
    fetchInsurance();
  };

  return {
    insurance,
    insurers,
    loading,
    error,
    refetch,
  };
}
