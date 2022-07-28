let predictions=[];
let video;
let handpose;

function setup() {
  createCanvas(640,480);
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
  handpose = ml5.handpose(capture,modelLoaded);
  handpose.on('pose',results => { predictions =
                                  results;});
}

function modelLoaded(){
    console.log("Posenet Loaded!");
}

function draw() {
  //background(255);
  image(capture, 0, 0,640,480);
  drawKeyPoints();
}

function drawKeyPoints(){
    for(let i=0; i<predictions.length;i++){
        const prediction = predictions[i];
        for(let j=0; j< predictions.landmarks.length; j++){
            const keypoint = prediction.landmarks[j];
            fill(0,255,0);
            noStroke();
            ellipse(keypoint[0],keypoint[1],10,10);
        }
    }
}