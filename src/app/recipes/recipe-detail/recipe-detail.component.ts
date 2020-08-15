import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {  
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  editRecipe(){
   this.router.navigate(['edit'], { relativeTo: this.route});
   //this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route});
  }
  deleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route})
  }

}
