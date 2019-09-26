const inquirer = require('inquirer');
const {homedir} = require('os');
const {runAllPrompts} = require('./prompts');
const {copyFileSync} = require('fs');
const {extname} = require('path');

inquirer.registerPrompt('file-selector', require('inquirer-file-selector-prompt'));

async function createTemplate(){
	const path = await getPath();
	copyFileSync(path, './eslintTemplate' + extname(path));
}



async function getPath(){
	const pathOrBrowse = await runAllPrompts([pathOrBrowsePrompt]);
	if(pathOrBrowse.pathOrBrowse === 'browse'){
		console.log('a')
		const path = await runAllPrompts([browsePrompt]);
		return path.path;
	}
	else{
		return pathOrBrowse.pathOrBrowse;
	}
}

const pathOrBrowsePrompt = {
	type: 'input',
	name: 'pathOrBrowse',
	message: 'No config template found. Enter the path of a valid ".eslintrc.js/.eslintrc.json" or enter "browse" to locate a template:',
	validate: function(value) {
		return value.toLowerCase() === 'browse' || value.endsWith('.eslintrc.js') || value.endsWith('.eslintrc.json');
	}
};

const browsePrompt = {
	type: 'file-selector',
	name: 'path',
	message: 'Select ".eslintrc.js" or ".eslintrc.json"',
	path: homedir(),
	extensions: ['.eslintrc.js','.eslintrc.json']
};


module.exports = {
	createTemplate: createTemplate
};