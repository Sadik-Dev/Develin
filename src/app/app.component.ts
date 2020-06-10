import { Component } from '@angular/core';
import { Project } from './projects/projects/projects.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'develin';

  constructor(){
  
  }

  addNewProject(project: Project){

  }
}
