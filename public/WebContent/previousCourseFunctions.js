window.onload = init;

function addPreviousCourseToDOM(key, courseObject) {
	var courses = document.getElementById("cross");
	var row = courses.insertRow(1);
	row.setAttribute("id", key);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
    var button = document.createElement("input");
    button.type = "Submit";
    button.value = "Remove";
    button.addEventListener("click", function() {deleteRow(courseObject)});
    cell1.innerHTML = courseObject.name;
    cell2.innerHTML = courseObject.number;
    for(n = 0; n < courseObject.room.length; n++) {
    	cell3.innerHTML += "<br>" + courseObject.room[n]; 
	}
    cell4.innerHTML = courseObject.time;
}

function getPreviousCrsArray() {
	var previousCrsArray = localStorage.getItem("previous");
	if(!previousCrsArray) {
		previousCrsArray = [];
		localStorage.setItem("previous", JSON.stringify(previousCrsArray));
	}
	else {
		previousCrsArray = JSON.parse(previousCrsArray);
	}
	return previousCrsArray; 
}

function init() {
	var previousCrsArray = getPreviousCrsArray();
	for(i = 0; i < previousCrsArray.length; i++) {
		var key = previousCrsArray[i].key;
		var value = JSON.parse(localStorage[key]);
		addPreviousCourseToDOM(key, value);
	}
}