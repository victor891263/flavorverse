import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {Recipe, RecipeBrief, Review} from "../types"
import getApiUrl from "../utilities/getApiUrl"

type GetRecipesQuery = {
    title?: string
    servingsMin?: number
    servingsMax?: number
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

@Injectable({
    providedIn: 'root'
})
export class RecipesService {
    private url = getApiUrl()

    constructor(private http: HttpClient) {}

    getRecipe(id: string | number) {
        return this.http.get<Recipe>(`${this.url}/recipes/${id}`, {
            responseType: 'json',
            headers: new HttpHeaders({
                'Authorization': localStorage.getItem('token') || ''
            })
        })
    }

    getRecipes({ title, servingsMin, servingsMax, ratingMin, ratingMax, tags, ingredients, prepMin, prepMax, cookMin, cookMax }: GetRecipesQuery) {
        const query =
            (`${this.url}/recipes?`) +
            (title ? `title=${title}&` : '') +
            (servingsMin ? `servingsMin=${servingsMin}&` : '') +
            (servingsMax ? `servingsMax=${servingsMax}&` : '') +
            (ratingMin ? `ratingMin=${ratingMin}&` : '') +
            (ratingMax ? `ratingMax=${ratingMax}&` : '') +
            (tags ? `tags=${JSON.stringify(tags)}&` : '') +
            (ingredients ? `ingredients=${JSON.stringify(ingredients)}&` : '') +
            (prepMin ? `prepMin=${prepMin}&` : '') +
            (prepMax ? `prepMax=${prepMax}&` : '') +
            (cookMin ? `cookMin=${cookMin}&` : '') +
            (cookMax ? `cookMax=${cookMax}&` : '')
        return this.http.get<RecipeBrief[]>(query, {
            responseType: 'json'
        })
    }

    getTags() {
        return this.http.get<string[]>(`${this.url}/recipes/tags`, {
            responseType: 'json'
        })
    }

    getIngredients() {
        return this.http.get<string[]>(`${this.url}/recipes/ingredients`, {
            responseType: 'json'
        })
    }

    addRecipe(recipe: FormData) {
        return this.http.post(`${this.url}/recipes`, recipe, {
            responseType: 'text',
            headers: new HttpHeaders({
                'Authorization': localStorage.getItem('token') || ''
            })
        })
    }

    updateRecipe(recipe: FormData, id: string) {
        return this.http.put<Recipe>(`${this.url}/recipes/${id}`, recipe, {
            responseType: 'json',
            headers: new HttpHeaders({
                'Authorization': localStorage.getItem('token') || ''
            })
        })
    }

    deleteRecipe(id: string) {
        return this.http.delete(`${this.url}/recipes/${id}`, {
            responseType: 'text',
            headers: new HttpHeaders({
                'Authorization': localStorage.getItem('token') || ''
            })
        })
    }

    getReview(recipeId: string | number, reviewId: string | number) {
        return this.http.get<Review>(`${this.url}/recipes/${recipeId}/reviews/${reviewId}`, {
            responseType: 'json',
            headers: new HttpHeaders({
                'Authorization': localStorage.getItem('token') || ''
            })
        })
    }

    submitReview(id: string | number, data: ReviewInput) {
        return this.http.post<Recipe>(`${this.url}/recipes/${id}/reviews`, data, {
            responseType: 'json',
            headers: new HttpHeaders({
                'Authorization': localStorage.getItem('token') || '',
                'Content-Type': 'application/json'
            })
        })
    }

    editReview(recipeId: string | number, reviewId: string | number, data) {
        return this.http.put(`${this.url}/recipes/${recipeId}/reviews/${reviewId}`, data, {
            responseType: 'text',
            headers: new HttpHeaders({
                'Authorization': localStorage.getItem('token') || '',
                'Content-Type': 'application/json'
            })
        })
    }

    deleteReview(recipeId: string | number, reviewId: string | number) {
        return this.http.delete(`${this.url}/recipes/${recipeId}/reviews/${reviewId}`, {
            responseType: 'text',
            headers: new HttpHeaders({
                'Authorization': localStorage.getItem('token') || ''
            })
        })
    }

    likeReview(recipeId: string | number, reviewId: string | number) {
        return this.http.post(`${this.url}/recipes/${recipeId}/reviews/${reviewId}/likes`, undefined, {
            responseType: 'text',
            headers: new HttpHeaders({
                'Authorization': localStorage.getItem('token') || ''
            })
        })
    }

    dislikeReview(recipeId: string | number, reviewId: string | number) {
        return this.http.post(`${this.url}/recipes/${recipeId}/reviews/${reviewId}/dislikes`, undefined, {
            responseType: 'text',
            headers: new HttpHeaders({
                'Authorization': localStorage.getItem('token') || ''
            })
        })
    }
}
