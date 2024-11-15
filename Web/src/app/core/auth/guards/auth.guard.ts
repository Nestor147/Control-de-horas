import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { Observable } from 'rxjs';
import { MainApplicationService } from '../../../services/core/main-application.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(
    private router: Router,
    private authService: AuthService,
    private maService: MainApplicationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.maService.internalViewNameSelected.next((route.data.permission) ? route.data.permission : null);

    return new Observable<boolean>( observer => {
      observer.next(true);
    });
    // return this.authService.isLoggedIn().pipe(map(logged => {
    //   if (!logged) {
    //     this.maService.loadingContent.next(true);
    //     this.authService.setPreviousPageUrl(state.url);
    //     this.authService.startSignIn().then();
    //     return false;
    //   }
    //   return true;
    // }));

  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn();
  }
}
