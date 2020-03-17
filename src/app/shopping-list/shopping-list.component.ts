import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('milk', 1, 'l'),
    new Ingredient('apples', 1, 'kg'),
    new Ingredient('flour', 1, 'kg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
