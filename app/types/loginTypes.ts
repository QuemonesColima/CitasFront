export interface LoginResponse {
  success: boolean;
  error?: string;
}

export interface FetchOptions extends RequestInit {
  timeout?: number;
}
