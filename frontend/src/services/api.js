const API_BASE = import.meta.env.PROD ? "/api" : (import.meta.env.VITE_API_URL || "http://localhost:4000/api");

export const fetchBooks = async ({ page = 1, limit = 12 } = {}) => {
  const response = await fetch(
    `${API_BASE}/books?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
};

export const fetchBookById = async (id) => {
  const response = await fetch(`${API_BASE}/books/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch book details");
  }
  return response.json();
};

export const createBook = async (formData) => {
  const response = await fetch(`${API_BASE}/books`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let errMessage = "Failed to create book";
    try {
      const data = await response.json();
      if (data.message) errMessage = data.message;
    } catch (e) {}
    throw new Error(errMessage);
  }
  return response.json();
};

export const updateBook = async (id, formData) => {
  const response = await fetch(`${API_BASE}/books/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    let errMessage = "Failed to update book";
    try {
      const data = await response.json();
      if (data.message) errMessage = data.message;
    } catch (e) {}
    throw new Error(errMessage);
  }
  return response.json();
};

export const deleteBook = async (id) => {
  const response = await fetch(`${API_BASE}/books/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete book");
  }
  return;
};

export const fetchMembers = async () => {
  const response = await fetch(`${API_BASE}/members`);
  if (!response.ok) {
    throw new Error("Failed to fetch members");
  }
  return response.json();
};

export const fetchLoans = async () => {
  const response = await fetch(`${API_BASE}/loans`);
  if (!response.ok) {
    throw new Error("Failed to fetch loans");
  }
  return response.json();
};
