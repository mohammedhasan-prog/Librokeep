const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const fetchBooks = async ({ page = 1, limit = 12 } = {}) => {
  const response = await fetch(
    `${API_BASE}/books?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
};
