var courseCheck;
var table = document.getElementById("enrolled");
var tableHTML = document.getElementById("enrolled").innerHTML;
var headerHTML = document.getElementById("titleRow").innerHTML;

 window.onload = init2("Student1");
 var server = "http://localhost:3337/registerArray.json";

 function sendregisterArray(jsonarray) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", server);
	xmlhttp.setRequestHeader("cache-control", "no-cache");
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify(jsonarray));
}
                  
function addCourse() {
	var student = document.getElementById("mySelect").value;
    var registerArray = getCourseArray2(student);
    var course = {
    name: document.getElementById("courseDropDown").value,
    number: document.getElementById("numbers").value,
    room: document.getElementById("rooms").value
    };
    
    alert(document.getElementById("courseDropDown").value);

    courseCheck = checkCourse(course);
   

    if (!courseCheck) {
        alert("That course does not exist!");
    }
    else if(checkDuplicate(course)) {
        alert("You've already registered for that course");
    }

    else {

    registerArray.push(course);
    sendregisterArray(registerArray); // Changed from local storage 

    var row = enrolled.insertRow(1);
    
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = course.name;
    cell2.innerHTML = course.number;
    cell3.innerHTML = course.room;
}
}
function changeTable(){
	reloadTable();
	init2(document.getElementById("mySelect").value);
}
	  
function reloadTable() {
	tableHTML = headerHTML;
	table.innerHTML = tableHTML;
	
} 

function createSchedule(course) {
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");

    cell1.innerHTML = course.name;
    cell2.innerHTML = course.number;
    cell3.innerHTML = course.room;

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    table.appendChild(row);
}

 function getcourseArray2(student) { 
	var student;
    var url = server;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            studentArray = JSON.parse(request.responseText);
        }
    };
    request.open("GET", url, false);
    request.send();
    for(t = 0; t < studentArray.length; t++) {
    	var courses = studentArray[t].courses; 
    }
    return courses;
    }

                   
function init2(student) {
    var registerArray = getCourseArray2(student);
     if (registerArray != null) {                    
        for (i = 0; i < registerArray.length; i++) {
            var course = registerArray[i];
            createSchedule(course);
    }
}
}

function checkCourse(course) {
    var courseArray = getcourseArray2();
    
        for (k = 0; k < courseArray.length; k++) {
    
            if (courseArray[k].name == course.name && courseArray[k].number == course.number && courseArray[k].room == course.room) {
                
                courseCheck = true;
            }
    
            else {
                courseCheck = false;
            }
        }

    
        return courseCheck;
    }

function checkDuplicate(course) {
    var registerArray = getCourseArray2(document.getElementById("mySelect").value);

    for(i = 0; i < registerArray.length; i++) {
        if(registerArray[i].name == course.name && registerArray[i].number == course.number && registerArray[i].room == course.room) {
            return true;
            break;
        }

    }
    return false;
}





