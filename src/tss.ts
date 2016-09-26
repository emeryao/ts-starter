import { execSync } from 'child_process';

import { mkdirAsync, readFileAsync, writeFileAsync, downloadFileAsync, execAsync } from './utils';

main();

async function main() {

    let param = process.argv[2];

    if (!param || param.length < 1) {
        console.log('Please provide a folder name :-)');
        return;
    }

    console.log('create new folder...');
    if ((await mkdirAsync(param)) == false) {
        return;
    }

    console.log('npm init...');
    if ((await execAsync('npm init -y', { encoding: 'utf8', cwd: param })) == false) {
        return;
    }

    console.log('tsc init...');
    if ((await execAsync('tsc --init', { encoding: 'utf8', cwd: param })) == false) {
        return;
    }

    console.log('create new subfolder : src ...');
    if ((await mkdirAsync(`${param}/src`)) == false) {
        return;
    }

    console.log('create new subfolder : dist ...');
    if ((await mkdirAsync(`${param}/dist`)) == false) {
        return;
    }

    console.log('config tsconfig.json ...');
    let result = await readFileAsync(`${param}/tsconfig.json`);
    if (result == false) {
        return;
    }

    let tsconfig = JSON.parse(result.toString());

    tsconfig.compilerOptions.target = 'es2015';
    tsconfig.compilerOptions.outDir = 'dist';

    if ((await writeFileAsync(`${param}/tsconfig.json`, JSON.stringify(tsconfig))) == false) {
        console.log('config tsconfig.json fail');
        return;
    }

    console.log('typings init...');
    if ((await execAsync('typings init', { encoding: 'utf8', cwd: param })) == false) {
        console.log('typings init fail');
        return;
    }

    console.log('tslint init...');
    if ((await execAsync('tslint --init', { encoding: 'utf8', cwd: param })) == false) {
        console.log('tslint init fail');
        return;
    }

    console.log('get tslint.json from github...');
    if ((await downloadFileAsync(`${param}/tslint.json`, 'https://raw.githubusercontent.com/Emeryao/tslint-config/master/tslint.json')) == false) {
        console.log('get tslint.json from github fail');
        return;
    }

    console.log('DONE');
}