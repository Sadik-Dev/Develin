import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../projects/projects.model';
import { Observable, Subject, EMPTY } from 'rxjs';
import { ProjectDataService } from '../project-data.service';
import { Employee, ProjectEmployee } from '../projects/employee.model';
import { Task } from '../projects/task.model';
import {Comment} from '../projects/task.model';
import { filter, distinctUntilChanged, map, debounceTime, catchError } from 'rxjs/operators';

declare var ShowWorkersToAddJS;
declare var ShowWorkersOnProjectJS;
declare var addACommentFrameJS;
declare var closeCommentFrameJS;
declare var closeTaskFrameJS;
declare var openTaskFrameJS;
declare var closeDashBoardJS;
declare var errorDashJS;
declare var confirmationDashJS;
declare var openNewTaskFrameJS;
declare var drawChart;
declare var pie;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  @Input()
  public project : Project;
  
  @Input()
  public loggedInUser : Employee;

  public employees$ : Employee[];
  public selectedtask : Task;
  public errorMessage: any;
  public respons: string;
 

  constructor(private _projectDataService: ProjectDataService) { 
 



  }
  ngOnInit(): void {
    
    }

  isManager(){
    if(typeof this.loggedInUser === 'undefined')
      return false;
    else return this.loggedInUser.isManager;
  }

     ngOnChanges(changes) {
       if(typeof changes.project.currentValue !== 'undefined'){
        this.employees$ =  this._projectDataService.getEmployeesFiltered(changes.project.currentValue.employees);
        this.project.tasks.reverse();
        this.project.tasks.sort( (a,b) => {
          if (a.state == b.state) {
            return 0;
        } else {
            return a.state == 1 ? 1 : -1;
        }
        });

        if(typeof this.selectedtask !== 'undefined'){
          let id = this.selectedtask.id;
          this.selectedtask = this.project.tasks.find(t => t.id == id);

        }

        this.project.tasks.forEach(t => {
            t.comments.sort( (a, b) => {
              return +new Date(b.date) - +new Date(a.date)});
           
        });
       setTimeout(() => this.topMedewerkersStats(changes.project.currentValue.employees, changes.project.currentValue.tasks),500);
      this.loggedInUser = this._projectDataService.getLoggedInUser();

       }

    }

    getNumberOfTasksDone(){
      var count = 0;
    for(var i = 0; i < this.project.tasks.length; ++i){
        if(this.project.tasks[i].state == 1)
            count++;
    }
      return count;
    }
    getWorkerOnTaskInitial(str){
      return str.split(" ").map((n)=>n[0]).join("").toLowerCase();;

    }

    showWorkersFrame(){
      ShowWorkersToAddJS();
    }

    showWorkersOnTheProject(){
      let workersList : any = document.querySelector(".workersList");
      let dispoWorkers : any = document.querySelector(".addAWorker");
    
      workersList.style.height = "70%";
      dispoWorkers.style.marginTop = "5%";
      document.getElementById("backWorker").style.display = "none";
      if(this.loggedInUser.isManager)
      document.getElementById("addWorker").style.display = "block";
    }

    openCommentFrame(){
      addACommentFrameJS();
    }

    closeCommentFrame(){
      closeCommentFrameJS();
    }
    
    closeTaskFrame(){
      closeTaskFrameJS();
    }

    closeDashBoard(){
      closeDashBoardJS();
    }
    
    openTaskFrame(task){
      this.selectedtask = task;
      console.log(this.selectedtask);

        openTaskFrameJS();

    }

    removeEmployee(eid){
      this._projectDataService.removeEmployeeFromProject(eid,this.project.id) .pipe(
        catchError((err) => {
          document.querySelector(".errorDash").innerHTML = "Employee Could not be Removed";
          errorDashJS();
          return EMPTY;
        })
      ).subscribe((e) =>{
        document.querySelector(".errorDash").innerHTML = `Employee Succesfully deleted`;
          this.project.removeEmployee(eid);
          this.employees$ =  this._projectDataService.getEmployeesFiltered(this.project.employees);
          document.querySelector(".confirmationDash p").innerHTML = "Employee successfully Deleted from Project";
          confirmationDashJS();
      }); 
    }

    addWorker(worker){
      let x = this._projectDataService.getEmployee(worker);
      this._projectDataService.addEmployeeToProject(new ProjectEmployee(x.id,this.project.id,this.project,x)) .pipe(
        catchError((err) => {
          document.querySelector(".errorDash").innerHTML = "Employee Could not be added";
          errorDashJS();
          return EMPTY;
        })
      ).subscribe((e: Project) =>{
        this.project.employees.push(x);
          this.employees$ =  this._projectDataService.getEmployeesFiltered(this.project.employees);
          this.showWorkersOnTheProject();
          document.querySelector(".confirmationDash p").innerHTML = "Employee successfully Added to Project";
          confirmationDashJS();
      }); 
    }
    identify(index, item){
      return item.id; 
   }

   openNewTaskFrame(){
    openNewTaskFrameJS();
  }

      taskFinished(){

      var time = prompt("Hoe lang heb jij aan de opdracht gewerkt ?", "/Uren");

      if (time == null || time == "") {
        console.log("prompt cancelled");
      } else {
   
        this.selectedtask.spentTime = parseInt(time);
        this.selectedtask.state = 1;
        this._projectDataService.putTask(this.selectedtask,this.selectedtask.id).pipe(
          catchError((err) => {
            document.querySelector(".errorDash").innerHTML = "Could not put the Task";
            errorDashJS();
            return EMPTY;
          })
        ).subscribe((e: Project) =>{
          this._projectDataService.reloadProjects();
          drawChart(this.project);
        }); 
      }

      }

      deleteTask(){
        this._projectDataService.deleteTask(this.selectedtask.id).pipe(
          catchError((err) => {
            document.querySelector(".errorDash").innerHTML = "Could not delete the Task";
            errorDashJS();
            return EMPTY;
          })
        ).subscribe((e: Project) =>{
          this._projectDataService.reloadProjects();
          this.closeTaskFrame();
          drawChart(this.project);

        }); 
      }

      createComment(textarea){
          let comment = new Comment(0,textarea.value,new Date());
          console.log(comment);
          this._projectDataService.addNewComment(this.selectedtask.id,comment).pipe(
            catchError((err) => {
              document.querySelector(".errorDash").innerHTML = "Could not make the comment";
              errorDashJS();
              return EMPTY;
            })
          ).subscribe((e: Project) =>{
            closeCommentFrameJS();
            this._projectDataService.reloadProjects();

          });
      }


      topMedewerkersStats(employees : Employee[], tasks : Task[]){
     
        let empStats = new Map();
        
        for (let index = 0; index < employees.length; index++) {
            let userId = employees[index].id;
            let totalDone = tasks.filter(t => t.state == 1 && t.employee.id == userId).length;
            empStats.set(employees[index].name,totalDone);   
        }

        empStats[Symbol.iterator] = function* () {
          yield* [...this.entries()].sort((a, b) =>  b[1] - a[1]);
      }
      
      let ranked = [...empStats];
      let total = Array.from( empStats.values()).reduce((a,b) => a + b,0);
      let segment1 = 0;
      let segment2 = 0;
      let segment3 = 0;
      let rest  = 0   
      if(employees.length == 0){
        let segment1 = 0;
        let segment2 = 0;
        let segment3 = 0;
           //1
           document.querySelectorAll(".cLegend  p")[0].innerHTML = "";      
           document.querySelectorAll(".cLegend  p")[1].innerHTML = `${0}`;      
   
           //2
           document.querySelectorAll(".cLegend  p")[2].innerHTML = "";      
           document.querySelectorAll(".cLegend  p")[3].innerHTML = `${0}`;  
           //3
           document.querySelectorAll(".cLegend  p")[4].innerHTML = "";      
           document.querySelectorAll(".cLegend  p")[5].innerHTML = `${0}`;  
         //Rest
         document.querySelectorAll(".cLegend  p")[7].innerHTML = `${rest}`;  
         pie(segment1,segment2,segment3);  
      }  
     else if(employees.length == 1){
      rest  = total -  ranked[0][1];
      let segment1 = (100 / total) * ranked[0][1];
      let segment2 = 0;
      let segment3 = 0;
         //1
         document.querySelectorAll(".cLegend  p")[0].innerHTML = ranked[0][0];      
         document.querySelectorAll(".cLegend  p")[1].innerHTML = ranked[0][1];      
 
         //2
         document.querySelectorAll(".cLegend  p")[2].innerHTML = "";      
         document.querySelectorAll(".cLegend  p")[3].innerHTML = `${0}`;  
         //3
         document.querySelectorAll(".cLegend  p")[4].innerHTML = "";      
         document.querySelectorAll(".cLegend  p")[5].innerHTML = `${0}`;  
       //Rest
       document.querySelectorAll(".cLegend  p")[7].innerHTML = `${rest}`;  
       pie(segment1,segment2,segment3);  
      }
      else if(employees.length == 2){
        rest  = total -  ranked[0][1] - ranked[1][1];
        let segment1 = (100 / total) * ranked[0][1];
        let segment2 = ((100 / total) * ranked[1][1]) + segment1;
        let segment3 = 0;

            //1
            document.querySelectorAll(".cLegend  p")[0].innerHTML = ranked[0][0];      
            document.querySelectorAll(".cLegend  p")[1].innerHTML = ranked[0][1];      
    
            //2
            document.querySelectorAll(".cLegend  p")[2].innerHTML = ranked[1][0];      
            document.querySelectorAll(".cLegend  p")[3].innerHTML = ranked[1][1];      
            //3
            document.querySelectorAll(".cLegend  p")[4].innerHTML = "";      
            document.querySelectorAll(".cLegend  p")[5].innerHTML = `${0}`;  

       //Rest
       document.querySelectorAll(".cLegend  p")[7].innerHTML = `${rest}`;  
       pie(segment1,segment2,segment3);
        }
        else{
          rest = total - ranked[0][1] - ranked[1][1] - ranked[2][1];
          let segment1 = (100 / total) * ranked[0][1];
          let segment2 = ((100 / total) * ranked[1][1]) + segment1;
          let segment3 = ((100 / total) * ranked[2][1]) + segment2;
        //1
        document.querySelectorAll(".cLegend  p")[0].innerHTML = ranked[0][0];      
        document.querySelectorAll(".cLegend  p")[1].innerHTML = ranked[0][1];      

        //2
        document.querySelectorAll(".cLegend  p")[2].innerHTML = ranked[1][0];      
        document.querySelectorAll(".cLegend  p")[3].innerHTML = ranked[1][1];      
        //3
        document.querySelectorAll(".cLegend  p")[4].innerHTML = ranked[2][0];      
        document.querySelectorAll(".cLegend  p")[5].innerHTML = ranked[2][1];  

       //Rest
      document.querySelectorAll(".cLegend  p")[7].innerHTML = `${rest}`;  
      pie(segment1,segment2,segment3);
        }
   
    
      }
    
    
  }

   