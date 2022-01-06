var stroke_width = document.getElementById("stroke_width");

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup(){
    canvas = createCanvas(300, 300);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function draw(){
    stroke(0);
    strokeWeight(stroke_width);

    if (mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, result){
    if(error){
        console.log(error);
    }
    console.log(result);
    document.getElementById('label').innerHTML = 'Label : ' + result[0].label; 
    document.getElementById('confidence').innerHTML = 'Confidence : ' + Math.round(result[0].confidence * 100) + '%';

    utterThis = new SpeechSynthesisUtterance(result[0].label);
    synth.speak(utterThis);
}


function clearCanvas(){
    background("white");
}