document.addEventListener("DOMContentLoaded", function(event) {


function makeAJAXCall(methodType, url, callback){
  var xhr = new XMLHttpRequest();
  xhr.open(methodType, url, true);
  xhr.onreadystatechange = function(){
    callback(xhr.response);
  }
  xhr.send();
  console.log("request sent to the server");
}

var url = "https://api.github.com/users";

function renderUsers(data){
  console.log(data)
}
makeAJAXCall("GET", url, renderUsers);






});