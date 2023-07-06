import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from 'src/app/services/appointments.service';
import { MyAccountService } from 'src/app/services/my-account.service';
import { ActivatedRoute } from '@angular/router';
import { TehnicianService } from 'src/app/services/tehnician.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-programare-tehnician',
  templateUrl: './programare-tehnician.component.html',
  styleUrls: ['./programare-tehnician.component.scss'],
})
export class ProgramareTehnicianComponent {
  images = [
    {
      imageSrc: '../../assets/unghii1.jpeg',
      imageAlt: 'nature1',
    },
    {
      imageSrc: '../../assets/unghii2.jpg',
      imageAlt: 'nature2',
    },
    {
      imageSrc: '../../assets/unghii3.jpg',
      imageAlt: 'person1',
    },
    {
      imageSrc: '../../assets/unghii4.jpg',
      imageAlt: 'person2',
    },
  ];

  currentUser: any;
  loggedIn: boolean = false;
  userId: any;
  selectedDay: Date | null = null;
  idTehnician : any;
  oraRezervata : any;
  arataConfirmareRezervare : boolean = false;
  priceForService : number;
  tehnician: any[] = [];
  services: any[] = [];
  services_category: any[] = [];
  booleanForHours : boolean = false;
  selectedIdService : any;

  constructor(
    private modalService: NgbModal,
    private appointmentService: AppointmentService,
    private authService: MyAccountService,
    private activatedRoute: ActivatedRoute,
    private tehnicianService: TehnicianService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser) {
      this.loggedIn = true;

      this.currentUser.subscribe((userArray) => {
        userArray.forEach((user) => {
          this.userId = user.id;
          // va afișa id-ul utilizatorului curent din array
        });
      });
    }

      this.idTehnician =
      this.activatedRoute.snapshot.queryParamMap.get('id_tehnician');
    if(this.idTehnician) {
      this.tehnicianService.getTehnician(this.idTehnician).subscribe((res) => {
        if (res.status === 200) {
          this.tehnician = res.data;
        }
        console.log(res);
      });

      this.tehnicianService.getServices(this.idTehnician).subscribe((res) => {
        if (res.status === 200) {
          this.services = res.data;
        }
        console.log(res);
      });
    }
    
