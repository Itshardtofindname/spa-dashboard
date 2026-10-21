
const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"
)
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");

export async function fetcher(endpoint, options = {}) {
  const path = `/${endpoint.replace(/^\/+/, "")}`;

  const headers = new Headers(options.headers || {});
  const isFormData =
    typeof FormData !== "undefined" &&
    options.body instanceof FormData;

  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    throw new Error(
      errorData.detail ||
        `Terjadi kesalahan pada server (${response.status})`
    );
  }

  return response.json();
}

export { BASE_URL as API_BASE_URL };
