const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetcher(endpoint, options = {}) {
  const baseUrl = BASE_URL.replace(/\/+$/, "");
  const path = `/${endpoint.replace(/^\/+/, "")}`;

  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Terjadi kesalahan pada koneksi server");
  }

  return response.json();
}