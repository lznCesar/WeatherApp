import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvinCelsius'
})
export class KelvinCelsiusPipe implements PipeTransform {

  transform(value: number): string {
    let celsius:number = Math.floor(value - 273.15)
    return `${celsius}`
  }

}
