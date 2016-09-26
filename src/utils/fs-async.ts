import * as fs from 'fs';
import * as https from 'https';

export function mkdirAsync(path: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        fs.mkdir(path, (err) => {
            if (err) {
                console.log(err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

export function readFileAsync(fileName: string): Promise<boolean | string> {
    return new Promise<boolean | string>((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                resolve(false);
            } else {
                resolve(data);
            }
        });
    });
}

export function writeFileAsync(fileName: string, data: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        fs.writeFile(fileName, data, { encoding: 'utf8' }, (err) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

export function downloadFileAsync(fileName: string, url: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        let fileStream = fs.createWriteStream(fileName, { encoding: 'utf8' });
        https.get(url, (res) => {
            res.pipe(fileStream);
        }).on('err', (err) => {
            console.log(err);
            resolve(false);
        }).on('close', () => {
            fileStream.close();
            resolve(true);
        });
    });
}