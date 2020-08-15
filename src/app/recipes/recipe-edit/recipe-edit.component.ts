import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  id: number;
  isNew: boolean = true;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.isNew = Number.isNaN(this.id);
        this.initializeForm();
      }
    )   
  }

  initializeForm(){
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIng = new FormArray([]);
    if (!this.isNew){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      if(recipe['ingredients']){
        for  (let item of recipe.ingredients){
          recipeIng.push(new FormGroup({
            'name': new FormControl(item.name, Validators.required),
            'amount': new FormControl(item.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            'unit': new FormControl(item.unit, Validators.required)
          }))
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'ingredients':recipeIng
    });
  }

  onSubmit(){
    /*
    const recipe = new Recipe(
      this.recipeForm.value['name'], 
      this.recipeForm.value['description'], 
      this.recipeForm.value['imagePath'], 
      this.recipeForm.value['ingredients']);
      */
    if(this.isNew){
      this.recipeService.addRecipe(this.recipeForm.value);
    } else {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    this.onCancel()
  }
  get controls(){ 
    return  (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addNewIngredientToRecipe(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
            'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            'unit': new FormControl(null, Validators.required)
      })
    )
  }
  onCancel(){
    this.router.navigate(['../'], { relativeTo: this.route})
  }
  deleteIng(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
