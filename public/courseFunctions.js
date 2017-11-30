var initTableHTML;
window.onload = init;
function createTable() {
	var courseArray = getCourseArray();
	var currentDate = new Date();
	var courseName = document.getElementById("full").value.trim();
	var courseNum = document.getElementById("ful").value.trim();
	var roomName = document.getElementById("fll").value.trim();
	var courseExists = false;
	if(courseName != "" && courseNum != "" && roomName != "") {
		for(i = 0; i < courseArray.length && !courseExists; i++) {
			if(courseArray[i].name == courseName && courseArray[i].number == courseNum && courseArray[i].room == roomName) {
				courseExists = true;
				alert("Course is with same room is already in catalog");
			}
			else if(courseArray[i].name == courseName && courseArray[i].number == courseNum && courseArray[i].room != roomName) {
				courseExists = true;
				courseArray[i].room.push(roomName);
				var key = courseArray[i].key;
				var courseObject = {
						"key": key,
						"name": courseName,
						"number": courseNum,
						"room": courseArray[i].room
				}
				addRoomToDOM(key, courseArray[i].room[courseArray[i].room.length - 1]);
			}
		}
		if(!courseExists) {
			var key = "day_" + currentDate.getTime();
			var courseObject = {
					"key": key,
					"name": courseName,
					"number": courseNum,
					"room": [roomName]
			}
			courseArray.push(courseObject);
			sendJSON(courseArray); // replaced localstorage with sending to json
		}
	}
	else {
		alert("Please enter full information");
	}
	sendJSON(courseArray); // replaced localstorage with sending to json
	refreshTable(document.getElementById("cross"));
}

function addRoomToDOM(key, room) {
	var course = document.getElementById(key);
	var rooms = course.cells[2];
	rooms.innerHTML += "<br>" + room;
}

function addCourseToDOM(key, courseObject) {
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
    button.className = "removeButton";
    button.addEventListener("click", function() {deleteRow(courseObject)});
    cell1.innerHTML = courseObject.name;
    cell2.innerHTML = courseObject.number;
    for(n = 0; n < courseObject.room.length; n++) {
    	cell3.innerHTML += "<br>" + courseObject.room[n]; 
	}
    cell4.appendChild(button);
    
    var courseDropDown = document.getElementById("courseDropDown");
    var exists = false;
    for(j = 0; j < courseDropDown.children.length && !exists; j++) {
    	if(courseDropDown.children[j].innerHTML == courseObject.name) {
    		exists = true;
    	}
    }
    if(!exists) {
	    var courseOption = document.createElement("Option");
	    courseOption.innerHTML = courseObject.name;
	    courseDropDown.appendChild(courseOption);
    }
}

function refreshTable(table) {
    sendJSON(sortCourseArray()); // Replaced setting in localstorage to send json

	tableChildren = table.children;
	table.innerHTML = initTableHTML;
	init();
}

function updateCourseDropDown() {
	var courseArray = getCourseArray();
	var courseDropDown = document.getElementById("courseDropDown");
	courseDropDown.innerHTML = "";
	for(i = 0; i < courseArray.length; i++) {
		var courseOption = document.createElement("Option");
	    courseOption.innerHTML = courseArray[i].name;
	    courseDropDown.appendChild(courseOption);
	}
}

function updateNumberDropDown() {
	var courseArray = getCourseArray();
	courseOption = document.getElementById("courseDropDown").value;
	var numbersDropDown = document.getElementById("numbers");
	numbersDropDown.innerHTML = "";
	for(i = 0; i < courseArray.length; i++) {
		if(courseArray[i].name == courseOption) {
			var numberOption = document.createElement("option");
			numberOption.setAttribute("value", courseArray[i].number);
			numberOption.innerHTML = courseArray[i].number;
			numbersDropDown.appendChild(numberOption);
		}
	}
}

function updateRoomDropDown() {
	var courseArray = getCourseArray();
	numberOption = document.getElementById("numbers").value;
	var roomsDropDown = document.getElementById("rooms");
	roomsDropDown.innerHTML = "";
	for(i = 0; i < courseArray.length; i++) {
		if(courseArray[i].number == numberOption) {
			var room = courseArray[i].room;
			for(j = 0; j < room.length; j++) {
				var roomOption = document.createElement("option");
				roomOption.innerHTML = room[j];
				roomsDropDown.appendChild(roomOption);
			}
			break;
		}
	}
}

function getCourseArray() {
	var courseArray;
	var url = "http://localhost:3337/coursesArray.json";
	var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                courseArray = JSON.parse(request.responseText);
            }
        };
    request.open("GET", url, false);
    request.send();
	return courseArray;          
}

function getPreviousCrsArray() {
    var previousCrsArray;
    var url = "http://localhost:3337/previousCourses.json";  /* Changed getting array from localstorage to XML request  */
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

function sortCourseArray() {
	var courseArray = getCourseArray();
    courseArray.sort(function(a,b) {
    	var textA = a.name.toUpperCase();
    	var textB = b.name.toUpperCase();
    	return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
    });
    sendJSON(courseArray); // Changed from localstorage to send JSON
   
    return getCourseArray();
}
  
function init() {
	initTableHTML = document.getElementById("cross").innerHTML;
    var courseArray = sortCourseArray();
	for(i = 0; i < courseArray.length; i++) {
		var key = courseArray[i].key;
		var value = courseArray[i]; // Not sure what to change here 
		addCourseToDOM(key, value);
	}
	updateNumberDropDown();
	updateRoomDropDown();
}

function deleteRow(object){
	alert("You are about to remove a course ");
	var courseArray = getCourseArray();
	var previousCrsArray = getPreviousCrsArray();
	var currentDate = new Date();
	var key = "previous_day" + currentDate.getTime();
	var objectRemoved = {
			"key": key,
			"name": object.name,
			"number": object.number,
			"room": object.room,
			"time": currentDate.toString()
	};
	objectRemoved.key = key;
	previousCrsArray.push(objectRemoved);
	sendJSONPrevious(previousCrsArray);
	
	courseArray.splice(objectIndexOf(courseArray, object), 1);
	sendJSON(courseArray); // Changed from localstorage to sendJSON
	var row = document.getElementById(object.key);
	row.parentNode.removeChild(row);
	updateCourseDropDown();
	updateNumberDropDown();
	updateRoomDropDown();
}
 
function objectIndexOf(myArray, object) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i].key === object.key) return i;
    }
    return -1;
}

function sendToStudent() {
	var registerArray = getCourseArray2();
	var course = {
		    name: document.getElementById("courseDropDown").value,
		    number: document.getElementById("numbers").value,
		    room: document.getElementById("rooms").value
		    };
	
    registerArray.push(course);
    sendJSON(registerArray); // Changed from localstorage to send JSON 
	
}

function sendJSON(jsonarray) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://localhost:3337/coursesArray.json");
	xmlhttp.setRequestHeader("cache-control", "no-cache");
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify(jsonarray));
}

function sendJSONPrevious(jsonarray) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://localhost:3337/previousCourses.json");
	xmlhttp.setRequestHeader("cache-control", "no-cache");
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify(jsonarray));
}


  
  

