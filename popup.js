var toggleOptions = document.getElementById('toggleOptions');
var init = true;
var flip;
/*
if(init){
    flip=false;
    chrome.storage.sync.set({'toggle': false});
    toggleOptions.style = "background-color: red";
    init = false
    console.log("...");
}
*/
chrome.storage.sync.get('toggle', function(result) {
    flip = result.toggle;
    toggleOptions.style = "background-color: "+flip;
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