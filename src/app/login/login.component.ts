import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  nom: string;
  prenom: string;
  email: string;
  role: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      u => u.email === this.loginForm.value.email && u.password === this.loginForm.value.password
    );

    if (user) {
      this.errorMessage = '';
      alert('Connexion réussie !');
      this.router.navigate(['/home']); // Assure-toi que la route /home existe
    } else {
      this.errorMessage = 'Email ou mot de passe incorrect.';
    }
  }
}
