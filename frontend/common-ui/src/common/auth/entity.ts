export interface SignInPayload {
  email: string;
  pass: string;
}

export interface SignInResponse {
  username: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserSession {
  accessToken: string;
  refreshToken: string;
}
