import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallerService } from 'src/app/core/services/api-caller.service';
import { environment } from 'src/environments/environment';
import { IUpdateUser } from '../../types/update-user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.authEndpoint;

  constructor(private _apiCallerService: ApiCallerService) { }

  updateUser(data : IUpdateUser): Observable<string> {        
    return this._apiCallerService.post<IUpdateUser, string>(this.apiUrl.update , data);  
  }
}
