export const recipe = {
    createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
    updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
    _id: '1',
    user: {
        _id: '1',
        username: 'GreasyPancakes',
        img: undefined
    },
    title: `Italian chicken marinade`,
    desc: `This Italian Chicken Marinade recipe makes me all nostalgic for my childhood. Once a week my mom would marinate chicken breast in store-bought Italian dressing for the family. It is a very simple yet a delicious way to add flavor before grilling.`,
    tags: ['chicken', 'chicken', 'chicken'],
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
        `Preheat the oven to 350 degrees F (175 degrees C). Lightly grease a 9x5-inch loaf pan with butter or olive oil.`,
        `Preheat the oven to 350 degrees F (175 degrees C). Lightly grease a 9x5-inch loaf pan with butter or olive oil.`
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
                username: 'Banana2168',
                img: undefined
            },
            body: `This banana bread didnt have any texture at all. it didnt taste like banana bread whatsoever. it was really bad and i'll just stick to other banana bread recipes`,
            rating: 1,
            likes: 55,
            liked: true,
            dislikes: 55,
            disliked: false
        },
        {
            createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
            updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
            _id: '2',
            user: {
                _id: '3',
                username: 'BestRestaurateur',
                img: undefined
            },
            body: `I loved this recipe! I made it exactly as posted. Lasagna is one of my specialties and I've tried all kinds of variations but this one is a winner just as published. My new "go to".`,
            rating: 4,
            likes: 55,
            liked: false,
            dislikes: 55,
            disliked: false
        }
    ]
}

export const profile = {
    createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
    updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
    _id: '1',
    username: 'greasypancakes',
    name: 'Jack White',
    about: 'Internationally renowned, multi-Michelin starred chef Gordon Ramsay has opened a string of successful restaurants across the globe, from the UK and France to Singapore and the United States.'
}
