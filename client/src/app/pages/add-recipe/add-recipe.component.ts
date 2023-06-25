import {Component, OnInit} from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import {RecipesService} from "../../services/recipes.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-add-recipe',
    templateUrl: './add-recipe.component.html',
    styleUrls: ['./add-recipe.component.css']
})

export class AddRecipeComponent implements OnInit {
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

    constructor(private formBuilder: FormBuilder, private recipesService: RecipesService, private router: Router) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: new FormControl('', [
                Validators.required,
                Validators.maxLength(50)
            ]),
            desc: new FormControl('', [
                Validators.required,
                Validators.maxLength(1000)
            ]),
            servings: new FormControl(undefined, [
                Validators.required,
                Validators.min(1),
                Validators.max(100)
            ]),
            prepTime: new FormControl(undefined, [
                Validators.min(1),
                Validators.max(3000)
            ]),
            cookTime: new FormControl(undefined, [
                Validators.min(1),
                Validators.max(3000)
            ]),
            extraTime: new FormControl(undefined, [
                Validators.min(1),
                Validators.max(3000)
            ])
        })
        this.allTags = ['Banana', 'Bread', 'Breakfast', 'Chinese', 'Dessert', 'Dinner', 'Indian', 'Lunch', 'Mexican', 'Russian', 'Strawberry']
    }
}
