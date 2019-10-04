const inquirer = require('inquirer');
const {homedir} = require('os');
const {runAllPrompts} = require('./prompts');
const {fetchTemplatePath} = require('./templateFetcher');
const {copyFileSync, writeFileSync} = require('fs');
const {extname} = require('path');

inquirer.registerPrompt('file-selector', require('inquirer-file-selector-prompt'));

async function createTemplate(){
	const path = await getPath();
	copyFileSync(path, '../eslintTemplate' + extname(path));
}

async function mergeTemplate(){
	const newTemplatePath = await getPath();
	const newTemplate = require(newTemplatePath);
	
	const oldTemplatePath =fetchTemplatePath(); 
	const oldTemplate = require(oldTemplatePath);

	const mergedExt = (extname(newTemplatePath)==='.js' || extname(oldTemplatePath)==='.js') ? '.js' : '.json';
	const mergedTemplate = mergeOldAndNewTemplates(oldTemplate, newTemplate);
	let strTemplate = JSON.stringify(mergedTemplate, '', 2);
	if(mergedExt==='.js'){
		strTemplate = 'module.exports=' + strTemplate;
	}


	writeFileSync('../eslintTemplate' + mergedExt, strTemplate );
}

function mergeOldAndNewTemplates(oldTemplate, newTemplate){
	oldTemplate.extends = unique(oldTemplate.extends.concat(newTemplate.extends));
	oldTemplate.plugins = unique(oldTemplate.plugins.concat(newTemplate.plugins));
	oldTemplate.rules = {...oldTemplate.rules, ...newTemplate.rules};
	return oldTemplate;
}

function unique(arr){
	return [...new Set(arr)];
}


async function getPath(){
	const pathOrBrowse = await runAllPrompts([pathOrBrowsePrompt]);
	if(pathOrBrowse.pathOrBrowse === 'browse'){
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
	message: 'Enter the path of a valid ".eslintrc.js/.eslintrc.json" or enter "browse" to locate a template:',
	validate: function(value) {
		return value.toLowerCase() === 'browse' || value.endsWith('.eslintrc.js') || value.endsWith('.eslintrc.json');
	}
};

const browsePrompt = {
	type: 'file-selector',
	name: 'path',
	message: 'Select ".eslintrc.js" or ".eslintrc.json"',
	path: homedir(),
	extensions: ['.eslintrc.js', '.eslintrc.json']
};


module.exports = {
	createTemplate,
	mergeTemplate
};