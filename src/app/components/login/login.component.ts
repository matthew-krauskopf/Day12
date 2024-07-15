import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Permission } from '../../model/permission';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  snackbar: MatSnackBar = inject(MatSnackBar);

  pattern: string = '\\w{5,}';

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('guest01', [
      Validators.required,
      Validators.pattern(this.pattern),
    ]),
    password: new FormControl('pass123', [
      Validators.required,
      Validators.pattern(this.pattern),
    ]),
  });

  constructor() {
    this.authService
      .watchLoginState()
      .pipe(takeUntilDestroyed())
      .subscribe((permission) => {
        if (permission !== Permission.NONE) {
          this.router.navigate(['dashboard', 'properties']);
        }
      });
  }

  performLogin() {
    if (
      !this.authService.performLogin(
        this.loginForm.value.username,
        this.loginForm.value.password
      )
    ) {
      this.loginForm.markAsTouched();
      this.snackbar.open('Invalid Login Credentials', 'Close', {
        duration: 2000,
      });
    }
  }
}
