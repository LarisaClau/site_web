import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MyAccountService } from './services/my-account.service';
import { MessageService } from './services/message.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {
  constructor(private authService: MyAccountService, private router: Router, private messageService: MessageService) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.messageService.showMessage('Sunteti deja conectat!', 'error');
      this.router.navigate(['/']);  // Utilizatorul este autentificat, redirecționează către homepage
      return false;
    } else {
      return true; // Permite accesul
    }
  }
}
