import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewUser } from '../../models/NewUser'
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { SesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  //UI
  sign_mode: boolean = true;
  loading: boolean = false;

  //Data management

  formSignIn: FormGroup;
  formSignUp: FormGroup;
  

  //forms validations
  signUpPasswordValue: string;
  signUpComfirmPasswordValue: string;

  errorsSignUp = {
    username: false,
    email: false
  }

  errorsSignIn = {
    email: false,
    password: false
  }

  //postSignUpModel
  newUser: NewUser = new NewUser();
  
  //postSignInModel
  user: User = new User();

  constructor(private SesionService: SesionService ,private AuthService: AuthService ,private formBuilder: FormBuilder, private Ruta: Router) { }

  

  ngOnInit(): void {
    this.SesionService.sesionVerify();
    this.createSigninForm();
    this.createSignupForm();
  }

  //UI
  changeSingnMode = () => {
    this.sign_mode = !this.sign_mode;
  }

  //Data management
  createSigninForm = () => {
    this.formSignIn = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    })
  }

  createSignupForm = () => {
    this.formSignUp = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      comfirmPassword: ['', Validators.compose([
        Validators.required
      ])]
    })
  }

  captureFormSignIn = () => {
    this.loading = true
    this.user = this.formSignIn.value as User;
    this.AuthService.userSignIn(this.user).subscribe((res) => {
      this.errorsSignIn.email = false;
      this.errorsSignIn.password = false;
      localStorage.setItem("token", res.token);
      this.Ruta.navigateByUrl('home');
    },
    (error) => {
      this.loading = false;
      let e = error.error.message;
      
      if(e === "User not found"){
        this.errorsSignIn.email = true;
      }else{
        this.errorsSignIn.email = false;
      }

      if(e === "Invalid password"){
        this.errorsSignIn.password = true;
      }else{
        this.errorsSignIn.password = false;
      }
    },
    () => {
      this.loading = false;
    })
  }

  captureFormSignUp = () => {
    this.loading = true;
    this.newUser = {
      username: this.formSignUp.controls['username'].value,
      email: this.formSignUp.controls['email'].value,
      password: this.formSignUp.controls['comfirmPassword'].value,
    }
    this.AuthService.userSignUp(this.newUser).subscribe((res)=>{
      this.errorsSignUp.username = false;
      this.errorsSignUp.email = false;
      localStorage.setItem("token", res.token);
      this.Ruta.navigateByUrl('home');
    },
    (error) => {
      this.loading = false;
      let e = error.error.message;

      if(e === "The username already exist"){
        this.errorsSignUp.username = true;
      }else{
        this.errorsSignUp.username = false;
      }

      if(e === "The email already exist"){
        this.errorsSignUp.email = true;
      }else{
        this.errorsSignUp.email = false;
      }
    },
    () => {
      this.loading = false;
    })
  }


  

}
