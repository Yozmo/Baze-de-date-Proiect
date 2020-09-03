export interface OAuth2AccessToken {
  access_token: string;
  expires_in: number;
  jti: string;
  refresh_token: string;
  scope: string;
  tokenType: string;
  roles: Array<string>;
}
