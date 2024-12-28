import { Routes } from '@angular/router';
import { RecipiesComponent } from './recipies/recipies.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipies/recipe-start/recipe-start.component';
import { RecipieListComponent } from './recipies/recipies-list/recipie-list.component';
import { RecipieDetailComponent } from './recipies/recipies-detail/recipie-detail.component';
import { RecipieEditComponent } from './recipies/recipie-edit/recipie-edit.component';

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
      path:'new',
      component: RecipieEditComponent
    },
    {
      path:':id',
      component: RecipieDetailComponent
    },
    {
      path:':id/edit',
      component: RecipieEditComponent
    }
  ]
},
{
  path:'shopping',
  component: ShoppingListComponent
},

];
