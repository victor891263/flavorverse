import {Component, OnInit} from '@angular/core'
import {Recipe, RecipeBrief} from "../../types"
import {RecipesService} from "../../services/recipes.service"
import getTimeLabel from '../../utilities/getTimeLabel'
import getCurrentUser from "../../utilities/getCurrentUser"
import createObserverObject from "../../utilities/createObserverObject"

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit {
    get currentUser() {
        return getCurrentUser()
    }

    isBoxOpen = false
    isFilterOpen = false

    toggleBox(isOpen: boolean) {
        if (isOpen) {
            document.documentElement.style.overflow = 'hidden'
            this.isBoxOpen = true
        } else {
            document.documentElement.style.overflow = 'auto'
            this.isBoxOpen = false
        }
    }

    toggleFilter(isOpen: boolean) {
        if (isOpen) {
            document.documentElement.style.overflow = 'hidden'
            this.isFilterOpen = true
        } else {
            document.documentElement.style.overflow = 'auto'
            this.isFilterOpen = false
        }
    }

    // PROPERTIES

    errorMsg: string

    recipes: RecipeBrief[]
    allTags: string[] = []
    allIngredients: string[] = []

    title: string
    servingsMin: number
    servingsMax: number

    ratingMin: number
    ratingMax: number

    tagKeyword: string = ''
    tags = []
    get relevantTags() {
        return this.allTags.filter(tag => tag.toLowerCase().includes(this.tagKeyword.toLowerCase()))
    }
    tagErrorMsg: string

    ingredientKeyword: string = ''
    ingredients = []
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
        this.servingsMin = undefined
        this.servingsMax = undefined
        this.tagKeyword = undefined
        this.tags = []
        this.ingredientKeyword = undefined
        this.ingredients = []
        this.ratingMin = undefined
        this.ratingMax = undefined
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
            servingsMin: this.servingsMin,
            servingsMax: this.servingsMax,
            ratingMin: this.ratingMin,
            ratingMax: this.ratingMax,
            tags: this.tags.length > 0 ? this.tags: undefined,
            ingredients: this.ingredients.length > 0 ? this.ingredients: undefined,
            prepMin: this.prepMin,
            prepMax: this.prepMax,
            cookMin: this.cookMin,
            cookMax: this.cookMax
        }).subscribe(createObserverObject(response => {
            this.recipes = response
        }, msg => {
            this.errorMsg = msg
        }))
    }

    // CONSTRUCTION

    constructor(private recipesService: RecipesService) {}

    ngOnInit() {
        this.getRecipes()
        this.recipesService.getTags().subscribe(createObserverObject(response => {
            this.allTags = response
        }, msg => {
            this.tagErrorMsg = msg
        }))
        this.recipesService.getIngredients().subscribe(createObserverObject(response => {
            this.allIngredients = response
        }, msg => {
            this.ingredientErrorMsg = msg
        }))
    }
}
