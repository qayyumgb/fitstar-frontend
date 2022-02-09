import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from 'src/app/AuthInterface/auth.interface';
import { AuthService } from 'src/app/services/AuthService/auth.service';



import { LoginService } from '../../services/LoginService/login.service';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';


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

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router, private authService: AuthService, private loginService: LoginService, private messageService: MessageService) { }

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

    if (this.authService.isLoggedIn()) {
      this.toastr.info('User is Already Login', 'Redirecting', {
        timeOut: 3000,
      })
      this.router.navigate(['dashboard']);

    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.LoginForm.controls;
  }



  onSubmit(): void {
    this.submitted = true;
    if (this.LoginForm.invalid) {
      return;
    }
    else {
      // this.getCodeone()
      this.loginUser()
    }

    console.log(JSON.stringify(this.LoginForm.value, null, 2));
  }




  loginUser() {
    debugger
    this.loginService.LoginUser(this.LoginForm.value)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token)
          this.toastr.success('User login successfully');
          this.router.navigate(['dashboard']);
        },
        error: error => {
          this.toastr.error(`Invalid Credentials.\n ${error}`);
          // this.showError(error)
          this.loading = false;
        }
      });
  }

  showError(error: any) {
    console.log('Authentication Failed');
    this.messageService.add({
      severity: 'error',
      summary: 'Authentication Failed',
      detail: `InValid Email or Password ${error}`,
    });


  }

  showValidUser() {
    console.log('Authentication Passed');
    this.messageService.add({
      severity: 'success',
      summary: 'Authentication Passed',
      detail: `User Login Successfully`,
    });
  }


}
