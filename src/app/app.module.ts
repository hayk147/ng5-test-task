import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { PresenterComponent } from './presenter/presenter.component';
import { ConsumerService } from './consumer.service';


@NgModule({
  declarations: [
    AppComponent,
    PresenterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [ConsumerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
