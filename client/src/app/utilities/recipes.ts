import {Recipe} from "../types"

export const recipes: Recipe[] = [
    {
        createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        _id: '1',
        user: {
            _id: '1',
            username: 'GreasyPancakes'
        },
        title: `Banana bread`,
        desc: `This banana bread recipe creates the most delicious, moist loaf with loads of banana flavor. Why compromise the banana flavor? Friends and family love my recipe and say it's by far the best! It tastes wonderful toasted. Enjoy!`,
        tags: ['banana', 'breakfast', 'dessert'],
        rating: 3.5,
        nutrition: [
            {
                label: 'Calories',
                value: '448'
            },
            {
                label: 'Fat',
                value: '21g'
            },
            {
                label: 'Carbs',
                value: '37g'
            },
            {
                label: 'Protein',
                value: '30g'
            }
        ],
        servings: 10,
        ingredients: [
            {
                name: 'all-purpose flour',
                quantity: '2 cups'
            },
            {
                name: 'baking soda',
                quantity: '1 teaspoon'
            },
            {
                name: 'eggs, beaten',
                quantity: '2'
            },
            {
                name: 'butter',
                quantity: '1 cup'
            }
        ],
        duration: {
            prep: 15,
            cook: 60
        },
        steps: [
            `Preheat the oven to 350 degrees F (175 degrees C). Lightly grease a 9x5-inch loaf pan with butter or olive oil.`,
            `Combine flour, baking soda, and salt in a large bowl. Beat brown sugar and butter with an electric mixer in a separate large bowl until smooth. Stir in eggs and mashed bananas until well blended. Stir banana mixture into flour mixture until just combined. Pour batter into the prepared loaf pan.`,
            `Bake in the preheated oven until a toothpick inserted into the center comes out clean, about 60 minutes. Let bread cool in pan for 10 minutes, then turn out onto a wire rack to cool completely.`
        ],
        triedBy: 57,
        tried: false,
        reviews: [
            {
                createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
                updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
                _id: '1',
                user: {
                    _id: '2',
                    username: 'Banana2168'
                },
                body: `This banana bread didnt have any texture at all. it didnt taste like banana bread whatsoever. it was really bad and i'll just stick to other banana bread recipes`,
                rating: 1,
                likes: 0,
                liked: false,
                dislikes: 15,
                disliked: false
            },
            {
                createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
                updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
                _id: '2',
                user: {
                    _id: '3',
                    username: 'BestRestaurateur'
                },
                body: `I loved this recipe! I made it exactly as posted. Lasagna is one of my specialties and I've tried all kinds of variations but this one is a winner just as published. My new "go to".`,
                rating: 4,
                likes: 0,
                liked: false,
                dislikes: 15,
                disliked: false
            }
        ]
    },


    {
        createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        _id: '2',
        user: {
            _id: '1',
            username: 'bradley8457'
        },
        title: `Italian chicken marinade`,
        desc: `This Italian Chicken Marinade recipe makes me all nostalgic for my childhood. Once a week my mom would marinate chicken breast in store-bought Italian dressing for the family. It is a very simple yet a delicious way to add flavor before grilling.`,
        tags: ['italian', 'chicken'],
        rating: 3.5,
        nutrition: [
            {
                label: 'Calories',
                value: '448'
            },
            {
                label: 'Fat',
                value: '21g'
            },
            {
                label: 'Carbs',
                value: '37g'
            },
            {
                label: 'Protein',
                value: '30g'
            }
        ],
        servings: 10,
        ingredients: [
            {
                name: 'all-purpose flour',
                quantity: '2 cups'
            },
            {
                name: 'baking soda',
                quantity: '1 teaspoon'
            },
            {
                name: 'eggs, beaten',
                quantity: '2'
            },
            {
                name: 'butter',
                quantity: '1 cup'
            }
        ],
        duration: {
            prep: 15,
            cook: 60
        },
        steps: [
            `Preheat the oven to 350 degrees F (175 degrees C). Lightly grease a 9x5-inch loaf pan with butter or olive oil.`,
            `Combine flour, baking soda, and salt in a large bowl. Beat brown sugar and butter with an electric mixer in a separate large bowl until smooth. Stir in eggs and mashed bananas until well blended. Stir banana mixture into flour mixture until just combined. Pour batter into the prepared loaf pan.`,
            `Bake in the preheated oven until a toothpick inserted into the center comes out clean, about 60 minutes. Let bread cool in pan for 10 minutes, then turn out onto a wire rack to cool completely.`
        ],
        triedBy: 57,
        tried: false,
        reviews: [
            {
                createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
                updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
                _id: '1',
                user: {
                    _id: '2',
                    username: 'chinesepanda'
                },
                body: `This banana bread didnt have any texture at all. it didnt taste like banana bread whatsoever. it was really bad and i'll just stick to other banana bread recipes`,
                rating: 1,
                likes: 0,
                liked: false,
                dislikes: 15,
                disliked: false
            },
            {
                createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
                updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
                _id: '2',
                user: {
                    _id: '3',
                    username: 'michael2312'
                },
                body: `I loved this recipe! I made it exactly as posted. Lasagna is one of my specialties and I've tried all kinds of variations but this one is a winner just as published. My new "go to".`,
                rating: 4,
                likes: 0,
                liked: false,
                dislikes: 15,
                disliked: false
            }
        ]
    },



    {
        createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        _id: '3',
        user: {
            _id: '1',
            username: 'bradley8457'
        },
        title: `Grilled asparagus`,
        desc: `Grilled asparagus is simple to make, but it lets you enjoy the natural flavor of your veggies. Fresh asparagus spears are coated with a bit of oil, salt, and pepper and cooked quickly over high heat on the grill. That's it!`,
        tags: ['american', 'grilled', 'pepper'],
        rating: 3.5,
        nutrition: [
            {
                label: 'Calories',
                value: '448'
            },
            {
                label: 'Fat',
                value: '21g'
            },
            {
                label: 'Carbs',
                value: '37g'
            },
            {
                label: 'Protein',
                value: '30g'
            }
        ],
        servings: 10,
        ingredients: [
            {
                name: 'all-purpose flour',
                quantity: '2 cups'
            },
            {
                name: 'baking soda',
                quantity: '1 teaspoon'
            },
            {
                name: 'eggs, beaten',
                quantity: '2'
            },
            {
                name: 'butter',
                quantity: '1 cup'
            }
        ],
        duration: {
            prep: 15,
            cook: 60
        },
        steps: [
            `Preheat the oven to 350 degrees F (175 degrees C). Lightly grease a 9x5-inch loaf pan with butter or olive oil.`,
            `Combine flour, baking soda, and salt in a large bowl. Beat brown sugar and butter with an electric mixer in a separate large bowl until smooth. Stir in eggs and mashed bananas until well blended. Stir banana mixture into flour mixture until just combined. Pour batter into the prepared loaf pan.`,
            `Bake in the preheated oven until a toothpick inserted into the center comes out clean, about 60 minutes. Let bread cool in pan for 10 minutes, then turn out onto a wire rack to cool completely.`,
            `In a large bowl, mix turkey, egg, garlic, parsley, and Worcestershire sauce; season with salt and pepper. Using your hands, form mixture into 4 flat patties.`,
            `In a medium skillet over medium heat, heat oil. Add patties and cook, turning once, until golden brown and cooked through, about 5 minutes per side. Serve on buns with desired toppings.`
        ],
        triedBy: 57,
        tried: false,
        reviews: [
            {
                createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
                updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
                _id: '1',
                user: {
                    _id: '2',
                    username: 'chinesepanda'
                },
                body: `This banana bread didnt have any texture at all. it didnt taste like banana bread whatsoever. it was really bad and i'll just stick to other banana bread recipes`,
                rating: 1,
                likes: 0,
                liked: false,
                dislikes: 15,
                disliked: false
            },
            {
                createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
                updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
                _id: '2',
                user: {
                    _id: '3',
                    username: 'michael2312'
                },
                body: `I loved this recipe! I made it exactly as posted. Lasagna is one of my specialties and I've tried all kinds of variations but this one is a winner just as published. My new "go to".`,
                rating: 4,
                likes: 0,
                liked: false,
                dislikes: 15,
                disliked: false
            }
        ]
    }
]
