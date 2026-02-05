export interface ApiResponse<T> {
  datos: T;
}

export interface ApiError {
  error: string;
  detalles?: string[];
}
