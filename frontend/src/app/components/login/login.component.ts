import { Component } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  
  constructor(private registerService: RegisterService, private router: Router) {}

  ngOnInit(): void {
    
  }

  login(form: NgForm) {
    if (form.invalid) return;
    console.log(form);

    this.registerService.login(form.value).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          alert(res.message);
          form.resetForm();
          this.router.navigate(['/student-list']);
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        if (err.status === 401) {
          alert('Invalid credentials');
        } else if (err.status === 404) {
          alert('User not found');
        } else {
          alert('Server error');
        }
      }
    });
  }
}
