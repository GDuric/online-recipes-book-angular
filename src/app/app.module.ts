import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { ShoppingListService } from 'src/services/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from 'src/services/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeService } from 'src/services/recipe.service';
import { RecipesResolverService } from 'src/services/recipes-resolver.service';
import { NavbarComponent } from './navbar/navbar.component';
import { TruncateTextPipe } from './shared/pipes/truncate-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent, 
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,  
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,   
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    NavbarComponent, TruncateTextPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,  
    AppRoutingModule
  ],
  providers: [  
    RecipeService, 
    ShoppingListService,  
    { provide: HTTP_INTERCEPTORS,useClass: AuthInterceptorService, multi: true },
    RecipesResolverService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
