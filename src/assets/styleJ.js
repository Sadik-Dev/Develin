

 function loadEvents(){
    
     
    //Filter Box

        //Show Filter 
        var mainF = document.getElementsByClassName("mainF")[0];
        mainF.onclick = showFilterBox;

        //Make Input empty 
     


    

}

var newProjectFrameOpen = false;

var filterShown = false;
function showFilterBox(){

    if(!filterShown){
        var mainF = document.getElementsByClassName("mainF")[0];
        mainF.style.width = "3%";

        var content = document.querySelectorAll(".filter .content")[0];
        content.style.width = "70%";

        filterShown = true;
    }
    else{
        var mainF = document.getElementsByClassName("mainF")[0];
        mainF.style.width = "30%";
        var content = document.querySelectorAll(".filter .content")[0];
        content.style.width = "0%";
        filterShown = false;

    }

}

function resetFilterInput(){
    var input = document.getElementById("filterI");
    input.value = "";
}


function confirmationJS(){
    let alert = document.getElementsByClassName("confirmation")[0];
   

    setTimeout(function(){
            alert.style.display = "flex";
            setTimeout(function(){
                alert.style.width = "35%";

            },500);

          setTimeout(function(){
            alert.style.width = "0%"
            setTimeout(function(){
                alert.style.display = "none";
            },1000);


          },5000);      
    }),200;
  
}


function confirmationDashJS(){
     
    let alert = document.getElementsByClassName("confirmationDash")[0];

    setTimeout(function(){
            alert.style.display = "flex";
            setTimeout(function(){
                alert.style.width = "35%";

            },500);

          setTimeout(function(){
            alert.style.width = "0%"
            setTimeout(function(){
                alert.style.display = "none";
            },1000);


          },5000);      
    }),200;
  
}

function errorJS(){
    setTimeout(function(){
        let alert = document.getElementsByClassName("error")[no];
        alert.style.display = "flex";
        setTimeout(function(){
            alert.style.width = "35%";

        },200);

          setTimeout(function(){
            alert.style.width = "0%"
            setTimeout(function(){
                alert.style.display = "none";

            },500);

          },5000);      
    }),200;
}

function errorDashJS(){
    setTimeout(function(){
        let alert = document.getElementsByClassName("errorDash")[0];
        alert.style.display = "flex";
        setTimeout(function(){
            alert.style.width = "35%";

        },200);

          setTimeout(function(){
            alert.style.width = "0%"
            setTimeout(function(){
                alert.style.display = "none";

            },500);

          },5000);      
    }),200;
}