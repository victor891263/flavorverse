type Metadata = {
    _id: string
    createdAt: string
    updatedAt: string
}

export type Review = {
    user?: {
        _id: string
        username: string
        img: string | undefined
    }
    body: string
    rating: number
    likes: number
    liked: boolean
    dislikes: number
    disliked: boolean
} & Metadata

export type RecipeBrief = {
    user?: {
        _id: string
        username: string
        img: string | undefined
    }
    title: string
    desc: string
    tags: string[]
    rating: number
    img?: string
    servings: number
    duration: {
        prep?: number
        cook?: number
        extra?: number
    }
} & Metadata

export type Recipe = {
    user?: {
        _id: string
        username: string
        img: string | undefined
    }
    title: string
    desc: string
    img?: string
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
    email: {
        address: string
    }
    newEmail: {
        address?: string
    }
    username: string
    name?: string
    about?: string
    img?: string
    link?: string
} & Metadata
