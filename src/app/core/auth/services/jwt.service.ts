import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class JwtService {
  getToken(): string {
    return window.sessionStorage["auth_token"];
  }

  getRefresh(): string {
    return window.sessionStorage["refresh_token"];
  }

  saveToken({token, refresh}: {token:string, refresh: string}): void {
    window.sessionStorage["auth_token"] = token;
    window.sessionStorage["refresh_token"] = refresh
  }

  destroyToken(): void {
    window.localStorage.removeItem("auth_token");
    window.localStorage.removeItem("refrehs_token");
  }
}
