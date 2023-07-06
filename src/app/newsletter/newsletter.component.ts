import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NewsletterService } from '../services/newsletter.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {

  reactiveForm: FormGroup;
  submitted:boolean = false;

  constructor(private formBuilder: FormBuilder,
              private newsletterService: NewsletterService,
              private messageService: MessageService,) {
    
    this.reactiveForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      },
      )
  }

  get f () {return this.reactiveForm.controls}

  onSubmit() {
    this.submitted = true;
    if(this.reactiveForm.valid) {
      console.log(this.reactiveForm.value);

      const user = {
        email: this.reactiveForm.value.email,
      }
      this.newsletterService.sentNewsletterEmailData(user).subscribe(res => {
        if(res.status === 200) {
          this.messageService.showMessage(res.message, 'success');
        } else {
          this.messageService.showMessage(res.message, 'error');
        }
      });
    }

  }
}
