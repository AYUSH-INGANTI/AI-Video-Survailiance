video = "";

object = [];

stats = false;

function setup() {
    video = createVideo('video.mp4');
    video.hide();
    canvas = createCanvas(480, 380);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (stats != null) {
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("num_of_obj").innerHTML = "Number of abjects are : " + object.length;

            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
}

function modelLoaded() {
    console.log("model loaded")
    stats = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        object = results;
    }
}