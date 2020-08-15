import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from 'src/services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private ingredientUpdatedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientUpdatedSubscription = this.shoppingListService.ingredientsUpdated.subscribe(
      (response: Ingredient[]) => {
        this.ingredients = response;
      }
    )
  }

  onEditItem(id: number){
    this.shoppingListService.startedEditing.next(id);
  }
  ngOnDestroy(): void{
    this.ingredientUpdatedSubscription.unsubscribe();
  }
}
