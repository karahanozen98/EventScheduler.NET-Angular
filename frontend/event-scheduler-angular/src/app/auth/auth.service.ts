import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginResponse } from '../shared/models/login.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private usernameSubject = new BehaviorSubject<string | null>(
        localStorage.getItem('user')
    );
    username$ = this.usernameSubject.asObservable();

    constructor(private router: Router) {}

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    // Redirect to login page
    redirectToLogin(): void {
        this.router.navigate(['/login']);
    }

    setLogin(cred: ILoginResponse) {
        localStorage.setItem('token', cred.token);
        this.setUsername(cred.username);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    setUsername(username: string) {
        localStorage.setItem('user', username);
        this.usernameSubject.next(username);
    }

    clearUsername() {
        localStorage.removeItem('user');
        this.usernameSubject.next(null);
    }

    signOut(): void {
        localStorage.removeItem('token');
        this.clearUsername();
        this.router.navigate(['/login']);
    }
}
