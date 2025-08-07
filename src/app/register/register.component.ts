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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  roles = ['admin', 'assistant', 'commercial'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    // Vérifier si email existe déjà
    const emailExist = users.find(u => u.email === this.registerForm.value.email);
    if (emailExist) {
      alert('Email déjà utilisé.');
      return;
    }

    users.push(this.registerForm.value);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Inscription réussie ! Veuillez vous connecter.');
    this.router.navigate(['/login']);
  }
}
