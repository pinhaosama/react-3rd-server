const { json } = require('body-parser');
const fs = require('fs');  // import fs library

async function updateScore(fileaddress, studentName, point) {
    return new Promise((resolve, reject) => {
        console.log("start function");
        var filePath = fileaddress;
        let fileData = fs.readFileSync(filePath);
        let resultData = JSON.parse(fileData);
        console.log(resultData);
        console.log('try');
        let score_result;
        try {
            score_result = JSON.parse(fileData);
            console.log(score_result);
            checkObj(studentName,point,score_result);
        } catch(error) {
            score_result = {};
            reject(error);
        }

    })
}


function checkObj(studentName,point,jsonFile) {
    const NEWSTUDENT = true;
    jsonFile.filter(function (obj) {
        console.log(obj['name']);
        if (studentName == obj['name']) {
            obj['points'] += point;
            NEWSTUDENT = false;
        }
    })
    if (NEWSTUDENT) {
        jsonFile[jsonFile.length] = {'name': studentName, 'points' : point};
        fs.writeFileSync(filePath,JSON.stringify(jsonFile ,null, 2));
    }
}

module.exports = {
    updateScore
};