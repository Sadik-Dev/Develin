import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import {MaterialModule} from './../material/material.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { NewProjectComponent } from './new-project/new-project.component'
import { FormsModule } from '@angular/forms';
import { ProjectFilterPipe } from './project-filter.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsRoutingModule } from './project-routing.module';
import { AuthenticationInterceptor } from '../http-interceptors/AuthenticationInterceptor';
import { AuthGuard } from '../AuthGuard/AuthGuard';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [ProjectsComponent, ProjectListComponent, NewProjectComponent, ProjectFilterPipe, DashboardComponent, NewTaskComponent,MenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectsRoutingModule
    ],
  exports: [ProjectListComponent,NewProjectComponent]
   
})
export class ProjectsModule { }
