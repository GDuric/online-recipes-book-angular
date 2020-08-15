import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', {static: false }) shoppingListForm:NgForm;
  private startedEditingSubscription: Subscription;
  isNew: Boolean = true;
  editedItemIndex: number;
  editedItem: Ingredient;
 
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.startedEditingSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.isNew = false;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(this.editedItemIndex);
        this.shoppingListForm.setValue(
            { 
              name: this.editedItem.name, 
              amount: this.editedItem.amount, 
              unit: this.editedItem.unit
            }
          );
      }
    );
  }
  
 
  onAddItem(form: NgForm) { 
    const formValue = form.value;
    const ingredient = new Ingredient(formValue.name, formValue.amount, formValue.unit);
    if(this.isNew){
      this.shoppingListService.addIngredient(ingredient);
    } else {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
     
    }
    this.isNew = true;
    this.shoppingListForm.reset();
    
  }
  resetForm(){
    this.shoppingListForm.reset();
    this.isNew = true;
  }
  deleteItem() {
    this.resetForm();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }
  ngOnDestroy():void{
    this.startedEditingSubscription.unsubscribe();
  }
}
