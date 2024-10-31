import {HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError} from "rxjs";
import { API_NOT_ATTACH_ACCESS_TOKEN } from '../constants/api.constants';

export const apiResolverInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const accessToken = localStorage.getItem("accessToken");
  const [reqApi] = req.url.split('?')
  if (accessToken && !API_NOT_ATTACH_ACCESS_TOKEN.some(endpoint => reqApi.endsWith(endpoint))) {
    const reqWithHeader = req.clone({
      headers: req.headers.set('Authorization', accessToken)
        .set('ngrok-skip-browser-warning', 'true'),
    })

    return next(reqWithHeader).pipe(
      catchError(({error}: HttpErrorResponse) => {
        throw error;
      })
    );
  }

  return next(req).pipe(
    catchError(({error}: HttpErrorResponse) => {
      throw error;
    })
  );

};
