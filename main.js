img = "";
status = "";
objects = [];

function preload(){
img = loadImage("cat-dog.jpg");
alarm = loadSound("alarm.mp3");
}
function setup(){
    canvas = createCanvas(500, 500);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    video = createCapture(VIDEO);
    video.size(500, 500);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Object Detection Engaged";

}

function draw(){

    image(video, 0 ,0, 500, 500);
 
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);


        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++){
           


            if(objects.length > 0){
                document.getElementById("status").innerHTML = "Status : objects detected";
            }
            else{
alarm.play();
            }
    
        fill(r,g,b);
        percent = floor(objects[0].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y );
   noFill();
   stroke(r,g,b);
   rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
}
   
}


}

if(objects.lenght > 0){

}



function modelLoaded(){
    console.log("model loaded");

    status = true;
    objectDetector.detect(video, gotResult);

}

function gotResult(error , results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function stop(){
alarm.stop();
}