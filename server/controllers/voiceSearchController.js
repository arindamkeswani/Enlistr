let recordBtn = document.querySelector("#mic");
let textArea = document.querySelector("#search-box");
let submitBtn = document.querySelector("#search-submit");
var speechRecognition = window.webkitSpeechRecognition;
var recognition = new speechRecognition();

var spokenContent="";

recognition.continuous = true;
var isRecordingOn = false;

recognition.onerror = function(){
    alert("Failed to perform voice-to-text at thia time. Please try again in some time.")
}

recognition.onresult = function(event){
    var current= event.resultIndex;

    var transcript =  event.results[current][0].transcript;

    spokenContent += transcript;
    textArea.value = spokenContent;
}
recordBtn.addEventListener("click", function(){
    if(isRecordingOn){ //turn recording off
        isRecordingOn = false;
        recordBtn.style.backgroundColor = "white";
        recordBtn.style.color = "black";
        // recordBtn.style.border = "none";
        recognition.stop();
        console.log("Content:", spokenContent);

    }else{ //turn recording on
        // console.log("Recording on");
        isRecordingOn = true;
        recordBtn.style.backgroundColor = "lightgrey";
        recordBtn.style.color = "red";
        // recordBtn.style.border = "2px solid grey";
        
        if(spokenContent.length){ //check if text is already present
            spokenContent="";
        }

        recognition.start();
        textArea.value = "";
    }
})

