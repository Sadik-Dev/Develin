import { Pipe, PipeTransform } from '@angular/core';
import { Project } from './projects/projects.model';

@Pipe({
  name: 'projectFilter'
})
export class ProjectFilterPipe implements PipeTransform {

  transform(projects: Project[], name: string): Project[] {
    if(!name || name.length === 0){
      return projects
    }
    return projects.filter(p => p.name.toLocaleLowerCase()
    .startsWith(name.toLocaleLowerCase()));
  }

}
