import { Component, OnInit } from '@angular/core';
import { Project } from '../projects/projects.model';
import { ProjectDataService } from '../project-data.service';
import {Subject, Observable} from 'rxjs';
import { distinctUntilChanged, debounceTime, map, filter} from 'rxjs/operators';
import { Employee } from '../projects/employee.model';
declare var  openDashboardJS;
declare var loadEvents;

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent implements OnInit {

  public filterProjectName: string;
  private _fetchProjects$: Observable<Project[]> = this._projectDataService.allProjects$;
  public filterProject$ = new Subject<string>();
  public selectedProject : Project;
  
  public loggedInUser : Employee;

  constructor(private _projectDataService: ProjectDataService) { 
    this.filterProject$
    .pipe(
      distinctUntilChanged(),
      debounceTime(400),
      map(val => val.toLowerCase())
    )
    .subscribe(val => (this.filterProjectName = val));
  }

  ngOnInit(): void {
    this._projectDataService.loadProjects();
    this._projectDataService.loadUsers().then( (e) => {
      this.loggedInUser = this._projectDataService.getLoggedInUser();
    });
  }

 applyFilter(filter: string) {
    this.filterProjectName = filter;
  } 
  
  get projects$(): Observable<Project[]>{
  
    return this._fetchProjects$;
  }

  async openDashboard(id){
    await this._fetchProjects$.subscribe(async (pjs: Project[]) => {
    this.selectedProject = await pjs.find(p => p.id == id);
  });
  openDashboardJS(this.selectedProject);

  }

  
}
