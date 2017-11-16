window.onload = init;
var stJohnsfirst = true;
var marinefirst = true;
var grenfellfirst = true;

function createEEvent() {
	var eventsArray = getEventsArray();
	var currentDate = new Date();
	var dayName = document.getElementById("day").value;
	var eventName = document.getElementById("event").value.trim();
	var dayExists = false;
	if(eventName != "") {
		for(i = 0; i < eventsArray.length && !dayExists; i++) {
			if(eventsArray[i].day == dayName) {
					dayExists = true;
					eventsArray[i].event.push(eventName);
					var key = eventsArray[i].key;
					var eventObject = {
							"key": key,
							"day": dayName,
							"event": eventsArray[i].event
					}
					localStorage.setItem(key, JSON.stringify(eventObject));
					addEventToDOM(key, eventsArray[i].event[eventsArray[i].event.length - 1]);
					break;
			}
		}
		if(!dayExists) {
			var key = "day_" + currentDate.getTime();
			var eventObject = {
					"key": key,
					"day": dayName,
					"event": [eventName]
			}
			eventsArray.push(eventObject);
			localStorage.setItem(key, JSON.stringify(eventObject));
			addDayAndEventToDOM(key, eventObject);
		}
	}
	else {
		alert("Please enter an event name");
	}
	localStorage.setItem("eventsArray", JSON.stringify(eventsArray));
}
	
function addDayAndEventToDOM(key, eventObject) {
	var events = document.getElementById("eventList");
	var dayLi = document.createElement("li");
	
	dayLi.setAttribute("id", key);
	dayLi.innerHTML = eventObject.day;
	events.appendChild(dayLi);
	
	var ul = document.createElement("ul");
	dayLi.appendChild(ul);
	for(j = 0; j < eventObject.event.length; j++) {
		var eventLi = document.createElement("li"); 
		eventLi.innerHTML = eventObject.event[j];	
		ul.appendChild(eventLi);
	}
}

function addEventToDOM(key, event) {
	var day = document.getElementById(key);
	var eventLi = document.createElement("li");
	eventLi.innerHTML = event;
	day.children[0].appendChild(eventLi);
}

function getEventsArray() {
	var eventsArray = localStorage.getItem("eventsArray");
	if(!eventsArray) {
		eventsArray = [];
		localStorage.setItem("eventsArray", JSON.stringify(eventsArray))
	}
	else {
		eventsArray = JSON.parse(eventsArray);
	}
	return eventsArray;
}

function init() {
	var eventsArray = getEventsArray();
	for(i = 0; i < eventsArray.length; i++) {
		var key = eventsArray[i].key;
		var value = JSON.parse(localStorage[key]);
		addDayAndEventToDOM(key, value);
	}
	if(JSON.parse(localStorage.getItem("stjohns")).trim() != "") {
		document.getElementById("stJohnsLink").innerHTML = JSON.parse(localStorage.getItem("stjohns"));
	}
	if(JSON.parse(localStorage.getItem("grenfell")).trim() != "") {
		document.getElementById("grenfellLink").innerHTML = JSON.parse(localStorage.getItem("grenfell"));
	}
	if(JSON.parse(localStorage.getItem("marine")).trim() != "") {
		document.getElementById("marineLink").innerHTML = JSON.parse(localStorage.getItem("marine"));
	}
}

function editStJohns(element) {
	if(stJohnsfirst) {
		stJohnsfirst = false;
		element.contentEditable = true;
		document.getElementById("editStJohns").value = "Done";
		element.style.backgroundColor = "white";
	}
	else {
		stJohnsfirst = true;
		element.contentEditable = false;
		document.getElementById("editStJohns").value = "Edit";
		element.style.backgroundColor = "transparent"
		localStorage.setItem("stjohns", JSON.stringify(element.innerHTML));
	}
}

function editMarine(element) {
	if(marinefirst) {
		marinefirst = false;
		element.contentEditable = true;
		document.getElementById("editMarine").value = "Done";
		element.style.backgroundColor = "white";
	}
	else {
		marinefirst = true;
		element.contentEditable = false;
		document.getElementById("editMarine").value = "Edit";
		element.style.backgroundColor = "transparent"
		localStorage.setItem("marine", JSON.stringify(element.innerHTML));
	}
}

function editGrenfell(element) {
	if(grenfellfirst) {
		grenfellfirst = false;
		element.contentEditable = true;
		document.getElementById("editGrenfell").value = "Done";
		element.style.backgroundColor = "white";
	}
	else {
		grenfellfirst = true;
		element.contentEditable = false;
		document.getElementById("editGrenfell").value = "Edit";
		element.style.backgroundColor = "transparent"
		localStorage.setItem("grenfell", JSON.stringify(element.innerHTML));
	}
}

