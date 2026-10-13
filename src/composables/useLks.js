import { useState, useEffect, useCallback } from "react";

export function useLksTargets(storeId, periode = "Oct-26") {
  const [data, setData] = useState({ targets_l2: [], targets_l4: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Manual refetch saathi function
  const refetch = useCallback(async () => {
    if (!storeId) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/lks/targets/${storeId}?periode=${periode}`
      );
      if (!response.ok) {
        throw new Error("Gagal mengambil data dari server");
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [storeId, periode]);

  // Automatic initial fetch saathi Effect
  useEffect(() => {
    let isCancelled = false;

    if (!storeId) return;

    async function loadData() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/lks/targets/${storeId}?periode=${periode}`
        );
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }
        const result = await response.json();
        if (!isCancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isCancelled = true;
    };
  }, [storeId, periode]);

  return {
    l2Targets: data.targets_l2 || [],
    l4Targets: data.targets_l4 || [],
    loading,
    error,
    refetch,
  };
}