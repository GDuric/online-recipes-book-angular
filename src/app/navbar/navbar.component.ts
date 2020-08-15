import { Component, OnInit } from '@angular/core';

import { RecipeService } from 'src/services/recipe.service';
import { AuthService } from 'src/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private userSubscription: Subscription;
  isLoggedIn: boolean = false;

  constructor(private recipeService: RecipeService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }
  onSaveData() {
    this.recipeService.saveRecipes();
  }

  onFetchData() {
   this.recipeService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
