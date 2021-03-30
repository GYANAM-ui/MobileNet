Webcam.set({
    width: 310,
    height: 300,
    image_format: 'png',
    quality: 90,

    constraints :{
        facingMode : "environment"
    }
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    });
}

console.log('ml5 version: ',ml5.version);
classifier = ml5.imageClassifier('MobileNet',modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded');
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
    if (img=null){
        console.log("No image uploaded");
      }
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("object_name").innerHTML = results[0].label;
    };
}

window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('#captured_image');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
  
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
    });
  });