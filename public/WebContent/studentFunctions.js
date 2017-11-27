var courseCheck;


 window.onload = init2;

          
                  
function addCourse() {

    var registerArray = getregisterArray();
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
        alert("YOu've already registered for that course");
    }

    else {

    registerArray.push(course);
    localStorage.setItem("register", JSON.stringify(registerArray));

    
    
    var row = enrolled.insertRow(1);
    
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = course.name;
    cell2.innerHTML = course.number;
    cell3.innerHTML = course.room;
}
}

function createSchedule(course) {
    var table = document.getElementById("enrolled");
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

 function getcourseArray2() {
     return JSON.parse(localStorage.getItem("course"));
 }

 function getregisterArray() {
	var registerArray = localStorage.getItem("register");
	if(!registerArray) {
		registerArray = [];
		localStorage.setItem("register", JSON.stringify(registerArray));
	}
	else {
		registerArray = JSON.parse(registerArray);
	}
	return registerArray; 
}
                   
function init2() {
    var registerArray = getregisterArray();
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
    var registerArray = getregisterArray();

    for(i = 0; i < registerArray.length; i++) {
        if(registerArray[i].name == course.name && registerArray[i].number == course.number && registerArray[i].room == course.room) {
            return true;
            break;
        }

    }
    return false;
}





