window.onload = function(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

  //AddWorkerBtn
    let button1 = document.querySelector("#addWorker");
    let button2 = document.querySelector("#backWorker");

    button1.onclick = function(){
      let workersList = document.querySelector(".workersList");
      let dispoWorkers = document.querySelector(".addAWorker");

      workersList.style.height = "0%";
      dispoWorkers.style.marginTop = "2%";
      document.getElementById("backWorker").style.display = "block";
      document.getElementById("addWorker").style.display = "none";

    }
    button2.onclick = function(){
      let workersList = document.querySelector(".workersList");
      let dispoWorkers = document.querySelector(".addAWorker");

      workersList.style.height = "70%";
      dispoWorkers.style.marginTop = "5%";
      document.getElementById("backWorker").style.display = "none";
      document.getElementById("addWorker").style.display = "block";

    }

    // Open New Comment form
    document.querySelector(".addCommentB").onclick = function(){
      document.querySelector(".addACommentFrame").style.width = "100%"
    }
    //Close it
    document.querySelector(".closeNCF").onclick = function(){
      document.querySelector(".addACommentFrame").style.width = "0%"

    }

    //Open Task Frame

    let tasks = document.querySelectorAll(".task")

    for(let i = 0; i < tasks.length;i++){
        tasks[i].onclick = function(){
      
          document.querySelector(".taskFrame").style.width = "100%"
        }
    }
    
    
 
    //Close it
    document.querySelector("#closeTF").onclick = function(){
      document.querySelector(".taskFrame").style.width = "0%"

    }

    //Worker hover effect
    let workersCards = document.querySelectorAll(".worker");

    for(let i =0; i< workersCards.length; i++){
      workersCards[i].lastElementChild.onclick = function(){
        
      }

      workersCards[i].onmouseover = function(){
        workersCards[i].lastElementChild.src = "/delWorker.png"
      }

      workersCards[i].onmouseout = function(){
        workersCards[i].lastElementChild.src ="/icons8-menu-vertical-90.png";
      }
    }


}
async  function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Month', 'Sales'],
    ['Januari',  0],
    ['Februari',  80],
    ['Maart',  80],
    ['April',  160],
    ['Mei',  10],
    ['Juni',  50],
    ['Juli',  40],
    ['Augustus',  75],
    ['September',  79],
    ['Oktober',  55],
    ['November',  61],
    ['December',  96]
  ]);

  var options = {
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