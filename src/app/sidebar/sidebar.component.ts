import { Component, OnInit, OnDestroy } from '@angular/core';

import { RecipeService } from 'src/services/recipe.service';
import { AuthService } from 'src/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy{
  private userSubscription: Subscription;
  isLoggedIn: boolean = false;

  constructor(private recipeService: RecipeService, private authService: AuthService) {}

  ngOnInit(){
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }
 

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
}
