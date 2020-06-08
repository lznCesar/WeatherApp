import { Component, OnInit, Input } from '@angular/core';
import { ClimaFiltrado } from 'src/app/Interfaces/clima.interfaces';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cards-weather',
  templateUrl: './cards-weather.component.html',
  styleUrls: ['./cards-weather.component.css']
})
export class CardsWeatherComponent implements OnInit {
@Input() climaFiltradoRecibido:ClimaFiltrado;
@Input() mostrarBoton:boolean = false;

  constructor(public router:Router) { }

  ngOnInit(): void {

  }

  AgregarCiudad(){
    const ArrayWeather = this.GetLocalStorage();

    if(this.ChecarNoRepetidos(ArrayWeather)==0){
      ArrayWeather.push(this.climaFiltradoRecibido.NombreCiudad)
      localStorage.setItem('Climas',JSON.stringify(ArrayWeather))
    }else{
      Swal.fire({
        title:'Ciudad repetida',
        icon: "warning",
        text:"Esta ciudad ya se agrego previamente "

      })
    }
    
  }

  public GetLocalStorage(){
    const ArrayWeather = JSON.parse(localStorage.getItem('Climas')) 
    if (ArrayWeather == null){
      return []
    }else{
      return ArrayWeather
    }
  }

  private ChecarNoRepetidos(
    ArrayWeather:Array<ClimaFiltrado>):number{
    // filter se vasa en una condicion y regresa un arreglo nuevo 
    // si se cumple una condicion 
    const ciudades:Array<any> = ArrayWeather.filter(
      clima=>this.climaFiltradoRecibido.NombreCiudad
    )
    return ciudades.length
  }

  public irDetalles(){
    const Ciudad = this.climaFiltradoRecibido.NombreCiudad
    if(!this.mostrarBoton){
      this.router.navigate(['details', Ciudad])
    }
  }
}
