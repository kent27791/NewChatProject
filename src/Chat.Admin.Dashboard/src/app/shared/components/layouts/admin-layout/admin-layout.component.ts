import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../modules/authentication/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private authService: AuthService) { 
    
  }

  ngOnInit() {
  }

  logOut(){
    this.authService.logOut();
  }

}
