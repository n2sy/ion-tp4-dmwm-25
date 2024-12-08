import { Component, inject, OnInit } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private auth = inject(Auth);
  constructor(private router: Router) {}

  register(credentials) {
    createUserWithEmailAndPassword(
      this.auth,
      credentials.email,
      credentials.password
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err;
      });
  }

  login(credentials) {
    signInWithEmailAndPassword(
      this.auth,
      credentials.email,
      credentials.password
    )
      .then((res) => {
        console.log(res);
        this.router.navigateByUrl('/home');
      })
      .catch((err) => {
        err;
      });
  }

  ngOnInit() {}
}
