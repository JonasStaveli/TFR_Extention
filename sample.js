var more = false;
function setPerson(info, tab){mainSend("person");}
function setMale(info, tab){mainSend("male")}
function setFemale(info, tab){mainSend("female")}
function setDead(info, tab){mainSend("dead")}
function setAlive(info, tab){mainSend("alive")}

function mainSend(call) {
  
  chrome.tabs.query({
    "active": true,
  "currentWindow": true
  }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {
       "Paste": call
  });
  
 });
}

function mycallback(info, tab) {
  chrome.tabs.sendMessage(tab.id, "getClickedEl", function(clickedEl) {
    elt.value = clickedEl.value;
    
  });
  
}

chrome.storage.onChanged.addListener(function(changes, areaName){
  
  if(changes.toggle != undefined){
  more = changes.toggle.newValue;
  console.log("Change: " + changes.toggle.newValue +" "+ more);
  }
 
  if(more == "green"){
    chrome.contextMenus.removeAll();
    var parent = chrome.contextMenus.create({"title": "Lim inn...","contexts":["editable"]})
   chrome.contextMenus.create({"title": "Test person","onclick": setPerson,"contexts":["editable"],"parentId": parent});
   chrome.contextMenus.create({"title": "Test mann","onclick": setMale,"contexts":["editable"],"parentId": parent});
   chrome.contextMenus.create({"title": "Test kvinne","onclick": setFemale,"contexts":["editable"],"parentId": parent});
   chrome.contextMenus.create({"title": "Død testperson","onclick": setDead,"contexts":["editable"],"parentId": parent});
   chrome.contextMenus.create({"title": "Levende testperson","onclick": setAlive,"contexts":["editable"],"parentId": parent});
  }else{
    chrome.contextMenus.removeAll();
    chrome.contextMenus.create({"title": "Lim inn test personnummer","onclick": setPerson,"contexts":["editable"]});
  }
});

chrome.runtime.onStartup.addListener(function(){
  chrome.contextMenus.removeAll();
  chrome.contextMenus.create({"title": "Lim inn test personnummer","onclick": setPerson,"contexts":["editable"]});
});


chrome.runtime.onInstalled.addListener(function() { 
  chrome.storage.sync.set({'toggle': "red"});

  fetch("https://mrsutilities.azurewebsites.net/api/GetTestPerson").then((resp) => resp.json()).then(function(data){
    chrome.storage.sync.set({'person': data[0]});
  });
  
  fetch("https://mrsutilities.azurewebsites.net/api/GetTestPerson?Gender=M").then((resp) => resp.json()).then(function(data){
            chrome.storage.sync.set({'male': data[0]});
  });

  fetch("https://mrsutilities.azurewebsites.net/api/GetTestPerson?Gender=K").then((resp) => resp.json()).then(function(data){
            chrome.storage.sync.set({'female': data[0]});
  });

  fetch("https://mrsutilities.azurewebsites.net/api/GetTestPerson?IsDead=True").then((resp) => resp.json()).then(function(data){
      chrome.storage.sync.set({'dead': data[0]});
  });

  fetch("https://mrsutilities.azurewebsites.net/api/GetTestPerson?IsDead=False").then((resp) => resp.json()).then(function(data){
      chrome.storage.sync.set({'alive': data[0]});
  });

});

