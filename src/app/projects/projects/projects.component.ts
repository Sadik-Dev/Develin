import { Component, OnInit, Input } from '@angular/core';
import { Project } from './projects.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})




export class ProjectsComponent implements OnInit {
  @Input() public project: Project;
 


  constructor(){
    
  }

 
  
  ngOnInit(): void {
  }

}
