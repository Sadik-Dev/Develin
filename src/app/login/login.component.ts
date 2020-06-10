import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  isSubmitted  =  false;
  returnUrl: string;

  loginerror: string;

  constructor(private authService: AuthenticationService,private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm  =  this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });

  this.returnUrl = ' ';
  }
  get formControls() { return this.loginForm.controls; }

  async onSubmit() {
    this.isSubmitted = true;

    if(!this.loginForm.invalid){
      let  loggedIn ;
      await this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then(function(res){
        loggedIn = res;
      });
      if(loggedIn){
        this.router.navigate([this.returnUrl]);
  
      }   
      else{
        this.loginerror = "Email of password incorrect";
      }
             
  }
    }


}
