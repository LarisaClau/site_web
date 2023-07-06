import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AboutUserService } from 'src/app/services/about_user.service';
import { AddressUserService } from 'src/app/services/address_user.service';
import { MessageService } from 'src/app/services/message.service';
import { MyAccountService } from 'src/app/services/my-account.service';
import { PasswordUserService } from 'src/app/services/password_user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  // items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  // expandedIndex = 0;

  text = '';

  //initialText = '';
  //expandedText = 'Textul extins.';
  isExpanded1 = false;
  isExpanded2 = false;
  isExpanded3 = false;
  isExpanded4 = false;

  toggleText() {
    this.isExpanded1 = !this.isExpanded1;
  }

  toggleTextt() {
    this.isExpanded2 = !this.isExpanded2;
  }

  toggleTexttt() {
    this.isExpanded3 = !this.isExpanded3;
  }

  toggleTextttt() {
    this.isExpanded4 = !this.isExpanded4;
  }

  detaliiCont: FormGroup;
  email: FormGroup;
  password: FormGroup;
  address: FormGroup;

  submitted: boolean = false;

  message$ = this.messageService.message$;

  constructor(
    private formBuilder: FormBuilder,
    private authService: MyAccountService,
    private aboutUserService: AboutUserService,
    private addressUserService: AddressUserService,
    private passwordUserService: PasswordUserService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.detaliiCont = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      fname: new FormControl('', [Validators.required]),
      date: new FormControl(),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]),
    });

    this.email = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.password = this.formBuilder.group(
      {
        password: new FormControl(null, [Validators.required]),
        newpassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
        ]),
        confirmationnewpassword: new FormControl(null, [Validators.required]),
      },
      {
        validators: this.MustMatch('newpassword', 'confirmationnewpassword'),
      }
    );

    this.address = this.formBuilder.group({
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
      ]),
    });
  }

  currentUser: any;
  loggedIn: boolean = false;

  userId: any;
  userName: any;
  userFname: any;
  userBirthday: any;
  userPhone: any;
  userEmail: any;
  userAddress: any;
  userCreated: any;

  detailsUser: any;

  ngOnInit(): void {
    console.log(this.f);
    console.log(this.detaliiCont);
    console.log(this.email);

    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);

    if (this.currentUser) {
      this.loggedIn = true;

      this.currentUser.subscribe((userArray) => {
        userArray.forEach((user) => {
          const date = new Date(user.birthday);
          const day = ('0' + date.getDate()).slice(-2);
          const month = ('0' + (date.getMonth() + 1)).slice(-2);
          const year = date.getFullYear();

          this.userId = user.id;
          this.userName = user.name;
          this.userFname = user.fname;
          this.userBirthday = `${year}-${month}-${day}`;
          this.userPhone = user.phone;
          this.userEmail = user.email;
          this.userAddress = user.address;
          this.userCreated = user.created;

          console.log(user.birthday);
          console.log(date);
        });
      });
    }

    // this.route.paramMap.subscribe((params) => {
    //   this.userId = +params.get('id');
    // });
  }

  // constructorr(private formBuilder: FormBuilder) {

  //   this.email = this.formBuilder.group({
  //     email: new FormControl(null, [Validators.required, Validators.email])
  //   })
  // }

  get f() {
    return this.detaliiCont.controls;
  }
  get fo() {
    return this.email.controls;
  }
  get for() {
    return this.password.controls;
  }
  get form() {
    return this.address.controls;
  }
  newUserData: any[] = [];

  onSubmitUserDetails(
    userName: any,
    userFname: any,
    userBirthday: any,
    userPhone: any
  ) {
    this.aboutUserService
      .updateUserDetails(
        this.userId,
        userName,
        userFname,
        userBirthday,
        userPhone
      )
      .subscribe((res) => {
        if (res.status === 200) {
          let storedUserData = JSON.parse(localStorage.getItem('authToken'));
          storedUserData[0].fname = userFname;
          storedUserData[0].name = userName;
          storedUserData[0].birthday = userBirthday;
          storedUserData[0].phone = userPhone;

          localStorage.setItem('authToken', JSON.stringify(storedUserData));

          this.messageService.showMessage(res.message, 'success');
        } else {
          this.messageService.showMessage(res.message, 'error');
        }
      });
  }

  onSubmitUserEmail() {}

  onSubmitUserPassword(userPassword: any, userNewPassword: any) {
    this.passwordUserService
      .updateUserPassword(this.userId, userPassword, userNewPassword)
      .subscribe((res) => {
        if (res.status === 200) {
          let storedUserData = JSON.parse(localStorage.getItem('authToken'));
          storedUserData[0].newpassword = userNewPassword;
          localStorage.setItem('authToken', JSON.stringify(storedUserData));
          this.messageService.showMessage(res.message, 'success');
        } else {
          this.messageService.showMessage(res.message, 'error');
        }
      });
  }

  onSubmitUserAddress(userAddress: any) {
    this.addressUserService
      .updateUserAddress(this.userId, userAddress)
      .subscribe((res) => {
        if (res.status === 200) {
          let storedUserData = JSON.parse(localStorage.getItem('authToken'));
          storedUserData[0].address = userAddress;
          localStorage.setItem('authToken', JSON.stringify(storedUserData));
          this.messageService.showMessage(res.message, 'success');
        } else {
          this.messageService.showMessage(res.message, 'error');
        }
      });
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.MustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // eye
  showpassword = false;
  shownewpassword = false;
  showconfirmationnewpassword = false;

  toggleShow() {
    this.showpassword = !this.showpassword;
  }

  toggleShoww() {
    this.shownewpassword = !this.shownewpassword;
  }

  toggleShowww() {
    this.showconfirmationnewpassword = !this.showconfirmationnewpassword;
  }
}
