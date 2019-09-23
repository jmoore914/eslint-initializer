#!/usr/bin/env node

const prompts = require('./prompts');
const configCreator = require('./configCreator');
const fs = require('fs');


function checkTemplateExists(){
	try {
		return require('./eslintTemplate.js')
	}
	catch(e){
		const templateCreator = require('./templateCreator.js')
		templateCreator.createTemplate()
	}
}

async function eslintInit(){
	const callingDir = process.cwd();
	const promptResponses = await prompts.awaitPrompts();
	const eslintConfig = configCreator.createConfigFromPromptResponses(promptResponses);
	fs.writeFileSync(callingDir + '/.eslintrc.js', 'module.exports =' + JSON.stringify(eslintConfig, null, 2));
	console.log('ESLint config created.');
	console.log(JSON.stringify(promptResponses, ' ', 2));
}

eslintInit();
