import { execSync } from 'child_process';

import { mkdirAsync, readFileAsync, writeFileAsync, downloadFileAsync, execAsync } from './utils';

const pkgInfo = require('../package.json');

main();

async function main() {

    let param = process.argv[2];

    if (!param || param.length < 1) {
        console.log('\nPlease provide a name for the new working folder\n');
        console.log('Usage: tss <new-folder-name>\n');
        console.log(`ts-starter@${pkgInfo.version}\n`);
        return;
    }

    if (param.indexOf('-') == 0) {
        if (param == '-v' || param == '--version') {
            console.log(`${pkgInfo.version}\n`);
        } else {
            console.log('Usage: tss <new-folder-name>\n');
            console.log(`ts-starter@${pkgInfo.version}\n`);
        }
        return;
    }

    let workingFolder = process.cwd() + '/' + param;

    console.log('create new folder...');
    if ((await mkdirAsync(param)) == false) {
        return;
    }

    if (await execAsync('git --version', { encoding: 'utf8' }, false)) {
        console.log('git init...');
        if ((await execAsync('git init', { encoding: 'utf8', cwd: param })) == false) {
            console.log('git init fail');
            return;
        }
    } else {
        console.log('no git installed, skip "git init"');
    }

    if ((await writeFileAsync(`${param}/.gitignore`, 'node_modules\r\ndist\r\ntypings/globals\r\ntypings/modules\r\n')) == false) {
        console.log('add ".gitignore" fail');
        return;
    }

    console.log('npm init...');
    if ((await execAsync('npm init -y', { encoding: 'utf8', cwd: param })) == false) {
        return;
    }

    if (await execAsync('tsc --version', { encoding: 'utf8' }, false)) {
        console.log('tsc init...');
        if ((await execAsync('tsc --init', { encoding: 'utf8', cwd: workingFolder })) == false) {
            return;
        }
    }

    console.log('config tsconfig.json ...');
    let result = await readFileAsync(`${param}/tsconfig.json`);
    if (result == false) {
        return;
    }

    let tsconfig = JSON.parse(result.toString());

    tsconfig.compilerOptions.target = 'es2015';
    tsconfig.compilerOptions.outDir = 'dist';
    tsconfig.exclude = ['node_modules'];

    if ((await writeFileAsync(`${param}/tsconfig.json`, JSON.stringify(tsconfig))) == false) {
        console.log('config tsconfig.json fail');
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

    if (await execAsync('typings -v', { encoding: 'utf8' }, false)) {
        console.log('typings init...');
        if ((await execAsync('typings init', { encoding: 'utf8', cwd: param })) == false) {
            console.log('typings init fail');
            return;
        }

        console.log('install node typings...');
        if ((await execAsync('typings install dt~node -SG', { encoding: 'utf8', cwd: param })) == false) {
            console.log('install node typings fail');
            return;
        }
    }

    if (await execAsync('tslint -v', { encoding: 'utf8' }, false)) {
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
    }

    console.log('DONE!');
    console.log('ENJOY TypeScript!');
}