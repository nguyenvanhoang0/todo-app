import { Injectable } from '@angular/core';
import { ApiCallerService } from 'src/app/core/services/api-caller.service';
import { IUserInfoResponse } from 'src/app/core/store/_auth/_auth.types';
import { IResponseTemplate } from 'src/app/core/types/api.types';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private _apiCallerService: ApiCallerService) { }

  getUserInfo(accessToken: string) {
    const url = `${environment.authEndpoint.getUserInfo}?access_token=${accessToken}`;
    
    return this._apiCallerService.get<null, IUserInfoResponse>(url).pipe(
      tap(res => console.log('API Response:', res)), // Log toàn bộ phản hồi từ API
      map(res => {
        const userData = res; // Lấy dữ liệu người dùng
        console.log('User Data:', userData); // Log dữ liệu người dùng
        return userData; // Trả về dữ liệu người dùng
      })
    );
  }
}
