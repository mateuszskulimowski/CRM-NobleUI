import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isActiveUser' })
export class IsActiveUserPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) {
      return 'Active';
    }
    return 'Inactive';
  }
}
