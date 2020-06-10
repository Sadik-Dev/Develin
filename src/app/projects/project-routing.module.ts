import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { NewProjectComponent } from './new-project/new-project.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { AuthGuard } from '../AuthGuard/AuthGuard';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
    { path: '', canActivate: [AuthGuard],  component: ProjectListComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
