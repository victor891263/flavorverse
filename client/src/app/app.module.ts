import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RatingComponent } from './components/rating/rating.component';
import { HeaderComponent } from './components/header/header.component';
import { RetrievalWrapperComponent } from './components/retrieval-wrapper/retrieval-wrapper.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PopupComponent } from './components/popup/popup.component';
import { ThemeButtonComponent } from './components/theme-button/theme-button.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecipesSkeletonComponent } from './components/recipes-skeleton/recipes-skeleton.component';
import { RecipeSkeletonComponent } from './components/recipe-skeleton/recipe-skeleton.component';
import { ProfileSkeletonComponent } from './components/profile-skeleton/profile-skeleton.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { EditProfileSkeletonComponent } from './components/edit-profile-skeleton/edit-profile-skeleton.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { UnverifiedComponent } from './pages/unverified/unverified.component';

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
        RecipesSkeletonComponent,
        RecipeSkeletonComponent,
        ProfileSkeletonComponent,
        EditProfileComponent,
        EditProfileSkeletonComponent,
        AddRecipeComponent,
        VerifyComponent,
        UnverifiedComponent,

    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
