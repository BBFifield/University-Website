window.onload = init;
var stJohnsfirst = true;
var marinefirst = true;
var grenfellfirst = true;
var eventsArray = [];

function getJSON(filename) {
	 var gottenArray;
	 var url = "http://sc-7.cs.mun.ca/" + filename;
	 var request = new XMLHttpRequest();
	 request.onreadystatechange = function() {
		 if (this.readyState == 4 && this.status == 200) {
			 gottenArray = request.responseText;
		 }
	 };
	 request.open("GET", url, false);
	 request.send();
	 return gottenArray;
	}

function sendJSON(jsonarray, filename) {
	var xmlhttp = new XMLHttpRequest();
	var url = "http://sc-7.cs.mun.ca/" + filename;
	xmlhttp.open("POST", url);
	xmlhttp.setRequestHeader("cache-control", "no-cache");
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify(jsonarray));
}

function createEEvent() {
	var eventsArray = JSON.parse(getJSON("eventsArray.json"));
	var currentDate = new Date();
	var dayName = document.getElementById("day").value;
	var eventName = document.getElementById("event").value.trim();
	var dayExists = false;
	if(eventName != "") {
		for(i = 0; i < eventsArray.length && !dayExists; i++) {
			if(eventsArray[i].day == dayName) {
					dayExists = true;
					eventsArray[i].event.push(eventName);
					var key = eventsArray[i].day;
					var eventObject = {
							"day": dayName,
							"event": eventsArray[i].event
					}
					sendJSON(eventObject, "eventsArray.json");
					addEventToDOM(key, eventsArray[i].event[eventsArray[i].event.length - 1]);
					break;
			}
		}
		if(!dayExists) {
			var key = dayName;
			var eventObject = {
					"day": dayName,
					"event": [eventName]
			}
			eventsArray.push(eventObject);
			var filename = "eventsArray.json";
			sendJSON(eventsArray, filename);
			addDayAndEventToDOM(key, eventObject);
		}
	}
	else {
		alert("Please enter an event name");
	}
	sendJSON(eventsArray, "eventsArray.json");
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

function init() {
	var eventsArray = JSON.parse(getJSON("eventsArray.json"));
	for(i = 0; i < eventsArray.length; i++) {
		var key = eventsArray[i].day;
		var value = eventsArray[i];
		addDayAndEventToDOM(key, value);
	}
	
	var stjohnslink;
	var stjohnsarray = JSON.parse(getJSON("stjohns.json"))
	for(i = 0; i < stjohnsarray.length; i++) {
		stjohnslink = stjohnsarray[i].name;
	}
	
	if(stjohnslink != "") {
		document.getElementById("stJohnsLink").innerHTML = stjohnslink;
	}
	
	var grenfelllink;
	var grenfellarray = JSON.parse(getJSON("grenfell.json"))
	for(i = 0; i < grenfellarray.length; i++) {
		grenfelllink = grenfellarray[i].name;
	}
	if(grenfelllink != "") {
		document.getElementById("grenfellLink").innerHTML = grenfelllink;
	}
	var marinelink;
	var marinearray = JSON.parse(getJSON("marine.json"))
	for(i = 0; i < marinearray.length; i++) {
		marinelink = marinearray[i].name;
	}
	if(marinelink != "") {
		document.getElementById("marineLink").innerHTML = marinelink;
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
		element.style.backgroundColor = "transparent";
		var stjohnsarray = [];
		var stjohnsobject = {
				"name":element.innerHTML
		};
		stjohnsarray.push(stjohnsobject);
		sendJSON(stjohnsarray,"stjohns.json");
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
		element.style.backgroundColor = "transparent";
		var stjohnsarray = [];
		var stjohnsobject = {
				"name":element.innerHTML
		};
		stjohnsarray.push(stjohnsobject);
		sendJSON(stjohnsarray,"marine.json");
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
		element.style.backgroundColor = "transparent";
			var stjohnsarray = [];
		var stjohnsobject = {
				"name":element.innerHTML
		};
		stjohnsarray.push(stjohnsobject);
		sendJSON(stjohnsarray,"grenfell.json");
	}
}

