import Person1 from 'asset/static/person1.jpeg'
import Person2 from 'asset/static/person2.jpeg'
import Person3 from 'asset/static/person3.jpeg'
import Person4 from 'asset/static/person4.jpeg'
import Person5 from 'asset/static/person5.jpeg'
import Person6 from 'asset/static/person6.jpeg'
import Person7 from 'asset/static/person7.jpeg'
import OrgLogo from 'asset/static/org.png'

export const members = {
    m0: {
        id: 'm0',
        name: 'Wade Cooper',
        img: Person1,
        access: 'na',
        email: 'wade@somecompany.com'
    },
    m1: {
        id: 'm1',
        name: 'John Doe',
        img: Person2,
        access: 'na',
        email: 'john@somecompany.com'
    },
    m2: {
        id: 'm2',
        name: 'Mike clench',
        img: Person3,
        access: 'na',
        email: 'mike@somecompany.com'
    },
    m3: {
        id: 'm3',
        name: 'Ann Clue',
        img: Person4,
        access: 'na',
        email: 'ann@somecompany.com'
    },
    m4: {
        id: 'm4',
        name: 'Elessa Harper',
        img: Person5,
        access: 'na',
        email: 'elessa@somecompany.com'
    },
    m5: {
        id: 'm5',
        name: 'Tally',
        img: Person6,
        access: 'na',
        email: 'tally@somecompany.com'
    },
    m6: {
        id: 'm6',
        name: 'June',
        img: Person7,
        access: 'na',
        email: 'june@somecompany.com'
    },
}

export const groups = {
    g0: {
        id: 'g0',
        name: 'Product',
        members: ['m0', 'm4', 'm6'],
        access: 'na'
    },
    g1: {
        id: 'g1',
        name: 'Engineering',
        members: ['m1', 'm2', 'm3', 'm5'],
        access: 'na'
    }
}

export const organization = {
    id: '01',
    img: OrgLogo,
    name: 'OSlash',
    members: Object.keys(members),
    access: 'na'
}