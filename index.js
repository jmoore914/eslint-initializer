#!/usr/bin/env node

const prompts = require('./prompts');
const fs = require('fs');



async function eslintInit(){
	console.log('b');
	if(!checkTemplateExists()){
		console.log('a');
		const templateCreator = require('./templateCreator.js');
		await templateCreator.createTemplate();
	}
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
		require('./eslintTemplate.js');
		return true;
	}
	catch(e){
		try {
			require('./eslintTemplate.json');
			return true;
		}
		catch(e){
			return false;
			
		}
	}
}

eslintInit();
