import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'url'
})
export class UrlPipe implements PipeTransform {
  transform(value): string {
    if (value && !value.includes('http')) {
      value = 'http://' + value;
    }
    return value;
  }
}
