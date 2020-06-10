 

async  function drawChart(project) {
  let monthStrings =  getPrecedentMonths();

  let hours = [0 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  let doneTasks = project.tasks.filter(t => t.state == 1);

  for(let i= 0; i < doneTasks.length; i++){
    if(monthDiff(new Date(doneTasks[i].dateOfFinish),new Date()) >11)
    continue;
    let month = new Date(doneTasks[i].dateOfFinish).getMonth();
    let year = new Date(doneTasks[i].dateOfFinish).getFullYear();

      let time = doneTasks[i].spentTime;
      let iAr = 11 - (new Date().getMonth() - month);
      if(iAr > 11 )
      iAr = (iAr % 11) - 1;
      hours[iAr] += time;
  }
  
  let maxH = () => {
    return hours.reduce(function (p, v) {
      return ( p > v ? p : v );
    });
  }
  let totaal = hours.reduce(function(a, b){
    return a + b;
    }, 0);

    maxH += 10;

  document.querySelector(".totaalUren").innerHTML = 'Totaal ' + totaal + ' Uren';

  var data = google.visualization.arrayToDataTable([
    ['Maand', 'Uren'],
    [monthStrings[0],  hours[0]],
    [monthStrings[1],  hours[1]],
    [monthStrings[2],  hours[2]],
    [monthStrings[3],  hours[3]],
    [monthStrings[4],  hours[4]],
    [monthStrings[5],  hours[5]],
    [monthStrings[6],  hours[6]],
    [monthStrings[7],  hours[7]],
    [monthStrings[8],  hours[8]],
    [monthStrings[9], hours[9]],
    [monthStrings[10],  hours[10]],
    [monthStrings[11],  hours[11]]
  ]);
  
  var chartHeight =  $(window).height() * 0.6;
    var options = {
    width: $(window).width(),
    height: chartHeight ,
    curveType: 'function',
    pointSize: 2,
    legend: { position: 'none' },
    'backgroundColor': 'transparent',
    vAxis: {
        baselineColor: 'transparent',
        textStyle: {
            color: 'transparent',
            fontSize: 10,
            fontName: 'Comfortaa',
            bold: false,
            italic: false
         }, 
         gridlines: {
           count: 4,
          color: 'transparent'
          }
          ,  viewWindow: {  // <-- set view window
            min: 0,
            max: maxH 
          }

    },
    hAxis: {
      baselineColor: 'white',
        textStyle: {
            color: 'white',
            fontSize: 9,
            fontName: 'Comfortaa',
            bold: false,
            italic: false
         },
         gridlines: {
          count: 4,
         color: 'transparent'
         }
    },
    series: {
        0: { color: 'white' },
        1: { color: 'white' }
      },
      
};

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

await  chart.draw(data, options);

  
}

 async function openDashboardJS(project){

   //Animation
  console.log("openend by ");

   document.getElementById("dashboardP").style.top = "2%";
   document.getElementById("dashboardP").style.left = "0%";
   document.getElementById("dashboardP").style.width = "100%";
   document.getElementById("dashboardP").style.height = "95vh";


  let navItems = document.querySelectorAll(".item");
  for (let index = 0; index < navItems.length; index++) {
    navItems[index].style.marginTop = "100%";
    
  }
  
  await google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart(project));



   
}

function ShowWorkersOnProjectJS(){
  
}

function ShowWorkersToAddJS(){
  let workersList = document.querySelector(".workersList");
  let dispoWorkers = document.querySelector(".addAWorker");

  workersList.style.height = "0%";
  dispoWorkers.style.marginTop = "0%";
  document.getElementById("backWorker").style.display = "block";
  document.getElementById("addWorker").style.display = "none";
}
function addACommentFrameJS(){
  document.querySelector(".addACommentFrame").style.width = "100%"

}

function closeCommentFrameJS(){
  document.querySelector(".addACommentFrame").style.width = "0%"

}

function closeTaskFrameJS(){
  document.querySelector(".taskFrame").style.width = "0%"

}

function closeDashBoardJS(){

  document.getElementById("dashboardP").style.width = "0%";
  document.getElementById("dashboardP").style.height = "4vh";
  document.getElementById("dashboardP").style.top = "50%";
  document.getElementById("dashboardP").style.left = "45%";

  closeCommentFrameJS();
  closeTaskFrameJS();
  ShowWorkersOnProjectJS();
  
  let navItems = document.querySelectorAll(".item");
  for (let index = 0; index < navItems.length; index++) {
    navItems[index].style.marginTop = "1%";
    
  }
}

function openTaskFrameJS(){
  document.querySelector(".taskFrame").style.width = "100%"

}

function openNewTaskFrameJS(){
  document.querySelector(".newTaskFrame .hi2").style.display = "flex";
}

function closeNewTaskFrameJS(){
  document.querySelector(".newTaskFrame .hi2").style.display = "none";
}

function pie(s1,s2,s3){
  document.getElementsByClassName("pie")[0].style.setProperty('--segment1', s1);
  document.getElementsByClassName("pie")[0].style.setProperty('--segment2', s2);
  document.getElementsByClassName("pie")[0].style.setProperty('--segment3', s3);

}
//Geef laatste 12 maanden
function getPrecedentMonths(){
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];
  let months = [];
  let thisMonth = new Date();
  months.push(`${monthNames[thisMonth.getMonth()]} /20`);
  let year = thisMonth.getFullYear() - 2000;
  for(let i = 1; i < 12; i++){
    let date = new Date();
    let month = thisMonth.getMonth() - i;

    if(month == -1){
      month = 11;
      year = thisMonth.getFullYear() - 2001;
    }

    date.setMonth(month);

    months.push(`${monthNames[date.getMonth()]} / ${year}`);
  }
 return  months = months.reverse();
}

function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}