import { Routes } from '@angular/router';
import { RecipiesComponent } from './recipies/recipies.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipies/recipe-start/recipe-start.component';
import { RecipieListComponent } from './recipies/recipies-list/recipie-list.component';
import { RecipieDetailComponent } from './recipies/recipies-detail/recipie-detail.component';

export const routes: Routes = [
{
  path:'',
  redirectTo:'/recipies',
  pathMatch:'full'
},
{
  path:'recipies',
  component: RecipiesComponent,
  children: [
    {
      path:'',
      component: RecipeStartComponent
    },
    {
      path:':id',
      component: RecipieDetailComponent
    }
  ]
},
{
  path:'shopping',
  component: ShoppingListComponent
},

];
