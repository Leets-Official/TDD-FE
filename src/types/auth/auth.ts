export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}
