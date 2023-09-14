import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import {RecipesComponent} from "./pages/recipes/recipes.component"
import {AuthComponent} from "./pages/auth/auth.component"
import {VerifyComponent} from "./pages/verify/verify.component"
import {RecipeComponent} from "./pages/recipe/recipe.component"
import {ProfileComponent} from "./pages/profile/profile.component"
import {UnverifiedComponent} from "./pages/unverified/unverified.component"
import {CheckVerificationGuard} from "./guards/check-verification.guard"
import {RecoverComponent} from "./pages/recover/recover.component";
import {ResetPasswordComponent} from "./pages/reset-password/reset-password.component";
import {AboutComponent} from "./pages/about/about.component";

const routes: Routes = [
    {
        path: '',
        component: RecipesComponent
    },
    {
        path: 'login',
        component: AuthComponent
    },
    {
        path: 'join',
        component: AuthComponent
    },
    {
        path: 'recover',
        component: RecoverComponent
    },
    {
        path: 'reset/:id',
        component: ResetPasswordComponent
    },
    {
        path: 'verify/:id',
        component: VerifyComponent
    },
    {
        path: 'unverified',
        component: UnverifiedComponent,
        canActivate: [CheckVerificationGuard]
    },
    {
        path: 'recipes/:id',
        component: RecipeComponent
    },
    {
        path: 'users/:id',
        component: ProfileComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled'
    })],
    providers: [CheckVerificationGuard],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
