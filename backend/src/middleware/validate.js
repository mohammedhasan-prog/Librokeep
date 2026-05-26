const formatIssues = (issues) =>
  issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));

const validate = (schema, source) => (req, res, next) => {
  const result = schema.safeParse(req[source]);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: formatIssues(result.error.issues),
    });
  }

  req[source] = result.data;
  next();
};

const validateBody = (schema) => validate(schema, "body");
const validateParams = (schema) => validate(schema, "params");
const validateQuery = (schema) => validate(schema, "query");

module.exports = { validateBody, validateParams, validateQuery };
