import { fetcher } from "./axiosClient";

export const salesApi = {
  // Opsi dropdown filter dinamis dari Supabase
  getFilterOptions: () => fetcher("/salesmen/options"),

  // Data performa salesman berdasarkan filter
  getPerformance: (office, group, salesman) => {
    const params = new URLSearchParams();
    if (office) params.append("office", office);
    if (group) params.append("group", group);
    if (salesman) params.append("salesman", salesman);

    return fetcher(`/salesmen/performance?${params.toString()}`);
  },
};