window.onload = init;

function sendPreviousArray(jsonarray) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://sc-7.cs.mun.ca/previousArray.json");
	xmlhttp.setRequestHeader("cache-control", "no-cache");
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify(jsonarray));
}

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
	var previousCrsArray;
	var url = "http://sc-7.cs.mun.ca/previousCourses.json";
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			previousCrsArray = JSON.parse(request.responseText);
		}
	};
	request.open("GET", url, false);
	request.send();

	return previousCrsArray; 
}

function init() {
	var previousCrsArray = getPreviousCrsArray();
	for(i = 0; i < previousCrsArray.length; i++) {
		var key = previousCrsArray[i].key;
		var value = previousCrsArray[i]; 
		addPreviousCourseToDOM(key, value);
	}
}