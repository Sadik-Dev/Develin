import { Component, OnInit, Input } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { Employee } from '../projects/employee.model';
import { ProjectDataService } from '../project-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Task } from '../projects/task.model';
import { Project } from '../projects/projects.model';

declare var openNewTaskFrameJS;
declare var closeNewTaskFrameJS;
declare var errorDashJS;
declare var confirmationDashJS;

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

    
  @Input()
  public employees : Employee[];

  public currentProject : Project;
  public selectedEmployee : Employee= null;
  public htmlSelectedEmployee : HTMLElement;


  public task: FormGroup;

  public errorOnEmployee = true;
  public submitted = false;

  constructor(private _projectDataService: ProjectDataService, private fb: FormBuilder) { 
  }


  ngOnInit(): void {
    this.task = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(4)]]
    });

  }

  ngOnChanges(changes) {
  this.employees = changes.employees.currentValue.employees;
  this.currentProject = changes.employees.currentValue;
 }

  employeeSelected(worker, htmlElement){
    if( this.selectedEmployee != null ){

      if(worker.id == this.selectedEmployee.id){
        this.htmlSelectedEmployee.style.background = "rgba(190, 189, 189, 0.137)";
        this.selectedEmployee = undefined;
        this.errorOnEmployee = true;
      }
      else{
        htmlElement.style.background = "#28B19E";

        this.htmlSelectedEmployee.style.background = "rgba(190, 189, 189, 0.137)";
        this.selectedEmployee = worker;
        this.errorOnEmployee = false;


      }
    }
    else{
      htmlElement.style.background = "#28B19E";
      this.selectedEmployee = worker;
      this.errorOnEmployee = false;


    }

    this.htmlSelectedEmployee = htmlElement;
  }

  onSubmit(){
    this.submitted = true;
    if(!this.errorOnEmployee && this.task.valid){

      let newTask = new Task(0,this.task.value.name,"",2,this.selectedEmployee);

      this._projectDataService.addNewTaskToProject(newTask,this.currentProject.id)
      .pipe(
        catchError((err) => {
          document.querySelector(".errorDash").innerHTML = err;
          errorDashJS();
          return EMPTY;
        })
      ).subscribe((e) =>{
        document.querySelector(".confirmationDash p").innerHTML = "Task successfully Added";
        confirmationDashJS();
        this.closeNewTaskFrame();
        }); 
    }
     
  }




  openNewTaskFrame(){
    openNewTaskFrameJS();
  }

  closeNewTaskFrame(){
    closeNewTaskFrameJS();
    if(typeof this.htmlSelectedEmployee !== 'undefined')
    this.htmlSelectedEmployee.style.background = "rgba(190, 189, 189, 0.137)";
    this.task.reset();
    this.selectedEmployee = null;
    this.errorOnEmployee = true;
    this.submitted = false;
    this._projectDataService.reloadProjects();
  }

  validationErrorExists() {
    
    return !this.submitted ? false : this.errorOnEmployee;
  }

}

