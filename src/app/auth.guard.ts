import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MyAccountService } from './services/my-account.service';
import { MessageService } from './services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: MyAccountService, private router: Router, private messageService: MessageService) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;  // Utilizatorul este autentificat, permite accesul
    } else {
      this.messageService.showMessage('Pentru a avea acces la aceasta pagina trebuie sa va conectati!', 'error');
      this.router.navigate(['/login']);  // Utilizatorul nu este autentificat, redirecționează către login
      return false;
    }
  }
}
