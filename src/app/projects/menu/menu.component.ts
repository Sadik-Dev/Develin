import { Component, OnInit, Output, Input } from '@angular/core';
import { ProjectDataService } from '../project-data.service';
import { Employee } from '../projects/employee.model';
import { DevelinService } from 'src/app/projects/develin.service';

declare var loadEvents;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  @Input()
  public loggedInUser: Employee;
  public newProjectFrameIsOpen = false;
  public isUserManagerOpen = false;

  constructor(private _projectDataService: ProjectDataService, private _develinService: DevelinService) {
   }

  ngOnInit(): void {
  
    loadEvents();
  }
  ngOnChanges(changes) {

  }
  logout() {
    localStorage.removeItem('currentUserToken');
    document.location.reload();
  }
  isManager(){
    if(typeof this.loggedInUser === 'undefined')
    return false;
    else return this.loggedInUser.isManager;
  }
  openNewProjectFrame(){
    this.newProjectFrameIsOpen = true;
    let frame : any =  document.getElementsByClassName("hi")[0];
    frame.style.display = "flex";
  }

  openUserManager(){
    this._develinService.isUserManagerOpen = true;
  }





}
