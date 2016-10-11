[![NPM](https://nodei.co/npm/ts-starter.png?downloads=true&stars=true)](https://nodei.co/npm/ts-starter/)
# ts-starter
A command line tool for starting a [TypeScript](http://www.typescriptlang.org/) working folder
## Installation
`npm install -g ts-starter`
## Usage
Type `tss new-folder-name` into the console 
and a new folder with the name `new-folder-name` will be the new working folder for [TypeScript](http://www.typescriptlang.org/)
## What have been done
1. create a new working folder with the name of `new-folder-name`
2. run the command of `git init` that makes the foler a git repository and create a `.gitignore` file which ignores the `node_modules` and the `dist` folder
3. run the command of `npm init -y` to creating the `packages.json` file
4. run the command of `tsc --init` with creating the `tsconfig.json` file
5. edit the `tsconfig.json` file that change the `target` to `es2015` and `outDir` to `dist` of the `compilerOptions` and add the `exclude` property with `['node_modules']`
6. create a subfolder named `src` under the new working folder
7. create another subfolder named `dist` under the new working folder
8. run the command of `typings init` to create `typings.json` file
9. run the command of `typing install dt~node -SG` to install the typings for node
10. run the command of `tslint init` which creates a `tslint.json` file
11. get the `tslint.json` file from another Github [repository](https://github.com/Emeryao/tslint-config)