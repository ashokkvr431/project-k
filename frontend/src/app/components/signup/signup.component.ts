// signup.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  name: string = "";
  email: string = "";
  password: string = "";
  cpassword: string = "";
  gender: string = "";

  constructor(private http: HttpClient, private router: Router, private registerService: RegisterService) {}

  signin(form: NgForm) {
    console.log(form);
    if(form.invalid) return;

    this.registerService.signup(form.value).subscribe({
      next: (result: any) => {
        if (result.status === "success"){
          alert(result.message);
          form.reset();
          this.router.navigate(['/login']);
        } else {
          alert(result.message);
        }
      },
      error: (err) => {
        if (err.status === 409) {
          alert('This email is already registered. Please login instead.');
        } else {
          alert('Server error');
        }
      }
    })
  }
  
  resetForm() {
    this.name = "";
    this.email = "";
    this.password = "";
    this.cpassword = "";
    this.gender = "";
  }
}
