import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from 'src/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesUpdated: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {    
    this.recipeService.fetchRecipes().subscribe();
    this.recipes = this.recipeService.getRecipes();
      this.recipesUpdated = this.recipeService.recipesChanged.subscribe(
        (response: Recipe[]) => {
          this.recipes = response;
        }
      )   
    }

  addNewRecipe(){
    this.router.navigate(['new'], { relativeTo: this.route}) ;
  }

  ngOnDestroy(){
      this.recipesUpdated.unsubscribe();
    }
}
