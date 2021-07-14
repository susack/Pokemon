import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppComponent } from './app.component';
import { PokeMonService } from './services/pokemon.service';
import { LocalStorageRefService } from "./services/local.storage.ref.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
 BrowserModule, HttpClientModule, BrowserAnimationsModule, 
    MatInputModule,
    MatFormFieldModule,    
    MatAutocompleteModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
  	PokeMonService,
 	HttpClient,
 	LocalStorageRefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
