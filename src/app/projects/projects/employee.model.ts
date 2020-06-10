import { Task } from './task.model';
import { Project } from './projects.model';

interface EmployeesJson {
  id : number;
  name : string;
  gender : string;
  tasks : Task[];
  isManager: boolean;
}


interface ProjectEmployeeJson {
   employeeId : number;    
   projectId : number;    
}


export class Employee {
    public name : string;
    public id : number;    
    public gender : string;
    public tasks : Task[];
    public isManager : boolean;

     constructor(name: string, id : number, gender : string ,isManager : boolean, tasks? : Task[]){
         this.name = name;
         this.id = id; 
         this.gender = gender;
         this.tasks = tasks;
         this.isManager = isManager;
     }
   
     static fromJson(json: EmployeesJson): Employee {
   
      const rec =  new Employee(json.name,json.id,json.gender,json.isManager);
      return rec;
    }


  
   }

   export class ProjectEmployee{
    public employeeId : number;    
    public projectId : number;    
    public employee: Employee;
    public project : Project;

    constructor( employeeId: number, projectId: number, project? :Project, employee?: Employee ){
      this.project = project;
      this.employee = employee;

      this.employeeId = employeeId;
      this.projectId = projectId;
    }

  toJSON(): ProjectEmployeeJson {
    return <ProjectEmployeeJson>{
      
      employeeId: this.employeeId,
      projectId: this.projectId
    };
  }

   }