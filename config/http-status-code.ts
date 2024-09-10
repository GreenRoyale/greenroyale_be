const HTTP_STATUS_CODE = {
  200: "Success",
  201: "Created",
  400: "Bad Request",
  401: "Authentication Error",
  404: "Not Found",
  422: "Unprocessable Entity",
  500: "Server Error",
} as const;

export default HTTP_STATUS_CODE;
