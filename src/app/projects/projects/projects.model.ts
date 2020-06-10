import { Task } from './task.model';
import { Employee, ProjectEmployee } from './employee.model';
import { HostBinding } from '@angular/core';

interface ProjectsJson {
    id: number;
    name : string;
    employees : ProjectEmployee[];
    tasks: Task[];
    created: Date;
    manager: Employee;
  }


  export class Project {
    
    public id: number;
    public name : string;
    public manager: Employee;
    public employees : Employee[];
    public tasks: Task[];
    public progression : number;
    public creationDate: Date;


    constructor(id: number,name: string, employees : Employee[], creationDate: Date, tasks : Task[], manager?: Employee){
        this.name = name;
        this.employees = employees;
        this.tasks = tasks;
        this.id = id;
        this.manager = manager;
        this.creationDate = creationDate;
        this.manager = manager;
        this.employees = employees;
      this.calculateProgression();
    }

    static fromJson(json: ProjectsJson): Project {

      let tasks = [];
      if (typeof json.tasks !== 'undefined'){

        json.tasks.forEach(task => {
          tasks.push(new Task(task.id,task.titel, task.description,task.state,task.employee,task.comments,task.spentTime));
        });
      }
      let employees = [];
      if (typeof json.employees !== 'undefined'){

        for (let index = 0; index < json.employees.length; index++) {
          employees.push(json.employees[index].employee); 
        }
        

      }
      const rec =  new Project(json.id,json.name,employees ,json.created,json.tasks, json.manager);
      return rec;
    }



    toJSON(): ProjectsJson {
      return <ProjectsJson><unknown>{
        id: this.id,
        name: this.name,
        employees: this.employees,
        created: this.creationDate,
        manager: this.manager,
        tasks: this.tasks
      };
    }
    
    removeEmployee(id){
      for (let i = 0; i < this.employees.length; i++) {
        if(id == this.employees[i].id){
          this.employees.splice(i, 1);
        
        }        
      }
   
    }
     calculateProgression(){
    /* Progression */
    if(this.tasks.length == 0){
      this.progression = 0;

    }
    else {
      let amount = 0;
      this.tasks.forEach(t => {
        if(t.state == 1) amount += 1;
      });
      let result =( 100 / this.tasks.length ) * amount;
     this.progression = Math.trunc(result);
  
    }
  }
  degreesOfProgression(){
      let x = (180 / 100) * this.progression;
      let styles = {
        'transform': `rotate(${x}deg)`
      };
      return styles;

    }


}