import { Pipe, PipeTransform } from '@angular/core';
import { Users } from '../../models/users';

@Pipe({
  name: 'searchfilter'
})



export class SearchfilterPipe implements PipeTransform {

  transform(user: Users[],
    searchU: string, searchF: string, searchL: string, searchE: string): Users[] {

    if (!user || !searchE || !searchF || !searchL || !searchU) {
      return user;
    } else {
      return user.filter(data => {
        data.firstName.toLowerCase().indexOf(searchF.toLocaleLowerCase()) !== -1
      });
    }

  }

}

