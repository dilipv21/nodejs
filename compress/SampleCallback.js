


//after 30 sec
//Return String
function doHomework(subject, callback) {
  console.log(`Starting my ${subject} homework.`);
  callback();
}

function alertFinished(){
  console.log('Finished my homework');
}


var ys = doHomework('math', alertFinished);


console.log("13131");



