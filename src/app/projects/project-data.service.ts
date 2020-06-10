import { Injectable } from '@angular/core';
import { Project } from './projects/projects.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { distinctUntilChanged, debounceTime, map, filter, tap, delay, catchError} from 'rxjs/operators';
import { Observable, pipe, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee, ProjectEmployee } from './projects/employee.model';
import { Task, Comment } from './projects/task.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  private loggedInUser: Employee;

  private _projects: Project[];
  private _projects$ = new BehaviorSubject<Project[]>([]);

  private _employees : Employee[];
  private _employees$ = new BehaviorSubject<Employee[]>([]);

  private _employeesAndManager$ = new BehaviorSubject<Employee[]>([]);

  constructor(private http: HttpClient) {
 
    
   

   }

   
   get allProjects$(): Observable<Project[]> {
    return this._projects$;
  }
  get projects$(): Observable<Project[]> {
    return this.http.get(`${environment.apiUrl}/Projects/`).pipe(
      map((list: any[]): Project[] => list.map(Project.fromJson))
    );
  } 

  get employeesAndManager$(): Observable<Employee[]>{
    return this._employeesAndManager$;
  }

  get allEmployees$(): Observable<Employee[]> {
    return this._employees$;
  }

  putTask(task : Task, id : number){
    return this.http
    .put(`${environment.apiUrl}/Tasks/` + id,task)
    .pipe(catchError(this.handleError))
    .pipe(
      catchError((err) => {
        return throwError(err);
      }));
  }
  addNewTaskToProject(task : Task, id: number){
     return this.http
    .post(`${environment.apiUrl}/Tasks/?id=` +id ,task.toJSON())
    .pipe(catchError(this.handleError))
    .pipe(
      catchError((err) => {
        return throwError(err);
      }));
      
  }

  deleteTask(id :number){
    return this.http
    .delete(`${environment.apiUrl}/Tasks/` +id )
    .pipe(catchError(this.handleError))
    .pipe(
      catchError((err) => {
        return throwError(err);
      }));
      
  }

  addNewComment(id :number , comment : Comment){
    comment.author = this.loggedInUser;
    return this.http
    .post(`${environment.apiUrl}/Comments/?id=` +id ,comment)
    .pipe(catchError(this.handleError))
    .pipe(
      catchError((err) => {
        return throwError(err);
      }));
  }
  reloadProjects(){
        this.projects$.subscribe((pjs: Project[]) => {
      this._projects = pjs;
      this._projects$.next(this._projects);

    });
  }

  addEmployeeToProject(projectEmployee :ProjectEmployee){
    return this.http
    .post(`${environment.apiUrl}/projectEmployees/`, projectEmployee)
    .pipe(catchError(this.handleError))
    .pipe(
      catchError((err) => {
        return throwError(err);
      }));
  }

  removeEmployeeFromProject(eid,pid){
    
    return this.http
    .delete(`${environment.apiUrl}/projectEmployees/`+ eid +'/' + pid)
    .pipe(catchError(this.handleError))
    .pipe(
      catchError((err) => {
        return throwError(err);
      }));
  }

   getEmployeesFiltered(list :Employee[]){
    let m = [];
    for (let index = 0; index < this._employees.length; index++) {
      m.push(Object.assign({}, this._employees[index]));
    }
    for(let i= 0; i < list.length;i++){

      var x;
      for( x = 0; x < m.length; x++) {

        if(m[x]["id"] === list[i].id) {
          m.splice(x, 1);
        }
    }
    }
    return m;
  
  }


  getLoggedInUser(): Employee{  
    return this.loggedInUser;  
  }

  getLocalProject(id : number){
    return this._projects.find(p => p.id == id);
  }
  getEmployee(id){
    return this._employees.find(m => m.id == id);
  }
  addNewProject(project: Project){
  return this.http
    .post(`${environment.apiUrl}/projects/`, project)
    .pipe(catchError(this.handleError), map(Project.fromJson))
    .pipe(
      catchError((err) => {
        return throwError(err);
      }),
      tap((p: Project) => {
        this._projects = [...this._projects, p];
        this._projects$.next(this._projects);   
         })
    );
      

  }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else if (err instanceof HttpErrorResponse) {
      console.log(err);
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMessage = err;
    }
    return throwError(errorMessage);
  }

   setLoggedInUser(employee : Employee){
    this.loggedInUser = employee;
   }


  //Veranderen Als ik tijd Heb !!!
    loadUsers() : Promise<boolean>{
      return new Promise((resolve) =>{
          //Load  the loggedInUser
          this.http.get(`${environment.apiUrl}/Employees/` + -1)
          .subscribe((pjs: Employee) => {
            resolve(true);
            this.loggedInUser = pjs;
            //Load Employes without the loggedInUser
          this.http.get(`${environment.apiUrl}/Employees/`).pipe(
            map((list: any[]): Employee[] => list.map(Employee.fromJson).filter(e => e.id != this.loggedInUser.id))
          ).subscribe((pjs: Employee[]) => {
            this._employees = pjs;
            this._employees$.next(this._employees);
        });
          });

     


    //Load Employees and loggedInUser
    this.http.get(`${environment.apiUrl}/Employees/`).pipe(
      map((list: any[]): Employee[] => list.map(Employee.fromJson))
    ).subscribe((pjs: Employee[]) => {
      this._employeesAndManager$.next(pjs);
    });
      });

    }

  loadProjects(){
    this.projects$.subscribe((pjs: Project[]) => {
      this._projects = pjs;
      this._projects$.next(this._projects);

    });
  }

}