    this.tehnicianService.getServicesCategory().subscribe((res) => {
      if (res.status === 200) {
        this.services_category = res.data;
      }
      console.log(res);
    });

  }

  hasAssociatedService(category: any): boolean {
    return this.services.some(service => service.id_category === category.id_category);
  }

  closeResult = '';

  open(content, idService, servicePrice) {
    this.modalService.open(content);
    this.selectedIdService = idService;
    this.priceForService = servicePrice;
  }

  date: Date = new Date();
  daysOfWeek: string[] = [
    'Luni',
    'Marți',
    'Miercuri',
    'Joi',
    'Vineri',
    'Sâmbătă',
    'Duminică',
  ];
  daysInMonth: Date[] = this.getDaysInMonth(this.date);

  updateDate(direction: number) {
    this.date = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + direction,
      1
    );
    this.daysInMonth = this.getDaysInMonth(this.date);
  }

  getDaysInMonth(date: Date) {
    const days = [];
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDay =
      firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1; // adjust index for starting day
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let day = 1;

    // add empty cells before starting day for Monday start
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // add days
    for (day; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }

  getMonthYear(date: Date) {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  isDaySelected(day: Date): boolean {
    return this.selectedDay === day;
  }


  zileLucratoare: any[] = [];
  rezervari: any[] = [];
  zi: any;
  ore: any[] = [];

  // definește funcția de gestionare a evenimentelor pentru clic pe zi
  onDayClick(day: Date) {
    this.booleanForHours = true;
    this.zileLucratoare = [];

    day.setHours(0, 0, 0, 0); // Setează ora la 0 pentru a elimina componenta oră
    this.selectedDay = day; // Păstrează doar data fără timp

    this.appointmentService.getRezervari(this.idTehnician).subscribe( res => {
      this.rezervari = res.data; // rezervarile existente in baza de date


      // Facem un array nou care va contine fieacare zi din saptamana si intervalul in care se lucreaza in ziua respectiva
        const Object = {
          zi: 'Monday',
          interval: this.rezervari[0].monday,
        }
        this.zileLucratoare.push(Object);

        const Object2 = {
          zi: 'Tuesday',
          interval: this.rezervari[0].tuesday,
        }
        this.zileLucratoare.push(Object2);

        const Object3 = {
          zi: 'Wednesday',
          interval: this.rezervari[0].wednesday,
        }
        this.zileLucratoare.push(Object3);

        const Object4 = {
          zi: 'Thursday',
          interval: this.rezervari[0].thursday,
        }
        this.zileLucratoare.push(Object4);

        const Object5 = {
          zi: 'Friday',
          interval: this.rezervari[0].friday,
        }
        this.zileLucratoare.push(Object5);

        const Object6 = {
          zi: 'Saturday',
          interval: this.rezervari[0].saturday,
        }
        this.zileLucratoare.push(Object6);

        const Object7 = {
          zi: 'Sunday',
          interval: this.rezervari[0].sunday,
        }
        this.zileLucratoare.push(Object7);


        // Obtinem numele zilei ce este selectata in calendar ( din variabila day)
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(day);
        const dayIndex = date.getDay();
        this.zi = daysOfWeek[dayIndex];

        // Selectam orele din ziua selectata
        for( let i=0; i<this.zileLucratoare.length; i++) {
          if(this.zi == this.zileLucratoare[i].zi) {
            this.ore = this.getHoursArray(this.zileLucratoare[i].interval); // Stocam in array orele disponibile ( din 2 in 2 ore) in functie de interval
          }

        }

    });
  }

  rezervaOra(ora, booleanOraDejaRezervata : boolean) {
    if(this.authService.isAuthenticated()) {
      if(booleanOraDejaRezervata == false ) {
        this.arataConfirmareRezervare = true;
        this.oraRezervata = ora;
      }
    } else {
      this.messageService.showMessage('Trebuie sa fiti conectat pentru a putea face o rezervare!', 'error');
    }
  }

// Functie pentru a transforma intervalul orar in array de ore din 2 in 2 ore
 getHoursArray(interval: string): number[] {
    const [startHour, endHour] = interval.split(' - ');
    const [start, end] = [parseInt(startHour), parseInt(endHour)];
  
    const hoursArray: number[] = [];
    for (let hour = start; hour <= end; hour += 2) {
      hoursArray.push(hour);
    }
  
    return hoursArray;
  }

  // Functie care verifica daca exista rezervare la o ora, daca exista returneaza true, daca nu exista returneza false
  verificareDacaExistaRezervare(ora: string): boolean {
    const rezervareExista = this.rezervari.some(
      rezervare => rezervare.appointment_hour == ora && rezervare.appointment_date == this.selectedDay.toLocaleString()
    );
    return rezervareExista;
  }

  //Mergem inapoi la ziua selectata
  inapoiLaCalendar() {
    this.arataConfirmareRezervare = false;
  }

  //Inchide calendarul ( modalul )
  closeModal() {
    this.modalService.dismissAll('Cross click');
    this.arataConfirmareRezervare = false;
    this.booleanForHours = false;
    this.selectedDay = new Date();
  }
  
  //Fa rezervarea
  rezervaAcum() {
    this.appointmentService.insertRezervare(this.userId, this.idTehnician, this.selectedDay.toLocaleString(), this.selectedIdService, this.oraRezervata).subscribe( res => {
      console.log(res);
      if(res.status == 200) {
       this.ngOnInit();
       this.closeModal();
       this.messageService.showMessage(res.message, 'success');
      }
    })
  }
}
