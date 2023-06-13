import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RatingComponent } from './components/rating/rating.component';
import { HeaderComponent } from './components/header/header.component';
import { RetrievalWrapperComponent } from './components/retrieval-wrapper/retrieval-wrapper.component';

const routes: Routes = [
    {
        path: '',
        component: RecipesComponent
    },
    {
        path: 'recipes/:id',
        component: RecipeComponent
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

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
