import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './componentes/search/search.component';
import { CardsWeatherComponent } from './componentes/cards-weather/cards-weather.component';
import { HttpClientModule } from "@angular/common/http";
import { KelvinCelsiusPipe } from './pipes/kelvin-celsius.pipe';
import { CambiarImagenClimaDirective } from './directives/cambiar-imagen-clima.directive';
import { ConstruirUrlImagenPipe } from './pipes/construir-url-imagen.pipe';
import { HomeComponent } from './componentes/home/home.component';
import { appRouting } from "./app.routes";



@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CardsWeatherComponent,
    KelvinCelsiusPipe,
    CambiarImagenClimaDirective,
    ConstruirUrlImagenPipe,
    HomeComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    appRouting,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
