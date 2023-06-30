import {User} from "../types"

export const users: User[] = [
    {
        createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        _id: '1',
        email: {
            address: 'johnbrown2323@gmail.com'
        },
        newEmail: {
            address: 'fck@gmail.com'
        },
        username: 'greasypancakes',
        name: 'Jack White',
        about: 'Internationally renowned, multi-Michelin starred chef Gordon Ramsay has opened a string of successful restaurants across the globe, from the UK and France to Singapore and the United States.',
        link: 'https://www.instagram.com/martaalbanese'
    },
    {
        createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        _id: '2',
        email: {
            address: 'johnbrown2323@gmail.com'
        },
        newEmail: {
            address: undefined
        },
        username: 'Banana2168',
        name: 'Katie Bricks',
        about: `Explore Michelin star chef Katie Bricks' diverse collection of London and international restaurants. Experience excellence in fine food. Book today.`
    },
    {
        createdAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        updatedAt: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        _id: '3',
        email: {
            address: 'johnbrown2323@gmail.com'
        },
        newEmail: {
            address: undefined
        },
        username: 'BestRestaurateur',
        name: 'Jamie Oliver',
        about: `JamieOliver.com is your one stop shop for everything Jamie Oliver including delicious and healthy recipes inspired from all over the world, helpful food.`
    },
]
