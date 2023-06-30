import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {Recipe, RecipeBrief} from "../types"
import getApiUrl from "../utilities/getApiUrl"

type InputRecipe = {
    title: string
    desc: string
    tags: string[]
    nutrition: {
        label: string
        value: string
    }[]
    servings: number
    ingredients: {
        name: string
        quantity: string
    }[]
    duration: {
        prep?: number
        cook?: number
        extra?: number
    }
    steps: string[]
}

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
        return this.http.get<Recipe>(`${this.url}/recipes/${id}`, { responseType: 'json' })
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
        return this.http.get<RecipeBrief[]>(query, { responseType: 'json' })
    }

    getTags() {
        return this.http.get<string[]>(`${this.url}/recipes/tags`, { responseType: 'json' })
    }

    getIngredients() {
        return this.http.get<string[]>(`${this.url}/recipes/ingredients`, { responseType: 'json' })
    }

    submitReview(id: string | number, data: ReviewInput) {
        return this.http.post(`${this.url}/recipes/${id}/reviews`, data, { responseType: 'json', ...httpOptions })
    }

    likeReview(recipeId: string | number, reviewId: string | number) {
        return this.http.post(`${this.url}/recipes/${recipeId}/reviews/${reviewId}/likes`, undefined, { responseType: 'text', ...httpOptions })
    }

    dislikeReview(recipeId: string | number, reviewId: string | number) {
        return this.http.post(`${this.url}/recipes/${recipeId}/reviews/${reviewId}/dislikes`, undefined, { responseType: 'text', ...httpOptions })
    }

    addRecipe(recipe: InputRecipe) {
        return this.http.post<string>(`${this.url}/recipes`, recipe, { responseType: 'json', ...httpOptions })
    }

    updateRecipe(recipe: InputRecipe, id: string) {
        return this.http.put(`${this.url}/recipes/${id}`, { responseType: 'text', ...httpOptions })
    }

    deleteRecipe(id: string) {
        return this.http.delete(`${this.url}/recipes/${id}`, { responseType: 'text', ...httpOptions })
    }
}
