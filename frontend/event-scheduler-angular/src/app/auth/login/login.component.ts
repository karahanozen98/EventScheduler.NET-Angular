import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IBaseResponse } from '../../shared/models/base.response.model';
import { Router } from '@angular/router';
import { ILoginResponse } from '../../shared/models/login.model';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
    ],
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.handleLogin().subscribe();
        }
    }

    handleLogin() {
        return this.http
            .post<IBaseResponse<ILoginResponse>>('api/v1/auth/login', {
                username: this.loginForm.value.email,
                password: this.loginForm.value.password,
            })
            .pipe(
                map((res) => {
                    if (res.isSuccess) {
                        this.authService.setLogin(res.result);
                        this.router.navigate(['/events']);
                    }
                })
            );
    }
}
