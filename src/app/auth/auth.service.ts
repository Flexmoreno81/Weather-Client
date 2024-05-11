import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest } from './login-request';
import { LoginResult } from './login-result';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public tokenKey: string = 'tokenKey';
  private _authStatus = new BehaviorSubject<boolean>(false);
  public authStatus = this._authStatus.asObservable() ; 

  constructor(protected http: HttpClient) { }

  init(): void  {
    if (this.isauthenticated()) {
      this.setAuthStatus(true) ; 
      
    } 
  }
  
  isauthenticated(): boolean {
    return (this.getToken() !== null) ; 

  }
  
  private setAuthStatus(isauthenticated: boolean): void {
      this._authStatus.next(isauthenticated) ; 
  } 
  
  public login(loginRequest: LoginRequest): Observable<LoginResult> {
    let url = `${environment.baseUrl}/api/Admin/Login`;
    return this.http.post<LoginResult>(url, loginRequest)
      .pipe(tap(loginResult => {
        if (loginResult.success) {
          localStorage.setItem(this.tokenKey, loginResult.token);
          this.setAuthStatus(true) ;
        }
      }));
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  LogOut(): void {
    localStorage.removeItem(this.tokenKey); 
    this.setAuthStatus(false) ;
  } 

 
}