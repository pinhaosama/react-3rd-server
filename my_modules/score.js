const { json } = require('body-parser');
const fs = require('fs');  // import fs library

async function updateScore(fileaddress, studentName, point) {
    return new Promise((resolve, reject) => {
        
        var filePath = fileaddress;
        let fileData = fs.readFileSync(filePath);
        let score_result;
        try {
            score_result = JSON.parse(fileData);
            checkObj(studentName,point,score_result);
            fs.writeFileSync(filePath, JSON.stringify(score_result, null, 2));
        } catch(error) {
            score_result = {};
            reject(error);
        }
        resolve()
    })
}


function checkObj(studentName,point,jsonFile) {
    jsonFile.filter(function (obj) {
        console.log('compare');
        console.log('studentname : ',studentName,' obj : ', obj['name']);
        console.log(studentName == obj['name']);
        if (studentName == obj['name']) {
            console.log(studentName,'is here');
            obj['points'] = `${parseInt(obj['points']) + parseInt(point)}`;
        }
    })
}

module.exports = {
    updateScore
};