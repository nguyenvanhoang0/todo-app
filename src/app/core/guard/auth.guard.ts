import { inject } from '@angular/core';
import { CanActivateFn ,Router} from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthApiService } from 'src/app/modules/auth/services/api/auth-api.service';
import {Store} from "@ngrx/store";
import { authActions } from '../store/_auth/_auth.actions';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  const store = inject(Store)

  const authService = inject(AuthApiService)
  const accessToken = localStorage.getItem("accessToken");
  
  if (!accessToken) {
    return router.navigate(['/auth/signIn']);
  }
  return authService.getUserInfo(accessToken).pipe(
    map(res => {
      localStorage.setItem("userInfo", JSON.stringify(res));
      store.dispatch(authActions.saveUserInfo(res));      
      return !!res;
    }),
    catchError((error) => {
      console.error('Error fetching user info:', error);
      router.navigate(['/auth/signIn']);  
      return of(false);
    })
  );
};
