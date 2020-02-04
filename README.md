### File-Upload-and-Download-with-Node.js-and-GridFS-MongoDB-MEAN-front-to-end-
###async.js
const async = require("async")
function shortTimeFunction(callback){
    setTimeout(function(){
        callback(null,'resultOfShortTime');
    },200);
}

function mediumTimeFunction(callback){
    setTimeout(function(){
        callback(null,'resultOfMediumTime');
    },500);
}

function longTimeFunction(callback){
    setTimeout(function(){
        callback(null,'resultOfLongTime');
    },1000);
}
//async.series ->execute tasks in the series
async.parallel([shortTimeFunction,mediumTimeFunction,longTimeFunction],function(err,results){
    if(err){
        console.log(err)
    }
    console.log(results)
})
console.log("mohit sood")

//async.each to handle array of data efficiently 
function createUser(userName, callback)
{
//create user in db
callback(null)//or error based on creation
}
var arrayOfData = ['Ritu', 'Sid', 'Tom'];
async.each(arrayOfData, function(eachUserName, callback) {
console.log('Creating user '+eachUserName);
callback
createUser(eachUserName, callback);
}, function(err) {
if( err ) {
console.log('unable to create user');
} else {
console.log('All user created successfully');
}
});
### file.js
var express = require("express");
var app=express();
var fs=require("fs");
var util = require("util")

fs.readFile("./read.txt", 'utf8',function(err,data){
    content=util.format(data)
    console.log(content)
})
//pipe is a method used to take a readable stream  and connect it to the writeable stream.
app.get("/",function(req,res){
    var stream=fs.createReadStream("./read.txt")
    stream.pipe(res)
})

//piping stream
// Readable streams can be "piped," or connected, to writable streams. This makes data flow from the source stream
// to the destination stream without much effort.
app.get("/pip",async function(req,res){
    var readable = await fs.createReadStream("./read.txt");
    var writable =  await fs.createWriteStream("writable.txt");
//     When writable streams are also readable streams, i.e. when they're duplex streams, you can continue piping it to
// other writable streams
    await readable.pipe(writable)
    var readFromWriteable=fs.createReadStream("./writable.txt");
    readFromWriteable.pipe(res)
})
//creating your own readable and writable stream
//method for reading a file
app.get("/stream",function(req,res){
var read = fs.readFile("./read.txt",function(err,data){
    if(err){
        console.log(err)
    }
    else{
        console.log(data.toString())
        res.send(data)
    }
})
})
app.get("/method",function(req,res){
var fileStream = fs.createReadStream("./read.txt");
var fileContent = '';
fileStream.on('data', data => {
fileContent += data.toString();
res.send(fileContent)
})
fileStream.on('end', () => {
console.log(fileContent);
})
fileStream.on('error', err => {
console.log(err)
})
})

app.listen(4040,function(req,res){
    console.log("You are listening to port 4040")
})
### call.js
var async = require("async")
//executing tasks using async.waterfall([],function(err,result){})
function getName(callback){
    var name="Mohit";
    callback(null,name)
}
function getProfession(valueFromgetName,callback){
    if(valueFromgetName=="Mohit"){
        profession="Developer"
    }
    else{
        profession="Doctor"
    }
    callback(null,profession)
}
function getCompany(valueFromGetProfession,callback){
    if(valueFromGetProfession=="Developer"){
        company="Infosys Limited"
    }
    else{
        company="Paytm"
    }
    callback(null,company)
}
async.waterfall([getName,getProfession,getCompany],function(err,result){
    if(err){
        throw err
    }
    else{
        console.log("We get company as"+" "+result)
    }
})


### error.js
//throwing the error 
//creating error objects and throwing and handle errors in Node.js
//here we are modifying message property of the error object
function manageError(){
    try{
        var a=1;
        b++;
        console.log(b)

    }
    catch(error){
        error.message="variable is undefined, so the undefined can't be incremented"
        console.log(error)
        

    }
}
manageError()

// Creating Error Object 
// using new Error(message)

function divideNumber(a,b){
    try{
    var c=a/b
    console.log(d)
    }
    catch(error){
        var err = new Error("Reference Error")
        console.log(err.message)
        console.log(err.stack)
    }

}

divideNumber(3,0)

## references cp
https://socket.io/docs/emit-cheatsheet
https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/

>>>>>>xterm<<<<<
https://github.com/xtermjs/xterm.js/
https://xtermjs.org/
https://github.com/xtermjs/xterm.js/
>>>tty<<<<<<
https://github.com/chjj/tty.js/

>>>>>>>web  terminal<<<<<<
https://medium.com/datadriveninvestor/deploy-web-app-using-node-js-and-custom-docker-in-google-cloud-643dd6a85b53

>>>>>>>>tty<<<<<<<<

https://github.com/chjj/tty.js/
https://nodejs.org/api/tty.html


>>>>ssh client
https://hub.packtpub.com/making-simple-web-based-ssh-client-using-nodejs-and-socketio/

>>>node terminal

https://blog.risingstack.com/terminal-guide-for-nodejs/
https://medium.com/datadriveninvestor/deploy-web-app-using-node-js-and-custom-docker-in-google-cloud-643dd6a85b53

>>>>xterm<<<<<
https://xtermjs.org/
https://github.com/xtermjs/xterm.js/
https://www.npmjs.com/package/xterm
