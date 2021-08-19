export interface OauthClient {
  oauthProvider: string;
  providerUserId: string;
  providerUsername: string;
  providerUserDiscriminator?: string;
}
