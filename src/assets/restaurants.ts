import { Restaurant } from '../models/restaurant.model';

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Block 16",
    url: "http://block16omaha.com/",
    img: "block16.jpg",
    rating: 4.5,
    price: 1,
    distance: 23,
    category: [
      "Sandwiches",
      "American"
    ],
    address: [
      "1611 Farnam St",
      "Omaha, NE 68102"
    ],
    reviews: [
      {
        text: "I can't believe it took me this long to write about what was one of my favorite meals of 2017! My friend and I went here for dinner and I have been raving about it ever since...",
        author: "Laura P."
      },
      {
        text: "My wife and I were back in town for a wedding and were excited to try Block 16 based on the stellar reviews.  My wife was equally excited as one of the chefs from a cooking show really liked the place as well...",
        author: "Bill M."
      },
      {
        text: "Yummy and hit the spot. We had burgers with egg, ham and truffle aioli. I would have liked my ham thrown on a griddle and a bit brown but it was still delicious...",
        author: "Lala B."
      }
    ],
    location: [
      -95.9399596,
      41.2574411
    ]
  },
  {
    id: "2",
    name: "The Drover",
    url: "http://www.droverrestaurant.com/",
    img: "drover.jpg",
    rating: 4,
    price: 3,
    distance: 17,
    category: [
      "Steakhouse"
    ],
    address: [
      "2121 S 73rd St",
      "Omaha, NE 68124"
    ],
    reviews: [
      {
        text: "Best Steak House in Omaha. And no, you don't get the Omaha steak. I learned from locals that the lowest quality of fine dining steak is an Omaha steak... ",
        author: "Virginia C."
      },
      {
        text: "Very good quality meat & having cold plates and fresh veg at the salad bar, very important! Appreciate the old school ambience like when grandma & grandpa took you out to eat...",
        author: "Tom A."
      },
      {
        text: "The whiskey steaks were amazing! Juicy and tender with a nice char on them, no need for steak sauce. They cut like butter with my knife...",
        author: "Ann N."
      }
    ],
    location: [
      -96.0281422,
      41.2391492
    ]
  },
  {
    id: "3",
    name: "Kitchen Table",
    url: "http://kitchentableomaha.com/",
    img: "kitchentable.jpg",
    rating: 4.5,
    price: 2,
    distance: 22,
    category: [
      "American",
      "Cafes",
      "Sandwiches"
    ],
    address: [
      "1415 Farnam St",
      "Omaha, NE 68102"
    ],
    reviews: [
      {
        text: "4 dudes, across country road trip DC to Las Vegas... we are very impressed how much attention you get from the moment you enter the front door. Megan great job, we are very pleased with your service and your Menu knowledge makes it an \"A\"+ ...",
        author: "Nelson P."
      },
      {
        text: "This spot is a nice cozy pretty clean eating restaurant downtown, full of unique flavors and homemade foods that differ daily ...",
        author: "Linden D."
      },
      {
        text: "Kitchen Table is a little spot off 14th and Farnham St. It is a little cafe with brick walls and a trendy wall garden serving farm to table cafe food. Their slogan is, \"slow food fast,\" aiming to serve healthy foods literally and figuratively at the dinner table ...",
        author: "Aditi D."
      }
    ],
    location: [
      -96.0959933,
      41.2391279
    ]
  }
];
