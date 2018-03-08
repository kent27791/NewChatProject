import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userSignUp: object = {};
  constructor(private router: Router, private authService: AuthService, private toastrService: ToastrService) {

  }

  ngOnInit() {
  }

  signUp() {
    this.authService.signUp(this.userSignUp).subscribe(
      response => {
        this.toastrService.success('Đăng ký thành công.')
        this.router.navigate(['/autithencation/sign-in']);
      }, error => {
        this.toastrService.error('Đăng ký không thành công.')
      })
  }

}