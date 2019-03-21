import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { CountriesComponent } from './countries/countries.component';

import { HttpClientModule} from '@angular/common/http';
import { CountriesService } from '.app/countries/countries.service';
import { SortPipe } from './countries/sort.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],

  providers: [CountriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
