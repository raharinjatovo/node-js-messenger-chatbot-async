// utils.js
const request = require('request');
const fs = require('fs');

async function deleteFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.unlink(fileName, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function downloadFile(url, fileName) {
    return new Promise((resolve, reject) => {
        request.head(url, (err, res, body) => {
            request(url)
                .pipe(fs.createWriteStream(fileName))
                .on('close', () => {
                    resolve();
                });
        });
    });
}

async function renameFile(oldname, newname) {
    return new Promise((resolve, reject) => {
        console.log('deleteFile')
        fs.rename(oldname, newname, (err) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}



module.exports = {
    deleteFile,downloadFile,renameFile
};
