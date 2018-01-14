import { Component } from "@angular/core";
import { NavController } from 'ionic-angular';
import { GroupPage } from '../group/group';
import { Group } from "../../models/group.model";

@Component({
  templateUrl: 'groups.html',
  selector: 'page-groups'
})
export class GroupsPage {

  groups: Group[] = [
    {
      id: 1,
      people: [
        "Daniel",
        "Ben",
        "Peter"
      ],
      restaurants: [
        {
          name: "Texas Roadhouse",
          url: "https://texasroadhouse.com",
          img: "texasroadhouse.jpg",
          rating: 4,
          price: 2,
          eta: 6,
          category: [
            "Steakhouses",
            "Barbeque",
            "American"
          ],
          address: [
            "520 N. 155th Plaza",
            "Omaha, NE 68154"
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
      restaurants: [
        {
          name: "My Pie",
          url: "url",
          img: "img",
          rating: 3,
          price: 2,
          eta: 10,
          category: [
            "Pizza"
          ],
          address: [
            "Something st",
            "Boo"
          ]
        },
        {
          name: "Chipotle",
          url: "url",
          img: "img",
          rating: 4.5,
          price: 1,
          eta: 10,
          category: [
            "Mexican"
          ],
          address: [
            "Something st",
            "Boo"
          ]
        }
      ]
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
