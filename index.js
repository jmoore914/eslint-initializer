#!/usr/bin/env node

const fs = require('fs');
const {fetchTemplate} = require('./templateFetcher');



async function eslintInit(replaceOrMerge){
	let templateCreator = undefined;
	const templateExists = checkTemplateExists();
	if(!templateExists || replaceOrMerge){
		templateCreator = require('./templateCreator.js');
	}
	if(!templateExists){
		console.log('No config template found.');
		await templateCreator.createTemplate();
	}
	if(replaceOrMerge){
		if(replaceOrMerge === 'replace' && templateExists){
			await templateCreator.createTemplate();
		}
		else if (replaceOrMerge==='merge'){
			await templateCreator.mergeTemplate();
			console.log('Templates merged.');
		}
	}
	else{
		await createConfig();
	}
}

async function createConfig(){

	const prompts = require('./prompts');
	const configCreator = require('./configCreator');

	const callingDir = process.cwd();
	const promptResponses = await prompts.awaitPrompts();
	const eslintConfig = configCreator.createConfigFromPromptResponses(promptResponses);
	fs.writeFileSync(callingDir + '/.eslintrc.js', 'module.exports =' + JSON.stringify(eslintConfig, null, 2));
	console.log('ESLint config created.');
	console.log(JSON.stringify(promptResponses, ' ', 2));
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


eslintInit(process.argv[2]);
