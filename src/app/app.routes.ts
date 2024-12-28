import { Routes } from '@angular/router';
import { RecipiesComponent } from './recipies/recipies.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

export const routes: Routes = [
{
  path:'',
  redirectTo:'/recipies',
  pathMatch:'full'
},
{
  path:'recipies',
  component: RecipiesComponent
},
{
  path:'shopping',
  component: ShoppingListComponent
},

];
