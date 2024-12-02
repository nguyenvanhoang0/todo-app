import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallerService } from 'src/app/core/services/api-caller.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.authEndpoint;

  constructor(private _apiCallerService: ApiCallerService) { }

  updateUser(data : FormData): Observable<string> {        
    return this._apiCallerService.post<FormData, string>(this.apiUrl.update , data);  
  }
}
