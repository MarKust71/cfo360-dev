export interface CustomError extends Error {
  response?: {
    data: () => unknown;
  };
}
