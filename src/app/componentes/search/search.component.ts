import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { from, fromEvent } from 'rxjs';
import { pluck, debounceTime, switchMap, map, tap } from "rxjs/operators";
import { Clima, ClimaFiltrado } from "./../../Interfaces/clima.interfaces";
import  Swal from "sweetalert2"
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('inputCiudad')InputCiudad:ElementRef

  public ClimaFiltrado:ClimaFiltrado;
  public MostrarTarjeta:boolean=false;

  constructor(private router:Router,private AWService:WeatherService) { }

  ngOnInit(): void {  }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.ObtenerClimaActual()
  }
  IrHome(){
    this.router.navigate([""])
  }

  private ObtenerClimaActual(){
    fromEvent(this.InputCiudad.nativeElement, 'keyup')
    .pipe(
      tap(()=> this.MostrarTarjeta=false),
      debounceTime(1500),
      pluck('target', 'value'),
      switchMap((nombreCiudad:string) =>
      this.AWService.ObtenerClima(nombreCiudad).pipe(
          map((clima:Clima)=>{
            return{
              NombreCiudad: clima.name,
              ClimaActual: clima.weather[0].main,
              TemperaturaActual: clima.main.temp,
              TemperaturaMaxima: clima.main.temp_max,
              TemperaturaMinima: clima.main.temp_min,
              Imagen:clima.weather[0].icon
            }
          })
        )
        )
    )
    .subscribe(
      (objetoFiltrado:ClimaFiltrado) => { 
       this.ClimaFiltrado = objetoFiltrado,
       this.MostrarTarjeta = true
      },

      ()=> {
        Swal.fire({
          icon:'error',
          title:'Hubo un error',
          text: 'El nombre de la ciudad no existe'
        });
        this.ObtenerClimaActual();
      }
        
    )
  }
}
