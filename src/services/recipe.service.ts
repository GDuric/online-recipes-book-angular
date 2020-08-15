import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    recipes: Recipe[];
    
    constructor(
        private shoppingListService: ShoppingListService, 
        private httpClient: HttpClient, 
        private authService: AuthService){}

      getRecipes() {
          if (this.recipes && this.recipes.length > 0) return this.recipes.slice();
          else return this.recipes;
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
          this.shoppingListService.addIngredients(ingredients);
      }

      getRecipe(index: number){
          return this.recipes[index];
      }

      addRecipe(recipe: Recipe){
          this.recipes.push(recipe);
          this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, updatedRecipe: Recipe){
          this.recipes[index] = updatedRecipe;
          this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice());
      }

      saveRecipes(){
          this.httpClient.put('https://online-recipe-book.firebaseio.com/recipes.json', this.recipes).subscribe(
              response => {
                   console.log(response);
              }
          )
      }

      fetchRecipes(){
        return this.httpClient
        .get<Recipe[]>('https://online-recipe-book.firebaseio.com/recipes.json')
        .pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe, 
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
                
            }), 
                tap((recipes: Recipe[]) => {
                    this.setRecipes(recipes);
                })
        );
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}