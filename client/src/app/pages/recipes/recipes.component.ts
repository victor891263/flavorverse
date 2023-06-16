import {Component, OnInit} from '@angular/core'
import { Recipe } from "../../types"
import {RecipesService} from "../../services/recipes.service"
import {HttpErrorResponse} from "@angular/common/http"
import { RecipesSkeletonComponent } from '../../components/recipes-skeleton/recipes-skeleton.component'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit {
    // PROPERTIES

    errorMsg: string
    skeleton = RecipesSkeletonComponent

    recipes: Recipe[]
    allTags: string[]
    allIngredients: string[]

    title: string
    servings: number

    tagKeyword: string
    tags = ['lunch', 'indian']
    get relevantTags() {
        return this.allTags.filter(tag => tag.includes(this.tagKeyword))
    }

    ingredientKeyword: string
    ingredients = ['salt', 'pepper', 'nuts']
    get relevantIngredients() {
        return this.allIngredients.filter(ingredient => ingredient.includes(this.ingredientKeyword))
    }

    prepMin: number
    prepMax: number
    cookMin: number
    cookMax: number

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
        this.allTags = ['breakfast', 'chinese', 'dessert', 'dinner', 'indian', 'lunch']
        this.allIngredients = ['chili', 'nuts', 'olive oil', 'pepper', 'salt', 'sugar']
        /*
        this.recipes = recipes
        this.allTags = ['breakfast', 'chinese', 'dessert', 'dinner', 'indian', 'lunch']
        this.allIngredients = ['chili', 'nuts', 'olive oil', 'pepper', 'salt', 'sugar']

        this.getRecipes()
        this.recipesService.getTags().subscribe(result => this.allTags = result)
        this.recipesService.getIngredients().subscribe(result => this.allIngredients = result)
        */
    }
}
