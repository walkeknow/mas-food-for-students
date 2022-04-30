import Images from "../assets/placeholder"
import Colors from "../theme/Colors"

const DummyLists = {
    itemList: [
        {
            id: '1',
            name: 'Baked Bread',
            university: 'Georgia Tech',
            distance: '0.2 mi',
            tagColor: Colors.yellow,
            image: Images.bakedBread,
            bought: '3/18/2022',
            expires: '3/31/2022',
            seller: 'Maisy Davidson',
            address: 'North Ave Apts.',
            pickup: 'Mon: 2 pm to 6 pm'
        },
        {
            id: '2',
            name: 'Rye Bread',
            university: 'Georgia Tech',
            distance: '0.6 mi',
            tagColor: Colors.yellow,
            image: Images.ryeBread,
            bought: '3/19/2022',
            expires: '4/01/2022',
            seller: 'Gilbert William',
            address: 'West Village',
            pickup: 'Mon: 2 pm to 4 pm'
        },
        {
            id: '3',
            name: 'Bread Loaf',
            university: 'Georgia Tech',
            distance: '1.2 mi',
            tagColor: Colors.yellow,
            image: Images.breadLoaf,
            bought: '3/28/2022',
            expires: '4/10/2022',
            seller: 'Chaya James',
            address: 'Montag',
            pickup: 'Wed: 12 pm to 3 pm'
        },
        {
            id: '4',
            name: 'Sourdough Bread',
            university: 'Georgia State',
            distance: '2.4 mi',
            tagColor: Colors.green,
            image: Images.sourdoughBread,
            bought: '3/24/2022',
            expires: '4/21/2022',
            seller: 'Carrie Hayden',
            address: 'Patton Hall',
            pickup: 'Fri: 10 am to 5 pm'
        }
    ]
}

export default DummyLists