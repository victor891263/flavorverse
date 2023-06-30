import {Component, Input, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import {HttpErrorResponse} from "@angular/common/http"
import {RecipesService} from "../../services/recipes.service"
import {Router} from "@angular/router"
import {Recipe} from "../../types";

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})

export class RecipeFormComponent implements OnInit {
    @Input() new: boolean
    @Input() recipe?: Recipe

    submitErrorMsg: string

    form: FormGroup
    get title() {
        return this.form.get('title')
    }
    get desc() {
        return this.form.get('desc')
    }
    get servings() {
        return this.form.get('servings')
    }
    get prepTime() {
        return this.form.get('prepTime')
    }
    get cookTime() {
        return this.form.get('cookTime')
    }
    get extraTime() {
        return this.form.get('extraTime')
    }

    tags: string[] = []

    allTags: string[]
    tagErrorMsg: string

    tagKeyword: string = ''
    customTag: string
    get relevantTags() {
        return this.allTags.filter(tag => tag.toLowerCase().includes(this.tagKeyword.toLowerCase())) // filter tags based on the given keyword
    }

    ingredients: {
        name: string
        quantity: string
    }[] = []

    currentIngredient: {
        name: string,
        quantity: string
    } = {
        name: undefined,
        quantity: undefined
    }

    steps: string[] = []
    currentStep: string

    nutrition: {
        label: string
        value: string
    }[] = []
    currentNutrition: {
        label: string
        value: string
    } = {
        label: undefined,
        value: undefined
    }

    get isFormValid() {
        return (
            this.form.valid &&
            (this.prepTime.value || this.cookTime.value) &&
            (this.ingredients.length > 0) &&
            (this.steps.length > 0)
        )
    }

    addTag(tag: string) {
        if (!this.tags.includes(tag)) { // don't add the tag if it has been already added
            this.tags.push(tag)
            if (tag === this.customTag) this.customTag = '' // if the tag is a custom tag, clear the custom tag input. If not, clear the tag search input
            else this.tagKeyword = ''
        }
    }

    removeTag(tag: string) {
        this.tags = this.tags.filter(t => t !== tag)
    }

    addIngredient() {
        this.ingredients.push({ name: this.currentIngredient.name, quantity: this.currentIngredient.quantity })
        this.currentIngredient = {
            name: undefined,
            quantity: undefined
        }
    }

    removeIngredient(name: string) {
        this.ingredients = this.ingredients.filter(ing => ing.name !== name)
    }

    addStep(step: string) {
        this.steps.push(step)
        this.currentStep = ''
    }

    removeStep(step: string) {
        this.steps = this.steps.filter(s => s !== step)
    }

    addNutrition() {
        this.nutrition.push({ label: this.currentNutrition.label, value: this.currentNutrition.value })
        this.currentNutrition = {
            label: undefined,
            value: undefined
        }
    }

    removeNutrition(label: string) {
        this.nutrition = this.nutrition.filter(n => n.label !== label)
    }

    submitRecipe(e) {
        e.target.innerText = 'Submitting...'
        e.target.disabled = true
        this.recipesService.addRecipe({
            title: this.title.value,
            desc: this.desc.value,
            tags: this.tags,
            nutrition: this.nutrition,
            servings: this.servings.value,
            ingredients: this.ingredients,
            duration: {
                prep: this.prepTime.value,
                cook: this.cookTime.value,
                extra: this.extraTime.value
            },
            steps: this.steps
        }).subscribe(response => {
            this.router.navigate(['/recipes/' + response]) // if recipe is added successfully, redirect to the newly added recipe page
        }, (error: HttpErrorResponse) => {
            this.submitErrorMsg = error.message
            setTimeout(() => this.submitErrorMsg = '', 5000)
            e.target.innerText = 'Submit recipe'
            e.target.disabled = false
        })
    }

    updateRecipe(e) {
        e.target.innerText = 'Submitting...'
        e.target.disabled = true
        this.recipesService.updateRecipe({
            title: this.title.value,
            desc: this.desc.value,
            tags: this.tags,
            nutrition: this.nutrition,
            servings: this.servings.value,
            ingredients: this.ingredients,
            duration: {
                prep: this.prepTime.value,
                cook: this.cookTime.value,
                extra: this.extraTime.value
            },
            steps: this.steps
        }, this.recipe._id).subscribe(() => {
            this.router.navigate(['/recipes/' + this.recipe._id]) // if recipe is updated successfully, redirect to the recipe page
        }, (error: HttpErrorResponse) => {
            this.submitErrorMsg = error.message
            setTimeout(() => this.submitErrorMsg = '', 5000)
            e.target.innerText = 'Submit recipe'
            e.target.disabled = false
        })
    }

    deleteRecipe(e) {
        e.target.innerText = 'Deleting recipe...'
        e.target.disabled = true
        this.recipesService.deleteRecipe(this.recipe._id).subscribe(() => {
            this.router.navigate(['/'])
        }, (error: HttpErrorResponse) => {
            this.submitErrorMsg = error.message
            setTimeout(() => this.submitErrorMsg = '', 5000)
            e.target.innerText = 'Delete recipe'
            e.target.disabled = false
        })
    }

    constructor(private formBuilder: FormBuilder, private recipesService: RecipesService, private router: Router) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: new FormControl(this.recipe ? this.recipe.title : '', [
                Validators.required,
                Validators.maxLength(50)
            ]),
            desc: new FormControl(this.recipe ? this.recipe.desc : '', [
                Validators.required,
                Validators.maxLength(1000)
            ]),
            servings: new FormControl(this.recipe ? this.recipe.servings : undefined, [
                Validators.required,
                Validators.min(1),
                Validators.max(100)
            ]),
            prepTime: new FormControl(this.recipe ? this.recipe.duration.prep : undefined, [
                Validators.min(1),
                Validators.max(3000)
            ]),
            cookTime: new FormControl(this.recipe ? this.recipe.duration.cook : undefined, [
                Validators.min(1),
                Validators.max(3000)
            ]),
            extraTime: new FormControl(this.recipe ? this.recipe.duration.extra : undefined, [
                Validators.min(1),
                Validators.max(3000)
            ])
        })

        // if this is an "edit recipe" page, assign recipe info to inputs
        if (this.recipe) {
            this.tags = this.recipe.tags
            this.ingredients = this.recipe.ingredients
            this.steps = this.recipe.steps
            this.nutrition = this.recipe.nutrition
        }

        // retrieve all available tags
        this.recipesService.getTags().subscribe(response => {
            this.allTags = response
        }, (error: HttpErrorResponse) => {
            this.tagErrorMsg = error.message
        })
    }
}
