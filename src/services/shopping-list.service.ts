import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';

export class ShoppingListService {
    ingredientsUpdated = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
      ];

      getIngredients(){
          return this.ingredients.slice();
      }

      getIngredient(index: number){
        return this.ingredients[index];
    }
      addIngredient(ingredient: Ingredient) {
          const index = this.ingredients.findIndex(x => x.name === ingredient.name && x.unit === ingredient.unit);
          if (index === -1) {
              this.ingredients.push(ingredient);
              this.ingredientsUpdated.next(this.ingredients.slice());
          } else {
              let ingredientToUpdate = this.getIngredient(index);
              ingredientToUpdate.amount += ingredient.amount;
              this.updateIngredient(index, ingredientToUpdate);
          }
      }
      updateIngredient(index: number, ingredient: Ingredient) {
          this.ingredients[index] = ingredient;
          this.ingredientsUpdated.next(this.ingredients.slice());
    }
    deleteIngredient(index: number){
       this.ingredients.splice(index,1);
        this.ingredientsUpdated.next(this.ingredients.slice());
    }

      addIngredients(ingredients: Ingredient[]){
          this.ingredients.push(...ingredients);
          this.ingredientsUpdated.next(this.ingredients.slice());
      }
      
}