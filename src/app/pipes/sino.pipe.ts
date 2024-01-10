import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sino'
})
export class SinoPipe implements PipeTransform {

  transform(value: number): string {
    return value==0 ? "No" : "Si";
  }

}
