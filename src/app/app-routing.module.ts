import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from './AuthGuard/AuthGuard';


const routes: Routes = [
  {path:  'home',  loadChildren: () => import(`./projects/projects.module`).then(m => m.ProjectsModule) },
  { path: 'login', component: LoginComponent },
  { path: ' ', redirectTo: 'home'}
  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
