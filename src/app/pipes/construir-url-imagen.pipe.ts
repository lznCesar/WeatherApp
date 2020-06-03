import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'construirUrlImagen'
})
export class ConstruirUrlImagenPipe implements PipeTransform {

  private urlImagen:string ='http://openweathermap.org/img/wn/'
  private urlImagenComplementaria = '@2x.png'

  transform(value:string): unknown {

    console.log(value);
    
    return `${this.urlImagen}${value}${this.urlImagenComplementaria}`
  }

}
