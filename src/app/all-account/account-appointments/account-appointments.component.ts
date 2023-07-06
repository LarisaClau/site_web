import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentsUsersService } from 'src/app/services/appointments_users.service';
import { MessageService } from 'src/app/services/message.service';
import { MyAccountService } from 'src/app/services/my-account.service';

@Component({
  selector: 'app-account-appointments',
  templateUrl: './account-appointments.component.html',
  styleUrls: ['./account-appointments.component.scss']
})
export class AccountAppointmentsComponent {

  appointments: any[] = [];

  currentUser: any;
  loggedIn: boolean = false;

  userId: any;

  constructor(
    private router: Router,
    private authService: MyAccountService,
    private appointmentsService: AppointmentsUsersService,
    private cd : ChangeDetectorRef,
    private messageService: MessageService,
    ) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);

    if (this.currentUser) {
      this.loggedIn = true;

      this.currentUser.subscribe(userArray => {
        userArray.forEach(user => {
          this.userId = user.id;
          console.log(this.userId); // va afișa id-ul utilizatorului curent din array
        });
      });

      console.log(this.userId);
      this.appointmentsService.getAppointmentsUsers(this.userId).subscribe(res => {
        if (res.status === 200) {
          this.appointments = res.data;
        }
        console.log(res);
      });
    }

    
  }
         
  deleteAppointment(id_appointments) {
    this.appointmentsService.deleteAppointment(id_appointments).subscribe(res => {
      if (res.status === 200) {
        // Eliminăm produsul din array-ul local
        this.messageService.showMessage(res.message, 'success');
        const index = this.appointments.findIndex(p => p.id_appointments === id_appointments);
        if (index !== -1) {
          this.appointments.splice(index, 1);
        } 
        this.cd.markForCheck();    
      } else {
        this.messageService.showMessage(res.message, 'error');
      }
      console.log(res);
      console.log(id_appointments)
    });
  }

  checkDate(date: string) {
    const current_date = new Date();
    
    const [day, month, year, hour, minute, second] = date.split(/[.,: ]/);
    
    const input_date = new Date(`${month}/${day}/${year} ${hour}:${minute}:${second}`);
    
    console.log(input_date);
    console.log(current_date.toLocaleString());
  
    if (isNaN(input_date.getTime())) {
      console.log('Formatul datei este incorect.');
      return false;
    }
  
    if (input_date < current_date) {
      console.log('A trecut rezervarea.');
      return false;
    }
  
    return true;
  }

}
