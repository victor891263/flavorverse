import {User} from "../types"

export const users: User[] = [
    {
        createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        _id: '1',
        username: 'greasypancakes',
        name: 'Jack White',
        about: 'Internationally renowned, multi-Michelin starred chef Gordon Ramsay has opened a string of successful restaurants across the globe, from the UK and France to Singapore and the United States.'
    },
    {
        createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        _id: '2',
        username: 'Banana2168',
        name: 'Katie Bricks',
        about: `Explore Michelin star chef Katie Bricks' diverse collection of London and international restaurants. Experience excellence in fine food. Book today.`
    },
    {
        createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        _id: '3',
        username: 'BestRestaurateur',
        name: 'Jamie Oliver',
        about: `JamieOliver.com is your one stop shop for everything Jamie Oliver including delicious and healthy recipes inspired from all over the world, helpful food.`
    },
]
