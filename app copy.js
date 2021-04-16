var first_name = 'Edureka';

console.log(first_name);

var age1 = 30;
var age2 = 30;
var age3 = '30';

var result = age1 == age2;
var result1 = age2 === age3;

console.log('Result : ' + result + 
            ' Result1 : ' + result1);

function sayHello(name) {
    return 'Hello' + name + '||||';
}

console.log(sayHello('bye'));

var student = {
    name: "Ravi",
    email: "Ravi@gmail.com"
}

console.log(student.name);

var fs = require('fs');

fs.writeFile('./hello.txt', 'How are you?', function(err){
    if(!err)
    fs.readFile('./hello.txt', function(err, data){
        if(!err)
            console.log(data.toString());
    })
});


