import { fetcher } from "./axiosClient";

export const salesApi = {
  getFilterOptions: () => fetcher("/api/salesmen/options"),

    getPerformance: (
    office,
    group,
    salesman,
    reportPeriod = "2026-09-01"
  ) => {
    const params = new URLSearchParams();

    if (office) params.append("office", office);
    if (group) params.append("group", group);
    if (salesman) params.append("salesman", salesman);
    if (reportPeriod) params.append("report_period", reportPeriod);

    return fetcher(
      `/api/salesmen/performance?${params.toString()}`
    );
  },
};