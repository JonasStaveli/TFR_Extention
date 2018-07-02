var toggleOptions = document.getElementById('toggleOptions');
var init = true;
var flip;
var flipE;

chrome.storage.sync.get('toggle', function(result) {
    flip = result.toggle;
    toggleOptions.style = "background-color: "+flip;
  });
  chrome.storage.sync.get('enter', function(result) {
    flipE = result.enter;
    toggleEnter.style = "background-color: "+ flipE;
  });


toggleOptions.onclick = function(element){
    
    if(flip == "green"){
        
        chrome.storage.sync.set({'toggle': "red"});
        console.log("single");
        toggleOptions.style = "background-color: red";
        flip="red";
    }else{
        
        chrome.storage.sync.set({'toggle': "green"});
        console.log("multi");
        toggleOptions.style = "background-color: green";
        flip="green";
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