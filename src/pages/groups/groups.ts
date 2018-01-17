import { Component } from "@angular/core";
import { NavController } from 'ionic-angular';
import { GroupPage } from '../group/group';
import { Group } from "../../models/group.model";
import { restaurants } from "../../assets/restaurants";

@Component({
  templateUrl: 'groups.html',
  selector: 'page-groups'
})
export class GroupsPage {

  groups = [
    {
      id: 1,
      people: [
        "Daniel",
        "Ben",
        "Peter"
      ],
      restaurants: [
        {
          name: "Chipotle",
          url: "https://www.chipotle.com/",
          img: "chipotle.jpg",
          rating: 3.5,
          price: 1,
          eta: 10,
          category: [
            "Mexican",
            "Fast Food"
          ],
          address: [
            "13203 W Center Rd.",
            "Omaha, NE 68144"
          ],
          location: [
            -96.1225237, 41.2337261
          ],
          reviews: [
            {
              text: "The food at Chipotle is amazing and I would highly recommend the classic burrito or the burrito bowl.",
              author: "Mike K."
            },
            {
              text: "Overall it was good, place was very busy and they kept coming around to clean tables off and sweep up the floor, staff was very nice, I would eat here again.",
              author: "Kaeli N."
            },
            {
              text: "They have added brown rice as an option and now they have corn tortillas for the soft tacos.",
              author: "Cecil J."
            }
          ]
        },
        {
          name: "Thai Esarn",
          url: "http://thaiesarninomaha.com/",
          img: "thaiesarn.jpg",
          rating: 4,
          price: 2,
          eta: 6,
          category: [
            "Thai"
          ],
          address: [
            "555 N. 155th Plz",
            "Omaha, NE 68154"
          ],
          hours: {
            day: "Today",
            opens: "11:00 am",
            closes: "9:00 pm"
          },
          location: [
            -96.1573772, 41.2651377
          ],
          reviews: [
            {
              text: "Each time I ordered the fresh rolls and cup of thom kha soup - they happily subbed tofu for chicken for me and it was delicious.",
              author: "Jen H."
            },
            {
              text: "The sweet honey sauce with the crab Rangoon is an excellent compliment to the entrees flavors.",
              author: "Meg B."
            },
            {
              text: "Next time I'd ask for a larger takeout container.",
              author: "Kyle T."
            }
          ]
        }
      ]
    },
    {
      id: 2,
      people: [
        "Daniel",
        "Thomas",
        "Noah"
      ],
      restaurants: restaurants
    }
  ];

  constructor(private nav: NavController) {

  }

  delete(index) {
    this.groups.splice(index, 1);
  }

  openGroup(group) {
    this.nav.push(GroupPage, {
      group: group
    })
  }

  getLastInArray(arr) {
    return arr[arr.length - 1];
  }
}
