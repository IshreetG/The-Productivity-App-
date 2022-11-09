var pomodoro = { //here we are defining the base values 
    started : false,
    minutes : 0,
    seconds : 0,
    interval : null,
    minutesDom : null,
    secondsDom : null,
   
   
    init : function(){
      var self = this;
      this.minutesDom = document.querySelector('#minutes');
      this.secondsDom = document.querySelector('#seconds');
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
      document.querySelector('#work').onclick = function(){ //when work button is clicked we start the 25 min work period 
        self.startWork.apply(self);
      };
      document.querySelector('#Break').onclick = function(){ //when break button is clicked we start the 5 min work period 
        self.startShortBreak.apply(self);
      };
    },
    resetVariables : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
    },
    startWork: function() {
      this.resetVariables(25, 0, true); //here we are reseting the varaibles to a certain pattern (min, sec, started)
    },
    startShortBreak : function(){
        this.resetVariables(5, 0, true); //here we are making the short break to 5 min
      },
    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
    updateDom : function(){
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes); //updating the min for HTML
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds); //updating the sec for HTML
    },
    
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom(); //update the elements 
    },
    timerComplete : function(){
      this.started = false; //we are done so we reset 
    }
};
window.onload = function(){ //when window is loaded
  pomodoro.init();
};



//TO DO LIST CODE: 

var list = document.querySelector('ul'); //our list here is "ul" which is in our HTML file s
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt); //adds node to the end of the list 
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none"; //here when we click the close button ("x") we are not displaying that div 
  }
}

// Create a new list item when clicking on the "Add" button
function newElement() {

    var li = document.createElement("li"); //creating variables 
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') { //if nothing is entered 
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li); //add list to the node 
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none"; //here when we click the close button ("x") we are not displaying that div 
      }
    }
} 