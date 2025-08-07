import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  login(email: string, password: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.email === email && user.password === password) {
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
  }
}
