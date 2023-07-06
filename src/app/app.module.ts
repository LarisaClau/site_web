import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from './magazin/carousel/carousel.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CursuriComponent } from './cursuri/cursuri.component';
import { MagazinComponent } from './magazin/magazin.component';
import { ProgramariUnghiiComponent } from './programari-unghii/programari-unghii.component';
import { DetaliiCursuriComponent } from './detalii-cursuri/detalii-cursuri.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccountComponent } from './all-account/account/account.component';
import { AboutComponent } from './footer/about/about.component';
import { AccountMenuComponent } from './all-account/account-menu/account-menu.component';
import { AccountOrdersComponent } from './all-account/account-orders/account-orders.component';
import { AccountWishlistComponent } from './all-account/account-wishlist/account-wishlist.component';
import { AccountReviewsComponent } from './all-account/account-reviews/account-reviews.component';
import { OrderDetailsComponent } from './all-account/account-orders/order-details/order-details.component';
import { ShopNavbarComponent } from './magazin/shop-navbar/shop-navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';

import { ProductComponent } from './magazin/product/product.component';
import { ProductsComponent } from './magazin/products/products.component';
import { CartComponent } from './cart/cart.component';
import { DeliveryComponent } from './cart/delivery/delivery.component';
import { ThanksComponent } from './cart/thanks/thanks.component';
import { ProgramareTehnicianComponent } from './programari-unghii/programare-tehnician/programare-tehnician.component';
import { AccountAppointmentsComponent } from './all-account/account-appointments/account-appointments.component';
import { LogoutComponent } from './logout/logout.component';
import { MessageComponent } from './message/message.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PayAndDeliveryComponent } from './footer/pay-and-delivery/pay-and-delivery.component';
import { ReturnComponent } from './footer/return/return.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NewsletterComponent,
    HomeComponent,
    CursuriComponent,
    MagazinComponent,
    ProgramariUnghiiComponent,
    DetaliiCursuriComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    AccountComponent,
    AboutComponent,
    AccountMenuComponent,
    AccountOrdersComponent,
    AccountWishlistComponent,
    AccountReviewsComponent,
    OrderDetailsComponent,
    ShopNavbarComponent,
    ProductComponent,
    ProductsComponent,
    CartComponent,
    DeliveryComponent,
    ThanksComponent,
    ProgramareTehnicianComponent,
    AccountAppointmentsComponent,
    LogoutComponent,
    MessageComponent,
    PayAndDeliveryComponent,
    ReturnComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    CommonModule,
    CalendarModule,
    FullCalendarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

