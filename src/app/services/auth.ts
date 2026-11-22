import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environments'; 

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly userSignal = signal<User | null>(null);
  private readonly tokenSignal = signal<string | null>(null);
  private readonly loadingSignal = signal(true);

  readonly user = this.userSignal.asReadonly();
  readonly token = this.tokenSignal.asReadonly();
  readonly isLoading = this.loadingSignal.asReadonly();

  readonly isAuthenticated = computed(
    () => !!this.tokenSignal()
  );

  private readonly apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
    this.restoreSession();
  }
  
  private restoreSession(): void {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        this.userSignal.set(JSON.parse(storedUser) as User);
        this.tokenSignal.set(storedToken);
      }
    } catch (error) {
      console.error('Failed to restore authentication session', error);
      this.clearSession();
    } finally {
      this.loadingSignal.set(false);
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/api/auth/login`, {
        email,
        password
      })
      .pipe(
        tap(response => this.saveSession(response))
      );
  }

  register(
    name: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/api/auth/register`, {
        name,
        email,
        password
      })
      .pipe(
        tap(response => this.saveSession(response))
      );
  }

  private saveSession(response: AuthResponse): void {
    const user: User = {
      _id: response._id,
      name: response.name,
      email: response.email
    };

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', response.token);

    this.userSignal.set(user);
    this.tokenSignal.set(response.token);
  }

  logout(): void {
    this.clearSession();
  }

  private clearSession(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.userSignal.set(null);
    this.tokenSignal.set(null);
  }
}