import {Component, OnInit} from '@angular/core'
import {Recipe, RecipeBrief} from "../../types"
import {RecipesService} from "../../services/recipes.service"
import {HttpErrorResponse} from "@angular/common/http"
import { RecipesSkeletonComponent } from '../../components/recipes-skeleton/recipes-skeleton.component'
import getTimeLabel from '../../utilities/getTimeLabel'
import {recipes} from "../../utilities/recipes"

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit {
    // PROPERTIES

    errorMsg: string
    skeleton = RecipesSkeletonComponent

    recipes: RecipeBrief[]
    allTags: string[]
    allIngredients: string[]

    title: string
    servings: number

    ratingMin: number
    ratingMax: number

    tagKeyword: string
    tags = ['lunch', 'indian']
    get relevantTags() {
        return this.allTags.filter(tag => tag.toLowerCase().includes(this.tagKeyword.toLowerCase()))
    }
    tagErrorMsg: string

    ingredientKeyword: string
    ingredients = ['salt', 'pepper', 'nuts']
    get relevantIngredients() {
        return this.allIngredients.filter(ingredient => ingredient.toLowerCase().includes(this.ingredientKeyword.toLowerCase()))
    }
    ingredientErrorMsg: string

    prepMin: number
    prepMax: number
    cookMin: number
    cookMax: number

    getTimeLabel = getTimeLabel

    // METHODS

    addTag(tag: string) {
        if (!this.tags.includes(tag)) {
            this.tags.push(tag)
            this.tagKeyword = ''
        }
    }

    removeTag(tag: string) {
        this.tags = this.tags.filter(t => t !== tag)
    }

    addIngredient(ingredient: string) {
        if (!this.ingredients.includes(ingredient)) {
            this.ingredients.push(ingredient)
            this.ingredientKeyword = ''
        }
    }

    removeIngredient(ingredient: string) {
        this.ingredients = this.ingredients.filter(t => t !== ingredient)
    }

    clearFilters() {
        this.title = undefined
        this.servings = undefined
        this.tagKeyword = undefined
        this.tags = []
        this.ingredientKeyword = undefined
        this.ingredients = []
        this.prepMin = undefined
        this.prepMax = undefined
        this.cookMin = undefined
        this.cookMax = undefined
    }

    getRecipes() {
        this.recipes = undefined
        this.errorMsg = undefined
        this.recipesService.getRecipes({
            title: this.title,
            servings: this.servings,
            ratingMin: this.ratingMin,
            ratingMax: this.ratingMax,
            tags: this.tags.length > 0 ? this.tags: undefined,
            ingredients: this.ingredients.length > 0 ? this.ingredients: undefined,
            prepMin: this.prepMin,
            prepMax: this.prepMax,
            cookMin: this.cookMin,
            cookMax: this.cookMax
        }).subscribe(result => {
            this.recipes = result
        }, (error: HttpErrorResponse) => {
            this.errorMsg = error.message
        })
    }

    // CONSTRUCTION

    constructor(private recipesService: RecipesService) {}

    ngOnInit() {
        this.getRecipes()
        this.recipesService.getTags().subscribe(response => {
            this.allTags = response
        }, (error: HttpErrorResponse) => {
            this.tagErrorMsg = error.message
        })
        this.recipesService.getIngredients().subscribe(response => {
            this.allIngredients = response
        }, (error: HttpErrorResponse) => {
            this.ingredientErrorMsg = error.message
        })

        /*
        this.recipes = recipes
        this.allTags = ['breakfast', 'chinese', 'dessert', 'dinner', 'indian', 'lunch']
        this.allIngredients = ['chili', 'nuts', 'olive oil', 'pepper', 'salt', 'sugar']

        this.getRecipes()
        this.recipesService.getTags().subscribe(response => {
            this.allTags = response
        }, (error: HttpErrorResponse) => {
            this.tagErrorMsg = error.message
        })
        this.recipesService.getIngredients().subscribe(response => {
            this.allIngredients = response
        }, (error: HttpErrorResponse) => {
            this.ingredientErrorMsg = error.message
        })
        */
    }
}
