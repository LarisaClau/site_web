import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  reactiveForm: FormGroup;
  submitted:boolean = false;

  constructor(private formBuilder: FormBuilder) {
    
    this.reactiveForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      })
  
  }

  onSubmit() {
    this.submitted = true;
    if(this.reactiveForm.invalid) {
      return;
    }
  }

  get f () {return this.reactiveForm.controls}
}
