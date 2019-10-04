#!/usr/bin/env node

const fs = require('fs');
const {fetchTemplate} = require('./lib/templateFetcher');
const templateCreator = require('./lib/templateCreator.js');



async function eslintInitRouter(args){
	if(args.length > 3){
		console.log('Too many arguments passed. Please try again with at most one argument.');
	}
	else{
		if(process.argv.includes('-m') || process.argv.includes('--merge')){
			await eslintInitMerge();
		}
		else if(process.argv.includes('-r') || process.argv.includes('--replace')){
			await eslintInitReplace();
		}
		else if(process.argv.includes('-v') || process.argv.includes('--versuib')){
			eslintInitVersion();
		}
		else{
			await eslintInitMain();
		}
	}
}

async function eslintInitMain(){
	await checkAndCreateTemplate();
	await createConfig();
}

async function eslintInitReplace(){
	await templateCreator.createTemplate();
}

async function eslintInitMerge(){
	await checkAndCreateTemplate();
	await templateCreator.mergeTemplate();
	console.log('Templates merged.');
}

function eslintInitVersion(){
	const pkg = require('./package.json');
	console.log(pkg.version);
}

async function checkAndCreateTemplate(){
	const templateExists = checkTemplateExists();
	if(!templateExists){
		console.log('No config template found.');
		await templateCreator.createTemplate();
	}
}


function checkTemplateExists(){
	try {
		fetchTemplate();
		return true;
	}
	catch(e){
		return false;	
	}
}


async function createConfig(){

	const prompts = require('./lib/prompts');
	const configCreator = require('./lib/configCreator');

	const callingDir = process.cwd();
	const promptResponses = await prompts.awaitPrompts();
	const eslintConfig = configCreator.createConfigFromPromptResponses(promptResponses);
	fs.writeFileSync(callingDir + '/.eslintrc.js', 'module.exports =' + JSON.stringify(eslintConfig, null, 2));
	console.log('ESLint config created.');
	console.log(JSON.stringify(promptResponses, ' ', 2));
}



eslintInitRouter(process.argv);
