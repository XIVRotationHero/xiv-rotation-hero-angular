import {UserShort} from "./user-short";

export interface User extends UserShort {
  uniqueToken: string,
  email: string
}
