import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { API_NOT_ATTACH_ACCESS_TOKEN } from '../constants/api.constants';
import { ModalService } from 'src/app/shared/components/open-modal/services/modal/modal.service';
import { inject } from '@angular/core';
import { RedirectService } from 'src/app/services/redirect/redirect.service';
import { Router } from '@angular/router';

export const apiResolverInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {

  const router = inject(Router);
  const modalService = inject(ModalService);
  const redirectService = inject(RedirectService);

  const accessToken = localStorage.getItem('accessToken');
  const bearerToken = `Bearer ${accessToken}`;

  const [reqApi] = req.url.split('?');
  const shouldSkipToken = API_NOT_ATTACH_ACCESS_TOKEN.some((endpoint) =>
    reqApi.endsWith(endpoint)
  );

  if (accessToken && !shouldSkipToken) {
    const reqWithHeader = req.clone({
      headers: req.headers
        .set('Authorization', bearerToken)
        .set('ngrok-skip-browser-warning', 'true'),
    });

    return next(reqWithHeader).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !shouldSkipToken) {
          redirectService.setRedirectUrl(router.url);
          modalService.show('Unauthorized');
        }
        return throwError(() => error);
      })
    );
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !shouldSkipToken) {
        redirectService.setRedirectUrl(router.url);
        modalService.show('Unauthorized');
      }
      return throwError(() => error);
    })
  );
};
