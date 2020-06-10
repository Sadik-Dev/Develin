import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Project } from '../projects/projects.model';
import { Observable, EMPTY } from 'rxjs';
import { Employee, ProjectEmployee } from '../projects/employee.model';
import { ProjectDataService } from '../project-data.service';
import { retry, catchError } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

declare var confirmationJS;
declare var errorJS;
let workersToAdd = [];

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  private _fetchEmployees$: Observable<Employee[]> = this._projectDataService.allEmployees$;
  public respons: string = '';
  public errorMessage: string = '';

  public project: FormGroup;

  @Input()
  public frameOpen : boolean;
  constructor(private _projectDataService: ProjectDataService, private fb: FormBuilder) { 
  }

  ngOnInit(): void {
    this.project = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(4)]]
    });

  }

  ngOnChanges(changes) {
    if(changes.frameOpen.currentValue){
 
    //Workers Selected
    let workers =  document.querySelectorAll(".workersLayer .worker");
    
    for(let i = 0; i < workers.length; i++){
      let worker : any =    workers[i];
      let toAdd;
        worker.onclick = function(){
          
           let color = window.getComputedStyle( workers[i] ,null).getPropertyValue('color');
            if(color == "rgb(0, 0, 0)"){
                worker.style.color = "white";
                worker.style.backgroundColor = "#43BF89";
                 toAdd = parseInt(worker.lastElementChild.innerHTML);     

                 let empls =   document.getElementsByClassName("selectedEmplys")[0];
                 workersToAdd.push(toAdd);  
                 empls.setAttribute("data-workers",workersToAdd.toString());

            }


            else{
                worker.style.color = "black";
                worker.style.backgroundColor = "rgba(190, 189, 189, 0.137)";
                
                let index = workersToAdd.indexOf(parseInt(worker.lastElementChild.innerHTML));
                console.log(index);
                if (index > -1) {
                workersToAdd.splice(index, 1);
                }
                console.log(workersToAdd);
                let empls =   document.getElementsByClassName("selectedEmplys")[0];
                empls.setAttribute("data-workers",workersToAdd.toString());
              }




        }
    }
  
    }
  }

  onSubmit(workers: HTMLInputElement){
    let ids = workers.getAttribute("data-workers");
    console.log(ids);
    let arrayOfIds = ids.split(",");

    let employees = [];

    if(arrayOfIds[0] !== "")
    for(let i = 0; i < arrayOfIds.length; i++){
      let pe = new ProjectEmployee(parseInt(arrayOfIds[i]),0);
      employees.push(pe);
    }

    let p = new Project(0,this.project.value.name,employees,new Date(),[]);
    this._projectDataService.addNewProject(p)
    .pipe(
      catchError((err) => {
        this.errorMessage = err;
        errorJS();
        return EMPTY;
      })
    ).subscribe((e: Project) =>{
        this.respons = `Project Succesfully added` ;
        this._projectDataService.reloadProjects();
        confirmationJS();
        this.closeNewProjectFrame();
    });  }



  get employees$(): Observable<Employee[]>{
    return this._fetchEmployees$;
  }
 

  closeNewProjectFrame(){
    let frame : any = document.getElementsByClassName("hi")[0]
    frame.style.display = "none";
    //   document.querySelector(".firstPane input").value = "";
    let workers =  document.querySelectorAll(".workersLayer .worker");
    for(let i = 0; i < workers.length; i++){
      let worker : any = workers[i];
           worker.style.color = "black";
           worker.style.backgroundColor = "rgba(190, 189, 189, 0.137)";
           worker.removeAttribute("click");
       }
     let empls : any =  document.getElementsByClassName("selectedEmplys")[0];
      empls.setAttribute("data-workers",workersToAdd);
      workersToAdd.splice(0,workersToAdd.length);
      this.project.reset();
  }
}
