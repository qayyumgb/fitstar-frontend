import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/AuthService/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private toastr: ToastrService,private AuthService:AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.AuthService.logout();
  }
}
