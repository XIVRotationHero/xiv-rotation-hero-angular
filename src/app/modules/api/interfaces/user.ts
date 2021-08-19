import {UserShort} from "./user-short";
import {OauthClient} from "./oauth-client";

export interface User extends UserShort {
  uniqueToken: string,
  email: string,
  isOAuthUser: boolean,
  oauthClients: OauthClient[]
}
