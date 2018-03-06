import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  userSignIn: object = {};
  constructor(private authService: AuthService) {

  }

  ngOnInit() {
  }

  signIn() {
    console.log(this.userSignIn);
  }

}
