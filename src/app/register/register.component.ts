import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MyAccountService } from '../services/my-account.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  reactiveForm: FormGroup;
  submitted: boolean = false;

  message$ = this.messageService.message$;

  constructor(private formBuilder: FormBuilder,
    private myAccountService: MyAccountService,
    private messageService: MessageService) {

    this.reactiveForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      fname: new FormControl(null, [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]),
      confirmationpassword: new FormControl(null, [Validators.required]),
    },
      {
        validators: this.MustMatch('password', 'confirmationpassword')
      }
    )
  }

  get f() { return this.reactiveForm.controls }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.MustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      }
      else {
        matchingControl.setErrors(null);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.reactiveForm.valid) {
      console.log(this.reactiveForm.value);

      const user = {
        name: this.reactiveForm.value.name,
        fname: this.reactiveForm.value.fname,
        birthday: this.reactiveForm.value.birthday,
        email: this.reactiveForm.value.email,
        password: this.reactiveForm.value.password,

      }

      this.myAccountService.sentRegisterUserData(user).subscribe(res => { 
        console.log(res); 
        this.messageService.showMessage(res.message, 'success'); 
      });
      this.reactiveForm.reset();
      this.submitted = false;
    }
  }

  // eye
  showpassword = false;
  showconfirmationpassword = false;

  toggleShow() {
    this.showpassword = !this.showpassword;
  }

  toggleShoww() {
    this.showconfirmationpassword = !this.showconfirmationpassword;
  }

}
