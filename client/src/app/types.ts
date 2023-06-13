type Metadata = {
    _id: string
    createdAt: string
    updatedAt: string
}

export type Review = {
    user: {
        _id: string
        username: string
    }
    body: string
    rating: number
    likes: number
    liked: boolean
    dislikes: number
    disliked: boolean
} & Metadata

export type Recipe = {
    user: {
        _id: string
        username: string
    }
    title: string
    desc: string
    tags: string[]
    rating: number
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
    triedBy: number
    tried: boolean
    reviews: Review[]
} & Metadata

export type User = {
    username: string
    name: string
    about: string
} & Metadata

export type GetRecipesQuery = {
    title?: string
    servings?: number
    tags?: string[]
    ingredients?: string[]
    prepMin?: number
    prepMax?: number
    cookMin?: number
    cookMax?: number
}

export type ReviewInput = {
    user: string | number
    body: string
    rating: number
}
