import { fetcher } from "./axiosClient";

export const salesApi = {
  getFilterOptions: () => fetcher("/api/salesmen/options"),

  // Data performa salesman berdasarkan filter
  getPerformance: (office, group, salesman) => {
    const params = new URLSearchParams();
    if (office) params.append("office", office);
    if (group) params.append("group", group);
    if (salesman) params.append("salesman", salesman);

    return fetcher(`/api/salesmen/performance?${params.toString()}`);
  },
};