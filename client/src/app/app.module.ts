import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RatingComponent } from './components/rating/rating.component';
import { HeaderComponent } from './components/header/header.component';
import { RetrievalWrapperComponent } from './components/retrieval-wrapper/retrieval-wrapper.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PopupComponent } from './components/popup/popup.component';
import { ThemeButtonComponent } from './components/theme-button/theme-button.component';
import { ProfileComponent } from './pages/profile/profile.component';

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
        path: 'recipes/:id',
        component: RecipeComponent
    },
    {
        path: 'users/:id',
        component: ProfileComponent
    },
]

@NgModule({
    declarations: [
        AppComponent,
        RecipeComponent,
        RecipesComponent,
        RatingComponent,
        HeaderComponent,
        RetrievalWrapperComponent,
        AuthComponent,
        PopupComponent,
        ThemeButtonComponent,
        ProfileComponent,

    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled'
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
