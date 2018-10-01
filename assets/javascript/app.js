$(document).ready(function() {
    console.log("JS and jQuery is linked and working"); // Confirm JS


  // Initialize Firebase
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCs8FvNcPbJNBLA1Jz2gk70G0NcVTfk6W0",
    authDomain: "traindatabase-17254.firebaseapp.com",
    databaseURL: "https://traindatabase-17254.firebaseio.com",
    projectId: "traindatabase-17254",
    storageBucket: "traindatabase-17254.appspot.com",
    messagingSenderId: "351808359035"
  };
  firebase.initializeApp(config);

    /***  GLOBAL VARIABLES  ***/
    var database = firebase.database();
    // var trainDatabase = new Firebase("https://vivid-inferno-4129.firebaseio.com/");
    var caputredValues;

    /***  FUNCTIONS  ***/
    

    captureData = function() {
        //Capture imputs from 4 imput divs
        var a = $("#trainNameInput").val().trim();
        var b = $("#destinationInput").val().trim();
        var c = $("#frequencyInput").val().trim();
        var d = $("#startTimeInput").val().trim();

        //local vars to push as object to Firebase
        caputredValues = {
            name: a,
            destination: b,
            frequency: c,
            start: d
        }

        //push data to Firebase
        // trainDatabase.push(caputredValues);
        database.ref().push(caputredValues)

        alert("Train added sucessfully");
        clearDataForms();
    };

    clearDataForms = function() {
        //set values to blank
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#frequencyInput").val("");
        $("#startTimeInput").val("");
    };



    /***  EVENTS  ***/
    $("#addTrainBtn").on("click", function(event) {
        captureData();
        event.preventDefault();
    });

    //firebase.js function of child added, run function with returned parameter
    database.ref().on("child_added", function(snapshot) {
        //variables for name, destination, frequency, and start time
        var na = snapshot.val().name;
        var dest = snapshot.val().destination;
        var freq = snapshot.val().frequency;
        var st = snapshot.val().start;

        var trainFrequency = freq;
        var firstTrain = st;

        //subtract one year to ensure to time conflicts over calculated microseconds.
        var fixTime = moment(firstTrain, "hh:mm").subtract(1, "years");
        //call moments library
        var currentMinute = moment();
        //format currentMinute, post to html
        $("#currentTimeSpan").html(" Current Time : " + currentMinute.format("hh:mm"));

        var timeDifference = moment().diff(moment(fixTime), "minutes");

        var timeRemaining = timeDifference % trainFrequency;

        var minutesTillTrain = trainFrequency - timeRemaining;

        var nextTrain = moment().add(minutesTillTrain, "minutes")

        var arrivalTime = moment(nextTrain).format("hh:mm");

        //create new row for each train
        $("#trainScheduleBody").append("<tr><td>" + na + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + st + "</td><td>" + arrivalTime + "</td><td>" + minutesTillTrain + " Minutes" + "</td></tr>");

    });

}); 