import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {GetRecipesQuery, Recipe, ReviewInput} from "../types"
import getApiUrl from "../utilities/getApiUrl"

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
})
export class RecipesService {
    private url = getApiUrl()

    constructor(private http: HttpClient) {}

    getRecipes({ title, servings, tags, ingredients, prepMin, prepMax, cookMin, cookMax }: GetRecipesQuery) {
        const query =
            (`${this.url}/recipes?`) +
            (title ? `title=${title}&` : '') +
            (servings ? `servings=${servings}&` : '') +
            (tags ? `tags=${JSON.stringify(tags)}&` : '') +
            (ingredients ? `ingredients=${JSON.stringify(ingredients)}&` : '') +
            (prepMin ? `prep=${prepMin}&` : '') +
            (prepMax ? `prep=${prepMax}&` : '') +
            (cookMin ? `prep=${cookMin}&` : '') +
            (cookMax ? `prep=${cookMax}&` : '')
        return this.http.get<Recipe[]>(query)
    }

    getTags() {
        return this.http.get<string[]>(`${this.url}/recipes/tags`)
    }

    getIngredients() {
        return this.http.get<string[]>(`${this.url}/recipes/ingredients`)
    }

    submitReview(id: string | number, data: ReviewInput) {
        return this.http.post(`${this.url}/recipes/${id}/reviews`, data, httpOptions)
    }

    likeReview(recipeId: string | number, reviewId: string | number) {
        return this.http.post(`${this.url}/recipes/${recipeId}/reviews/${reviewId}/likes`, undefined, httpOptions)
    }

    dislikeReview(recipeId: string | number, reviewId: string | number) {
        return this.http.post(`${this.url}/recipes/${recipeId}/reviews/${reviewId}/dislikes`, undefined, httpOptions)
    }
}
