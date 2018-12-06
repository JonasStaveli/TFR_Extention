var toggleOptions = document.getElementById('toggleOptions');
var toggleEnter = document.getElementById('toggleEnter');

var flip;
var flipE;

chrome.storage.sync.get('AdvancedContextMenu', function(result) {
    $('#toggleOptions').prop('checked', false).change()
    flip=false;
  });

  chrome.storage.sync.get('enter', function(result) {
    if(result.enter == "red"){
        flipE = result.enter;
        //toggleEnter.style = "background-color: "+ flipE;
        toggleEnter.checked = false;
    }else{
        flipE = result.enter;
        //toggleEnter.style = "background-color: "+ flipE;
        toggleEnter.checked = true;
    }

    
  
  });


toggleOptions.onchange = function(element){
    
    if(flip == true){
        console.log("togleOptions: true");
        chrome.storage.sync.set({'AdvancedContextMenu': "false"});
        //$('#toggleOptions').prop('checked', false).change()
        //toggleOptions.style = "background-color: red";
        flip=false;
    }else{
        
        chrome.storage.sync.set({'AdvancedContextMenu': "true"});
        //$('#toggleOptions').prop('checked', true).change()
        //toggleOptions.style = "background-color: green";
        flip=true;
    }
    
};

toggleEnter.onclick = function(element){
    
    if(flipE == "green"){
        
        chrome.storage.sync.set({'enter': "red"});
        console.log("none");
        toggleEnter.style = "background-color: red";
        flipE="red";
    }else{
        
        chrome.storage.sync.set({'enter': "green"});
        console.log("enter");
        toggleEnter.style = "background-color: green";
        flipE="green";
    }
    
};