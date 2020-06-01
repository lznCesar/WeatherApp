import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { from, fromEvent } from 'rxjs';
import { pluck, debounceTime, switchMap, map } from "rxjs/operators";
import { Clima, ClimaFiltrado } from "./../../Interfaces/clima.interfaces";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('inputCiudad')InputCiudad:ElementRef

  private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apikey = `&appid=9b6508eb11338168e6b765c36b70023b`;
  public ClimaFiltrado:ClimaFiltrado = {};

  constructor( private http:HttpClient) { }

  ngOnInit(): void {  }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.ObtenerClimaActual()
  }


  private ObtenerClimaActual(){
    fromEvent(this.InputCiudad.nativeElement, 'keyup')
    .pipe(
      debounceTime(1500),
      pluck('target', 'value'),
      switchMap(nombreCiudad => this.http.get(
        `${this.url}${nombreCiudad}${this.apikey}`).pipe(
          map((clima:Clima)=>{
            return{
              NombreCiudad: clima.name,
              ClimaActual: clima.weather[0].main,
              TemperaturaActual: clima.main.temp,
              TemperaturaMaxima: clima.main.temp_max,
              TemperaturaMinima: clima.main.temp_min,
            }
          })
        )
        )
    )
    .subscribe(
      (objetoFiltrado:ClimaFiltrado) =>
       (this.ClimaFiltrado = objetoFiltrado),
      ()=> this.ObtenerClimaActual()

  )

  }
}
