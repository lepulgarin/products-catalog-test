import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeLayoutRoutingModule } from './home-layout-routing.module';
import { RegisterComponent } from './register/register.component';
import { HomeLayoutComponent } from './home-layout.component';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomeComponent,
    RegisterComponent,
    CatalogComponent,
    LoginModalComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    HomeLayoutRoutingModule,
    ReactiveFormsModule,
  ],
  bootstrap: [HomeLayoutComponent],
})
export class HomeLayoutModule {}
