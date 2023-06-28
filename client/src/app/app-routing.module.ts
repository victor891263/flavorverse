import { NgModule } from '@angular/core'
import { Routes, RouterModule, Router, NavigationStart } from '@angular/router'
import {RecipesComponent} from "./pages/recipes/recipes.component"
import {AuthComponent} from "./pages/auth/auth.component"
import {VerifyComponent} from "./pages/verify/verify.component"
import {RecipeComponent} from "./pages/recipe/recipe.component"
import {ProfileComponent} from "./pages/profile/profile.component"
import {AddRecipeComponent} from "./pages/add-recipe/add-recipe.component"
import {EditProfileComponent} from "./pages/edit-profile/edit-profile.component"
import getCurrentUser from './utilities/getCurrentUser'
import {UnverifiedComponent} from "./pages/unverified/unverified.component";

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
        path: 'verify/:id',
        component: VerifyComponent
    },
    {
        path: 'unverified',
        component: UnverifiedComponent
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
        path: 'new',
        component: AddRecipeComponent
    },
    {
        path: 'settings',
        component: EditProfileComponent
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled'
    })],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
