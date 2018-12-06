var toggleOptions = document.getElementById('toggleOptions');
var toggleEnter = document.getElementById('toggleEnter');

var flip;
var flipE;

chrome.storage.sync.get('AdvancedContextMenu', function(result) {
    console.log("ACM: "+result.AdvancedContextMenu);
    $('#toggleOptions').prop('checked', JSON.parse(result.AdvancedContextMenu)).change() 
    flip=JSON.parse(result.AdvancedContextMenu);
  });

  chrome.storage.sync.get('enter', function(result) {
    console.log("enter: "+result.enter);
    $('#toggleEnter').prop('checked', JSON.parse(result.enter)).change()
    flipE = JSON.parse(result.enter);
  });


toggleOptions.onchange = function(event){ 
    console.log("togleOptions: "+event.target.checked);
    chrome.storage.sync.set({'AdvancedContextMenu': event.target.checked});
};


toggleEnter.onchange = function(event){
    console.log("togleEnter: "+event.target.checked);
    chrome.storage.sync.set({'enter': event.target.checked});
};