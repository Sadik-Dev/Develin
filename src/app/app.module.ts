import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsModule } from './projects/projects.module';
import { MaterialModule } from './material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { NewTaskComponent } from './projects/new-task/new-task.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { httpInterceptorProviders } from './http-interceptors';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from './http-interceptors/AuthenticationInterceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './AuthGuard/AuthGuard';
import { ProjectDataService } from './projects/project-data.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent   
  ],
  imports: [
    BrowserModule,
    ProjectsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,    
    ReactiveFormsModule ,
    HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  },
  AuthGuard 
  ],
  bootstrap: [AppComponent],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
