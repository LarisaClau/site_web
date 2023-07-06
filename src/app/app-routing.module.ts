import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { CursuriComponent } from './cursuri/cursuri.component';
import { MagazinComponent } from './magazin/magazin.component';
import { ProgramariUnghiiComponent } from './programari-unghii/programari-unghii.component';
import { DetaliiCursuriComponent } from './detalii-cursuri/detalii-cursuri.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccountComponent } from './all-account/account/account.component';
import { AboutComponent } from './footer/about/about.component';
import { AccountOrdersComponent } from './all-account/account-orders/account-orders.component';
import { AccountReviewsComponent } from './all-account/account-reviews/account-reviews.component';
import { AccountWishlistComponent } from './all-account/account-wishlist/account-wishlist.component';
import { OrderDetailsComponent } from './all-account/account-orders/order-details/order-details.component';
import { ProductComponent } from './magazin/product/product.component';
import { ProductsComponent } from './magazin/products/products.component';
import { CartComponent } from './cart/cart.component';
import { DeliveryComponent } from './cart/delivery/delivery.component';
import { ThanksComponent } from './cart/thanks/thanks.component';
import { ProgramareTehnicianComponent } from './programari-unghii/programare-tehnician/programare-tehnician.component';
import { AccountAppointmentsComponent } from './all-account/account-appointments/account-appointments.component';
import { LogoutComponent } from './logout/logout.component';
import { PayAndDeliveryComponent } from './footer/pay-and-delivery/pay-and-delivery.component';
import { ReturnComponent } from './footer/return/return.component';
import { AuthGuard } from './auth.guard';
import { NonAuthGuard } from './nonAuth.guard';


const routes: Routes=  [
  {path: '', component: HomeComponent},
  {path: 'magazin', component: MagazinComponent},
  {path: 'cursuri', component: CursuriComponent},
  {path: 'programari-unghii', component: ProgramariUnghiiComponent},
  {path: 'detalii-cursuri', component: DetaliiCursuriComponent},
  {path: 'register', component: RegisterComponent, canActivate: [NonAuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NonAuthGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [NonAuthGuard]},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent},
  {path: 'orders', component: AccountOrdersComponent, canActivate: [AuthGuard]},
  {path: 'wishlist', component: AccountWishlistComponent, canActivate: [AuthGuard]},
  {path: 'reviews', component: AccountReviewsComponent, canActivate: [AuthGuard]},
  {path: 'order-details', component: OrderDetailsComponent, canActivate: [AuthGuard]},
  {path: 'product', component: ProductComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'delivery', component: DeliveryComponent, canActivate: [AuthGuard]},
  {path: 'thanks', component: ThanksComponent},
  {path: 'programare', component: ProgramareTehnicianComponent},
  {path: 'appointments', component: AccountAppointmentsComponent, canActivate: [AuthGuard]},
  {path: 'logout', component: LogoutComponent},
  {path: 'pay_delivery', component: PayAndDeliveryComponent},
  {path: 'return', component: ReturnComponent},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
