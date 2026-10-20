
import { useEffect, useState } from "react";
import VisitFilters from "./VisitFilters";
import SectionErrorBoundary from "./SectionErrorBoundary";
import VisitStatus from "./VisitStatus";
import StoreInformation from "./StoreInformation";
import ProgramMonitoring from "./ProgramMonitoring";
import RecommendationTable from "./RecommendationTable";
import OrderSummary from "./OrderSummary";
import { sellingToolkitData } from "../../data/sellingToolkitData";
import { salesmanList, dayList } from "../../data/dataSales";
import { salesApi } from "../../api/salesApi";

export default function SellingToolkit() {
  const [selectedSalesman, setSelectedSalesman] = useState(
    salesmanList[0] || ""
  );

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedDay, setSelectedDay] = useState(dayList[0] || "");

  const [stores, setStores] = useState([]);
  const [loadingStores, setLoadingStores] = useState(false);
  const [storeError, setStoreError] = useState("");

  const salesmanNpk = selectedSalesman
    .split(" - ")[0]
    .replace(/^NPK/i, "")
    .trim();

  const selectedStore = stores.find(
    (store) => String(store.cust_no) === String(selectedCustomer)
  );

  const storeProfile = selectedStore?.sellingToolkit;

  // Program dan cross-sell masih menggunakan data mock.
  const data = sellingToolkitData;

  // Mengambil daftar toko berdasarkan salesman yang dipilih.
  useEffect(() => {
    let cancelled = false;

    async function fetchStores() {
      if (!salesmanNpk) {
        setStores([]);
        setSelectedCustomer("");
        setStoreError("");
        setLoadingStores(false);
        return;
      }

      setLoadingStores(true);
      setStoreError("");

      try {
        const response = await salesApi.getStoresBySalesman(
          salesmanNpk
        );

        if (cancelled) return;

        const storeList = Array.isArray(response?.stores)
          ? response.stores
          : [];

        setStores(storeList);

        setSelectedCustomer((currentCustomer) => {
          const customerExists = storeList.some(
            (store) =>
              String(store.cust_no) === String(currentCustomer)
          );

          if (customerExists) {
            return currentCustomer;
          }

          return String(storeList[0]?.cust_no ?? "");
        });
      } catch (error) {
        if (cancelled) return;

        console.error("Gagal mengambil data toko:", error);

        setStores([]);
        setSelectedCustomer("");
        setStoreError(
          error.message || "Gagal mengambil data toko."
        );
      } finally {
        if (!cancelled) {
          setLoadingStores(false);
        }
      }
    }

    fetchStores();

    return () => {
      cancelled = true;
    };
  }, [salesmanNpk]);

  const formatRupiah = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "-";
    }

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(value) || 0);
  };

  const creditLimit = storeProfile
    ? {
        status:
          storeProfile.credit_status ||
          selectedStore?.status_akun ||
          "BELUM DIKETAHUI",
        remainingCredit:
          storeProfile.remaining_credit ??
          selectedStore?.sisa_limit,
        totalLimit:
          storeProfile.total_limit ??
          selectedStore?.plafon_total,
        usedAmount: storeProfile.used_amount,
        usedPercentage: storeProfile.used_percentage,
      }
    : null;

  return (
    <div className="space-y-4 text-slate-800">
      <SectionErrorBoundary section="Filter visit">
        <VisitFilters
          selectedSalesman={selectedSalesman}
          setSelectedSalesman={setSelectedSalesman}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
          salesmanList={salesmanList}
          dayList={dayList}
          stores={stores}
          loadingStores={loadingStores}
          storeError={storeError}
        />
      </SectionErrorBoundary>

      <SectionErrorBoundary section="Status visit">
        <VisitStatus
          storeProfile={storeProfile}
          selectedStore={selectedStore}
          data={data}
        />
      </SectionErrorBoundary>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <SectionErrorBoundary section="Informasi toko">
          <StoreInformation
            selectedStore={selectedStore}
            selectedSalesman={selectedSalesman}
            storeProfile={storeProfile}
            creditLimit={creditLimit}
            formatRupiah={formatRupiah}
          />
        </SectionErrorBoundary>
        <SectionErrorBoundary section="Monitoring program">
          <ProgramMonitoring data={data} />
        </SectionErrorBoundary>
      </div>
      <SectionErrorBoundary section="Rekomendasi cross-sell">
        <RecommendationTable data={data} />
      </SectionErrorBoundary>
      <SectionErrorBoundary section="Ringkasan order">
        <OrderSummary />
      </SectionErrorBoundary>
    </div>
  );
}
