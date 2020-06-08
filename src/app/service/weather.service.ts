import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apikey = `&appid=9b6508eb11338168e6b765c36b70023b`;

  constructor(private http:HttpClient) { }

  public ObtenerClima(NombreCiudad:string){
    return this.http.get(`${this.url}${NombreCiudad}${this.apikey}`)
  }
}
