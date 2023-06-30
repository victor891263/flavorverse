import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import getCurrentUser from '../utilities/getCurrentUser'

@Injectable()
export class CheckVerificationGuard implements CanActivate {
    currentUser = getCurrentUser()

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.currentUser.isVerified) {
            this.router.navigate(['/'])
            return false
        }
        return true
    }
}

