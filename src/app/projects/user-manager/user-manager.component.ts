import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openTypeFilter(){
    let div = document.getElementById('typeContainer');
    div.style.background = "#28B19E";
    div.style.color = "white";
    div.style.borderColor = "#28B19E";

    $('#typeContainer')
    div.style.height = "fit-content";


    $('.boxHidden').css('display','block');

    let icon : any =  document.getElementsByClassName("expandbot")[0];
    icon.style.display = "none";
  }
}
