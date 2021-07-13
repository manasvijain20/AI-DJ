
song = "";
leftwrist_y_score = 0;
rightwrist_y_score = 0;
function setup(){
    canvas = createCanvas(600,450);
    canvas.position(330,240);

    video = createCapture(VIDEO);
    video.hide();
    //video.size(500,500);
    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose',gotPoses);

}
function draw(){
    image(video,0,0,600,450);
    fill("#ff0000");
    if (leftwrist_y_score > 0.2){
   circle(leftWrist_x,leftWrist_y,20);
   modified_leftWrist_y = Number(leftWrist_y);
   new_leftWrist_y = floor(modified_leftWrist_y *2);
   leftWrist_y_divide = new_leftWrist_y/1000;
   console.log("this is the left wrist value after dividing" + leftWrist_y_divide);
  document.getElementById("volume").innerHTML = "volume = " + leftWrist_y_divide;
  song.setVolume(leftWrist_y_divide)
    }

    if(rightwrist_y_score > 0.2 ){
      circle(rightWrist_x,rightWrist_y,20);

      if(rightWrist_y>0 && rightWrist_y<=100){
        document.getElementById("speed").innerHTML = "Speed is 0.5x";
        song.rate(0.5);
      }
      else if(rightWrist_y>100 && rightWrist_y<=200){
        document.getElementById("speed").innerHTML = "Speed is 1.0x";
        song.rate(1);
      }
      else if(rightWrist_y>200 && rightWrist_y<=300){
        document.getElementById("speed").innerHTML = "Speed is 1.5x";
        song.rate(1.5);
      }
      else if(rightWrist_y>300 && rightWrist_y<=400){
        document.getElementById("speed").innerHTML = "Speed is 2.0x";
        song.rate(2);
      }
      else if(rightWrist_y>400 && rightWrist_y<=500){
        document.getElementById("speed").innerHTML = "Speed is 2.5x";
        song.rate(2.5);
      }
    }

}
function modelloaded(){
    console.log("model is loaded");
}
function gotPoses(results){
    if(results.length > 0 ){
        console.log(results);
        leftwrist_y_score = results[0].pose.keypoints[9].score;
        rightwrist_y_score = results[0].pose.keypoints[10].score;
        console.log("this is the score: "+leftwrist_y_score);
        leftWrist_y = results[0].pose.leftWrist.y ;
        rightWrist_y = results[0].pose.rightWrist.y;
        leftWrist_x = results[0].pose.leftWrist.x ;
        rightWrist_x = results[0].pose.rightWrist.x;
        console.log("wrist position" + leftWrist_y,rightWrist_y)
    }
}
function preload(){
    song = loadSound("music.mp3");
}
function play(){
    song.play();
}

