inputs = document.querySelectorAll('.insertField')
table = document.getElementById('dataTable')

data = [{
    "name":"Nandhu Santhosh",
    "rollno":62,
    "maths": 99,
    "statistics": 90,
    "c":85,
    "dbms":80,
    "english":80,
    "sase":70,
    "attendance":80
},{
    "name":"Renjumon Raju",
    "rollno":62,
    "maths": 90,
    "statistics": 90,
    "c":85,
    "dbms":80,
    "english":80,
    "sase":70,
    "attendance":81
}]
console.log(inputs)
function printer() {
    reqStatus = -1
    pot = []
    for(i = 0 ; i < inputs.length ; i++){
        element = inputs[i].children[1].value
        if(element != ''){
            pot.push(element)
        }else{
            reqStatus = 0;
            pot=[]
            break;
        }
    }
    if (reqStatus == -1){
        userdetails = dictCreator(pot);
        data.push(userdetails)
        currLogger(userdetails,data.length)
        console.log(userdetails)
    }
    else{
        alert('fill all fields')
    }
}
function dictCreator(pot){
    userdetails = {
        "name":pot[0],
        "rollno":pot[1],
        "maths":pot[2],
        "statistics":pot[3],
        "c":pot[4],
        "dbms":pot[5],
        "english":pot[6],
        "sase":pot[7],
        "attendance":pot[8]
    }
    return userdetails
}
function logger(){
    higestatt = 0
    higestTotalMark = 0
    table.innerHTML = ''
    for(i = 0 ; i< data.length; i++){
        curr = data[i]
        number = i+1
        currLogger(curr,number)
    }
}
function currLogger(curr,number) {
    tr = document.createElement('tr')
        th = document.createElement('th')
        th.innerHTML = number;
        tr.append(th)
        ts = totalScore(curr)
        appender(tr, curr["name"])
        appender(tr, curr["rollno"])
        hs = higestScore(curr)
        appender(tr, hs)
        appender(tr, ts)
        appender(tr, 600)
        appender(tr, curr["attendance"])
        table.append(tr)

        if(curr["attendance"] > higestatt){
            higestatt = curr['attendance']
            highAttendanceUpdater(curr['name'], higestatt)
        }
        if(ts > higestTotalMark){
            higestTotalMark = ts;
            highTotalScoreUpdater(curr['name'], higestTotalMark)
        }
}
function appender(tr, value) {
    td = document.createElement('td')
    td.innerHTML = value
    tr.append(td)
}
function higestScore(curr){
    arr = markArrayMaker(curr)
    var largest = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (largest < arr[i] ) {
            largest = arr[i];
        }
    }
    return largest
}
function totalScore(curr){
    arr = markArrayMaker(curr)
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[[i]]
    }
    return sum
}
function markArrayMaker(curr){
    return [parseInt(curr['maths']),parseInt(curr['statistics']),parseInt(curr['c']),parseInt(curr['dbms']),parseInt(curr['english']),parseInt(curr['sase'])];
}
function insertPanelDisplay() {
    console.log('whatever')
    insertionPanel = document.getElementById('insertionPanel')
    insertionPanel.style.transform = 'translateX(0%)'
}
function highTotalScoreUpdater(name, mark) {
    namefield = document.getElementById('higestTotalScoreName')
    markfield = document.getElementById('higestTotalScoreMark')
    namefield.innerHTML = name
    markfield.innerHTML = mark
}
function highAttendanceUpdater(name, value){
    namefield = document.getElementById('attHighName')
    valuefield = document.getElementById('attHighValue')
    namefield.innerHTML = name
    valuefield.innerHTML = value
}