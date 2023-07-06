import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MyAccountService } from '../services/my-account.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  reactiveForm: FormGroup;
  submitted: boolean = false;

  message$ = this.messageService.message$;

  constructor(
    private formBuilder: FormBuilder,
    private userService: MyAccountService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.reactiveForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.reactiveForm.invalid) {
      return;
    }
    if (this.reactiveForm.valid) {
      this.userService.sentLoginData(this.reactiveForm.value).subscribe((res) => {
          if(res.status === 200) {
            this.messageService.showMessage(res.message, 'success');
            this.router.navigate(['/']);
          } else {
            this.messageService.showMessage(res.message, 'error');
          }          
        });
    }
  }

  get f() {
    return this.reactiveForm.controls;
  }

  showpassword = false;

  toggleShow() {
    this.showpassword = !this.showpassword;
  }
}
