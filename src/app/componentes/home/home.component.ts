import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ClimaFiltrado, Clima } from 'src/app/Interfaces/clima.interfaces';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public ArrayClimaFiltrado:Array<ClimaFiltrado> = [];
public loading:boolean = true

  constructor(private router:Router, private AWService:WeatherService ) { 
                this.getLocalStorage()
              }

  ngOnInit(): void {
  }
  IrAgregar(){
    this.router.navigate(['/add'])
  }

  getLocalStorage(){
    const climas = JSON.parse(localStorage.getItem('Climas'))
      if(climas!==null) {
        this.getWeather(climas)
      }
    }
    getWeather(climas:Array<string>){
      //es un abservable 
      from(climas).pipe(
        concatMap((nombreClima) => 
          this.AWService.ObtenerClima(nombreClima)//la respuesta de este get regresa un objeto
          .pipe(
            map((Clima: Clima)=>{
              console.log(Clima)
            //climaFiltrado es una constante de tipo climaFiltrado
            //Para manipular valores de un objeto se cambia el signo = por :
            const climaFiltrado:ClimaFiltrado = {
              NombreCiudad:Clima.name,
              ClimaActual:Clima.weather[0].main,
              TemperaturaActual:Clima.main.temp,
              TemperaturaMaxima:Clima.main.temp_max,
              TemperaturaMinima:Clima.main.temp_min,
              Imagen:Clima.weather[0].icon,
            }
            return climaFiltrado;
            })
            // map
            )
          )
          /*Concat Map */
      ).subscribe(
        (climaFiltrado:ClimaFiltrado)=>{
          this.ArrayClimaFiltrado.push(climaFiltrado);
          console.log(this.ArrayClimaFiltrado);
          if(this.ArrayClimaFiltrado.length == climas.length){
            this.loading = false
          }          
        })
    }
  }


