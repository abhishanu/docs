import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './Services/auth/auth-gaurd.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canActivate: [AuthGuardService]
  },
  { path: 'profile',
    loadChildren: './profile/profile/profile.module#ProfilePageModule',
    canActivate: [AuthGuardService]
  },
  { path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  { path: 'register',
    loadChildren: './register/register.module#RegisterPageModule'
  },
  {
    path: 'unlockWithPin',
    loadChildren: './login/unlock-with-pin/unlock-with-pin.module#UnlockWithPinPageModule',
  },
  { path: 'check-pin', loadChildren: './login/check-pin/check-pin.module#CheckPinPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
