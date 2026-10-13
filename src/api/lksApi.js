import { fetcher } from "./axiosClient";

export const lksApi = {
  // Ambil data target LKS berdasarkan store_id
  getTargetsByStore: (storeId, periode = "Oct-26") => {
    return fetcher(`/lks/targets/${storeId}?periode=${periode}`);
  },

  // Upload file Excel Rapot
  uploadRapotExcel: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return fetcher("/lks/upload-rapot", {
      method: "POST",
      body: formData,
      headers: {}, // Biarkan browser set boundary multipart/form-data otomatis
    });
  },
};