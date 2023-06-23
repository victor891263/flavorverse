import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {Recipe, RecipeBrief} from "../types"
import getApiUrl from "../utilities/getApiUrl"

type GetRecipesQuery = {
    title?: string
    servings?: number
    ratingMin?: number
    ratingMax?: number
    tags?: string[]
    ingredients?: string[]
    prepMin?: number
    prepMax?: number
    cookMin?: number
    cookMax?: number
}

type ReviewInput = {
    user: string | number
    body: string
    rating: number
}

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

    getRecipe(id: string | number) {
        return this.http.get<Recipe>(`${this.url}/recipes/${id}`)
    }

    getRecipes({ title, servings, ratingMin, ratingMax, tags, ingredients, prepMin, prepMax, cookMin, cookMax }: GetRecipesQuery) {
        const query =
            (`${this.url}/recipes?`) +
            (title ? `title=${title}&` : '') +
            (servings ? `servings=${servings}&` : '') +
            (ratingMin ? `ratingMin=${ratingMin}&` : '') +
            (ratingMax ? `ratingMax=${ratingMax}&` : '') +
            (tags ? `tags=${JSON.stringify(tags)}&` : '') +
            (ingredients ? `ingredients=${JSON.stringify(ingredients)}&` : '') +
            (prepMin ? `prepMin=${prepMin}&` : '') +
            (prepMax ? `prepMax=${prepMax}&` : '') +
            (cookMin ? `cookMin=${cookMin}&` : '') +
            (cookMax ? `cookMax=${cookMax}&` : '')
        return this.http.get<RecipeBrief[]>(query)
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
