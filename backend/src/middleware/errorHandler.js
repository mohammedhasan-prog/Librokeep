const notFound = (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
};

const errorHandler = (err, req, res, next) => {
  console.error("DEBUG ERROR:", err);
  const isCastError = err && err.name === "CastError";

  if (isCastError) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || "Server error" });
};

module.exports = { notFound, errorHandler };
