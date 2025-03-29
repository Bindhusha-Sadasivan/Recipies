import { Routes } from '@angular/router';
import { RecipiesComponent } from './recipies/recipies.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipies/recipe-start/recipe-start.component';
import { RecipieListComponent } from './recipies/recipies-list/recipie-list.component';
import { RecipieDetailComponent } from './recipies/recipies-detail/recipie-detail.component';
import { RecipieEditComponent } from './recipies/recipie-edit/recipie-edit.component';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuardGuard } from './auth/auth/auth-guard/auth-guard.guard';
// import { recipiesResolverService } from './resolver/recipies-resolver.service';

export const routes: Routes = [
{
  path:'',
  redirectTo:'/recipies',
  pathMatch:'full'
},
{
  path:'recipies',
  component: RecipiesComponent,
  canActivate:[AuthGuardGuard],
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
      component: RecipieDetailComponent,
      // resolve: [recipiesResolverService]
    },
    {
      path:':id/edit',
      component: RecipieEditComponent,
      // resolve: [recipiesResolverService]
    }
  ]
},
{
  path:'shopping',
  component: ShoppingListComponent,
},
{
  path:'auth',
  component: AuthComponent
},

];
