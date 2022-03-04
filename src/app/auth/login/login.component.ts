import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from 'src/app/AuthInterface/auth.interface';
import { AuthService } from 'src/app/services/AuthService/auth.service';



import { LoginService } from '../../services/LoginService/login.service';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { IUserData } from 'src/app/shared/interface/auth.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  submitted = false;
  loading = false;
  showStatus = false;
  alertMessage = ""
  isLoading: boolean = false

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router, private authService: AuthService, private loginService: LoginService,) { }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
      }
    );

    if (this.authService.isAuthenticated()) {
      this.toastr.info('User is Already Login', 'Redirecting', { timeOut: 3000, })
      this.router.navigate(['dashboard']);

    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.LoginForm.controls;
  }


  onSubmit(): void {
    debugger
    this.submitted = true;
    if (this.LoginForm.invalid) {
      return;
    }
    else {
      this.isLoading = true
      this.loginUser();
    }
  }

  loginUser() {
    debugger
    this.isLoading = true;
    this.loginService.loginUser(this.LoginForm.value)
      .subscribe({
        next: (res: IUserData) => {
          if (res.message === 'Successful Login!')
            this.authService.setAccessToken(res.token);
          this.toastr.success(res.message);
          this.router.navigate(['dashboard']);
        },
        error: (error: IUserData) => {
          this.toastr.error('Provided credentials are incorrect, please try again.');
          this.isLoading = false
        }
      });

  }



}



