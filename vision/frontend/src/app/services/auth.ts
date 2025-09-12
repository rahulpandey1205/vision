import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    roles: string[];
  };
}

interface RegisterResponse {
  message: string;
  success: boolean;
  token?: string;
  roles?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private tokenKey = 'visitor_management_token';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  login(userData: LoginPayload): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/auth/signin`, userData).pipe(
    tap(response => {
      if (response.accessToken) {
        // 🔐 Save the token
        localStorage.setItem(this.tokenKey, response.accessToken);

        // 🧠 Rebuild the user object manually from response
        const user = {
          id: response.id,
          username: response.username,
          email: response.email,
          roles: response.roles
        };

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem(`${this.tokenKey}_roles`, JSON.stringify(response.roles));
      } else {
        console.warn("Login response missing accessToken:", response);
      }
    }),
    catchError(this.handleError)
  );
}


  // 🧾 REGISTER
  register(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    roles: string[]
  ): Observable<RegisterResponse> {
    const username = `${firstName} ${lastName}`;
    const body = { firstName, lastName, username, email, phone, password, roles };

    return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/signup`, body).pipe(
      tap(response => {
        if (response.token && response.roles) {
          this.storeAuthData(response.token, response.roles);
        }
      }),
      catchError(this.handleError)
    );
  }

  // 📦 STORE AUTH DATA
  private storeAuthData(token: string, roles: string[]): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(`${this.tokenKey}_roles`, JSON.stringify(roles));
  }

  // 🪙 GETTERS
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getStoredRoles(): string[] {
    const roles = localStorage.getItem(`${this.tokenKey}_roles`);
    return roles ? JSON.parse(roles) : [];
  }

  // 🔍 AUTH CHECKS
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getUserRoles(): string[] {
    const token = this.getToken();

    if (!token || token.split('.').length !== 3) {
      console.warn('Invalid or missing token:', token);
      return this.getStoredRoles();
    }

    try {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken?.roles || this.getStoredRoles();
    } catch (err) {
      console.error('JWT decoding failed:', err);
      return this.getStoredRoles();
    }
  }

  // 👑 ROLE CHECKS
  isAdmin(): boolean {
    return this.getUserRoles().includes('ROLE_ADMIN');
  }

  isReceptionist(): boolean {
    return this.getUserRoles().includes('ROLE_RECEPTIONIST');
  }

  // 🚪 LOGOUT
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(`${this.tokenKey}_roles`);
    localStorage.removeItem('user');
  }

  // ⚠️ ERROR HANDLER
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else if (error.error?.message) {
      errorMessage = `Server error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error('[AuthService] ' + errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
