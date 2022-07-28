let capture;
let poseNet;
let pose;

function setup() {
  createCanvas(640,480);
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
  poseNet = ml5.poseNet(capture,modelLoaded);
  poseNet.on('pose', gotPoses);

}
function gotPoses(poses){
    console.log(poses);
    if (poses.length >0){
        pose= poses[0].pose;
        skeleton= poses[0].skeleton;
    }    
}
function modelLoaded(){
    console.log("Posenet Loaded!");
}
function draw() {
  //background(255);
  image(capture, 0, 0,640,480);
  
  if (pose){
    for(let i=0; i<skeleton.length;i++){
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(4);
      stroke(0);
      line(a.position.x,a.position.y,b.position.x,b.position.y);

    }
    fill(255,0,0);
    stroke(255);
    strokeWeight(2);
    d = dist(pose.leftEye.x, pose.leftEye.y, pose.rightEye.x, pose.rightEye.y);
    if(d>40){
      ellipse(pose.nose.x,pose.nose.y,32);
    }
    ellipse(pose.nose.x,pose.nose.y,d);
    ellipse(pose.rightWrist.x,pose.rightWrist.y,32);
    ellipse(pose.leftWrist.x,pose.leftWrist.y,32);
    }
}
