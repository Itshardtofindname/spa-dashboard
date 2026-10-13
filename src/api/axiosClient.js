const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetcher(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
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