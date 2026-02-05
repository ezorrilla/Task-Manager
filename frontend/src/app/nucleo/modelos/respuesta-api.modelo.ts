export interface RespuestaApi<T> {
  datos: T;
}

export interface ErrorApi {
  error: string;
  detalles?: string[];
}
