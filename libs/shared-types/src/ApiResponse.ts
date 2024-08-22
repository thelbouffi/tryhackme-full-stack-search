export type ApiResponse<T> = {
  status: 'ok' | 'error' | 'Not Found';
  body?: T;
  message?: string;
};