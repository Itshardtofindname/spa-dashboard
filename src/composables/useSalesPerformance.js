import { useState, useEffect, useMemo, useCallback } from "react";
import { salesApi } from "../api/salesApi";

function sortedUnique(arr) {
  return Array.from(new Set(arr.filter(Boolean))).sort();
}

export function useSalesPerformance(reportPeriod = "2026-09-01") {
  const [rawData, setRawData] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedSalesman, setSelectedSalesman] = useState("");

  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch Opsi Master Pertama Kali & Inisialisasi Filter Awal
  useEffect(() => {
    let ignore = false;

    async function loadOptions() {
      try {
        const res = await salesApi.getFilterOptions();
        if (!ignore && res) {
          const list = res.raw || [];
          setRawData(list);

          if (list.length > 0) {
            const offices = sortedUnique(list.map((item) => item.sales_office));
            const initialOffice =
              offices.find((office) => /^S003\b/i.test(office)) ||
              offices.find((office) => /\bSO\s*3\b/i.test(office)) ||
              offices[0] ||
              "";
            
            // Hitung grup produk awal untuk office terpilih
            const groups = sortedUnique(
              list.filter((i) => i.sales_office === initialOffice).map((i) => i.grup_product)
            );
            const initialGroup = groups[0] || "";

            // Hitung salesman awal untuk office & group terpilih
            const salesmen = sortedUnique(
              list
                .filter((i) => i.sales_office === initialOffice && i.grup_product === initialGroup)
                .map((i) => i.nama)
            );
            const initialSalesman = salesmen[0] || "";

            // Set state awal secara bersamaan
            setSelectedOffice(initialOffice);
            setSelectedGroup(initialGroup);
            setSelectedSalesman(initialSalesman);
          }
        }
      } catch (err) {
        if (!ignore) setError(err.message);
      }
    }

    loadOptions();
    return () => { ignore = true; };
  }, []);

  // 2. Daftar Opsi Sales Office (Dihitung langsung)
  const availableOffices = useMemo(() => {
    return sortedUnique(rawData.map((i) => i.sales_office));
  }, [rawData]);

  // 3. Daftar Opsi Grup Product berdasarkan Sales Office terpilih
  const availableGroups = useMemo(() => {
    if (!selectedOffice) return [];
    const filtered = rawData.filter((i) => i.sales_office === selectedOffice);
    return sortedUnique(filtered.map((i) => i.grup_product));
  }, [rawData, selectedOffice]);

  // 4. Daftar Opsi Salesman berdasarkan Office & Group terpilih
  const availableSalesmen = useMemo(() => {
    if (!selectedOffice || !selectedGroup) return [];
    const filtered = rawData.filter(
      (i) => i.sales_office === selectedOffice && i.grup_product === selectedGroup
    );
    return sortedUnique(filtered.map((i) => i.nama));
  }, [rawData, selectedOffice, selectedGroup]);

  // 5. Handler Perubahan Filter (Mencegah setState di useEffect)
  const handleOfficeChange = (newOffice) => {
    setSelectedOffice(newOffice);

    const groups = sortedUnique(
      rawData.filter((i) => i.sales_office === newOffice).map((i) => i.grup_product)
    );
    const newGroup = groups[0] || "";
    setSelectedGroup(newGroup);

    const salesmen = sortedUnique(
      rawData
        .filter((i) => i.sales_office === newOffice && i.grup_product === newGroup)
        .map((i) => i.nama)
    );
    setSelectedSalesman(salesmen[0] || "");
  };

  const handleGroupChange = (newGroup) => {
    setSelectedGroup(newGroup);

    const salesmen = sortedUnique(
      rawData
        .filter((i) => i.sales_office === selectedOffice && i.grup_product === newGroup)
        .map((i) => i.nama)
    );
    setSelectedSalesman(salesmen[0] || "");
  };

  const handleSalesmanChange = (newSalesman) => {
    setSelectedSalesman(newSalesman);
  };

  // 6. Fetch Data Performa dari API ketika Filter Berubah
  const fetchPerformance = useCallback(async () => {
    if (!selectedSalesman) return;

    setLoading(true);
    setError(null);

    try {
      const result = await salesApi.getPerformance(
        selectedOffice,
        selectedGroup,
        selectedSalesman,
        reportPeriod
      );
      setCurrentData(result);
    } catch (err) {
      setError(err.message);
      setCurrentData(null);
    } finally {
      setLoading(false);
    }
  }, [selectedOffice, selectedGroup, selectedSalesman, reportPeriod]);

  useEffect(() => {
    let ignore = false;
    if (!selectedSalesman) return;

    async function loadData() {
      setLoading(true);
      try {
        const result = await salesApi.getPerformance(
          selectedOffice,
          selectedGroup,
          selectedSalesman,
          reportPeriod
        );
        if (!ignore) {
          setCurrentData(result);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
          setCurrentData(null);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadData();
    return () => { ignore = true; };
  }, [selectedOffice, selectedGroup, selectedSalesman, reportPeriod]);

  return {
    availableOffices,
    availableGroups,
    availableSalesmen,
    selectedOffice,
    setSelectedOffice: handleOfficeChange,
    selectedGroup,
    setSelectedGroup: handleGroupChange,
    selectedSalesman,
    setSelectedSalesman: handleSalesmanChange,
    currentData,
    loading,
    error,
    refetch: fetchPerformance,
  };
}
