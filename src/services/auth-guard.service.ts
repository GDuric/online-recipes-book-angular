import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators'

@Injectable({ providedIn: 'root'})
export class AuthGuardService implements CanActivate{

    constructor(private authService: AuthService, private router: Router){ }

    canActivate(
        route: ActivatedRouteSnapshot, 
        router: RouterStateSnapshot
        ): boolean | Promise<boolean> | Observable<any> | UrlTree{
            return this.authService.user.pipe(take(1), map(user => {
                const isAuth = !!user; 
                if (isAuth) {
                    return true;
                } else {
                    return this.router.createUrlTree(['/authenticate'])
                }
            }) 
        )
    }
}