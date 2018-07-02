var clickedEl = null;
var personData = null;
var enter = null;

chrome.extension.onMessage.addListener(function (message, sender, callback) {
    if (message.Paste == "person") {
        chrome.storage.sync.get('person', function(result) {
            personData = result.person;
            clickedEl.value = personData.Pid;
        });
        fetch("https://mrsutilities.azurewebsites.net/api/GetTestPerson").then((resp) => resp.json()).then(function(data){
            chrome.storage.sync.set({'person': data[0]});
        });
    }else if(message.Paste == "male"){
        chrome.storage.sync.get('male', function(result) {
            personData = result.male;
            clickedEl.value = personData.Pid;
        });
        fetch("https://mrsutilities.azurewebsites.net/api/GetTestPerson?Gender=M").then((resp) => resp.json()).then(function(data){
            chrome.storage.sync.set({'male': data[0]});
        });
    }else if(message.Paste == "female"){
        chrome.storage.sync.get('female', function(result) {
            personData = result.female;
            clickedEl.value = personData.Pid;
        });
        fetch("https://mrsutilities.azurewebsites.net/api/GetTestPerson?Gender=K").then((resp) => resp.json()).then(function(data){
            chrome.storage.sync.set({'female': data[0]});
        });
    }else if(message.Paste == "dead"){
        chrome.storage.sync.get('dead', function(result) {
            personData = result.dead;
            clickedEl.value = personData.Pid;
        });
        fetch("https://mrsutilities.azurewebsites.net/api/GetTestPerson?IsDead=true").then((resp) => resp.json()).then(function(data){
            chrome.storage.sync.set({'dead': data[0]});
        });
    }else if(message.Paste == "alive"){
        chrome.storage.sync.get('alive', function(result) {
            personData = result.alive;
            clickedEl.value = personData.Pid;
        });
        fetch("https://mrsutilities.azurewebsites.net/api/GetTestPerson?IsDead=false").then((resp) => resp.json()).then(function(data){
            chrome.storage.sync.set({'alive': data[0]});
        });
    }
    chrome.storage.sync.get('enter', function(result) {
        enter = result.enter;
        
      });

    
    setTimeout(function(){
        if(personData != null){
            console.log("Pid: "+personData.Pid+" FirstName: "+personData.FirstName+" MiddleName: "+personData.MiddleName+" LastName: "+personData.LastName+" FullName: "+personData.FullName+" Gender: "+personData.Gender+" IsDead: "+personData.IsDead);
            if(enter == "green"){
                var keyboardEventDown = new KeyboardEvent('keydown', {bubbles:true, key:"Enter", code:"Enter"});
                var keyboardEventPress = new KeyboardEvent('keypress', {bubbles:true, key:"Enter", code:"Enter"}); 
                var keyboardEventUp = new KeyboardEvent('keyup', {bubbles:true, key:"Enter", code:"Enter"}); 
                document.getElementById(clickedEl.id).dispatchEvent(keyboardEventDown);
                document.getElementById(clickedEl.id).dispatchEvent(keyboardEventPress);
                document.getElementById(clickedEl.id).dispatchEvent(keyboardEventUp);
               // console.log(keyboardEvent);
            }
        }    
    }, 100);

});

//Lisener for right click
document.addEventListener("mousedown", function(event){
    if(event.button == 2) { 
        clickedEl = event.target;

    }
}, true);

//Get the element
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request == "getClickedEl") {
        sendResponse({value: clickedEl.value});
    }
});
