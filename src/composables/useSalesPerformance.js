import { useState, useEffect, useCallback } from "react";
import { salesApi } from "../api/salesApi";

export function useSalesPerformance() {
  // State Opsi Filter (Dinamis dari Database)
  const [options, setOptions] = useState({ offices: [], groups: [], salesmen: [] });
  
  // State Filter Terpilih
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedSalesman, setSelectedSalesman] = useState("");

  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Ambil Opsi Filter Saat Komponen Pertama Kali Di-mount
  useEffect(() => {
    let isCancelled = false;

    async function loadOptions() {
      try {
        const res = await salesApi.getFilterOptions();
        if (!isCancelled && res) {
          setOptions(res);
          if (res.offices?.length) setSelectedOffice(res.offices[0]);
          if (res.groups?.length) setSelectedGroup(res.groups[0]);
          if (res.salesmen?.length) setSelectedSalesman(res.salesmen[0]);
        }
      } catch (err) {
        if (!isCancelled) {
          setError("Gagal memuat opsi filter dari server: " + err.message);
        }
      }
    }

    loadOptions();

    return () => {
      isCancelled = true;
    };
  }, []);

  // 2. Ambil Performa Salesman Berdasarkan Filter Terpilih
  const fetchPerformance = useCallback(async () => {
    if (!selectedOffice && !selectedGroup && !selectedSalesman) return;

    try {
      setLoading(true);
      setError(null);

      const result = await salesApi.getPerformance(
        selectedOffice,
        selectedGroup,
        selectedSalesman
      );

      setCurrentData(result);
    } catch (err) {
      setError(err.message);
      setCurrentData(null); // Kosongkan data jika tidak ditemukan/error
    } finally {
      setLoading(false);
    }
  }, [selectedOffice, selectedGroup, selectedSalesman]);

  useEffect(() => {
    let isCancelled = false;

    async function loadData() {
      if (!selectedOffice && !selectedGroup && !selectedSalesman) return;

      try {
        setLoading(true);
        const result = await salesApi.getPerformance(
          selectedOffice,
          selectedGroup,
          selectedSalesman
        );

        if (!isCancelled) {
          setCurrentData(result);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
          setCurrentData(null);
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
  }, [selectedOffice, selectedGroup, selectedSalesman]);

  return {
    options,
    selectedOffice,
    setSelectedOffice,
    selectedGroup,
    setSelectedGroup,
    selectedSalesman,
    setSelectedSalesman,
    currentData,
    loading,
    error,
    refetch: fetchPerformance,
  };
}