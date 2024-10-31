import {Pipe, PipeTransform} from '@angular/core';
import { EUserRole } from '../enums/user.enums';
import { USER_ROLE } from '../constants/user.constants';


@Pipe({
  name: 'mapUserRole',
  standalone: true
})
export class MapUserRolePipe implements PipeTransform {

  transform(role: EUserRole): string {
    if (role) {
      return USER_ROLE[role];
    }
    return '';
  }

}
