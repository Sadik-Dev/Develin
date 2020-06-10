import { Employee } from './employee.model';

export class Task {
    public titel : string;
   public description : string;
   public state: number;
   public employee: Employee;
   public comments: Comment[];
   public spentTime: number;
  public projectId: number;
  public id: number;
 
     constructor(id: number,name: string, description: string , state: number, employee: Employee, comments ? :Comment[],spentTime? : number,projectId? : number){
        this.titel = name;
        this.id = id;
        this.description = description;
        this.state = state; 
        this.employee = employee;    
        this.comments = comments;     
        this.spentTime = spentTime;  
        this.projectId = projectId;
     }
   
      
    toJSON(): TaskJSON {
      return <TaskJSON>{
        id: this.id,
        titel: this.titel,
        employee: this.employee,
        state: this.state,
        spendTime: this.spentTime
      };
    }
    
   
   }


   interface TaskJSON {
      id: number;
      titel : string;
      employee: Employee;
      state : number;
      spendTime: number;      
    }


    export class Comment{
     public id: number;
     public text: string;
     public author: Employee;
     public date : Date;
     
     constructor(id : number, text : string,  date :Date, author ?: Employee){
         this.id = id;
         this.text = text;
         this.author = author;
         this.date = date;
     }

    }