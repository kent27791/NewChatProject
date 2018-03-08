import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  userSignIn: object = {};
  constructor(private location: Location, private router: Router, private authService: AuthService, private toastrService: ToastrService) {

  }

  ngOnInit() {
  }

  signIn() {
    this.authService.signIn(this.userSignIn).subscribe(
      response => {
        localStorage.setItem(environment.tokenName, response.access_token);
        this.toastrService.success('Đăng nhập thành công.');
        this.location.back();
      }, error => {
        console.log(error);
        this.toastrService.error('Đăng nhập không thành công.');
      })
  }
}
