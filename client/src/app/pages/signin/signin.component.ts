import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';
import { Signin } from '../../models/auth';
import { UserService } from '../../services/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit { 
  processLoading: boolean = false; 
  form: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService, private router : Router, private notification : NzNotificationService) {
  
    this.form = fb.group({
    password: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  })
  }

  ngOnInit(): void {

  }

  signin() {
    this.form.markAllAsTouched();
    this.form.markAsDirty();
    if(!this.form.valid)
    {
      this.notification.create('error','error', 'please check fields and try again');
      return;
    }

    this.processLoading = true;
    let data = new Signin();
    data = {...data, ...this.form.value}
    
    this.userService.signIn(data).subscribe({
      next: (res: any) => {
        this.processLoading = false;
        console.log(res);
        this.router.navigateByUrl('/dashboard');
        this.notification.create('success','Success', 'You have successfully logged in');
    },
    })
  }

}
