#!/usr/bin/env node

const prompts = require('./prompts');
const configCreator = require('./configCreator');
const fs = require('fs');

async function eslintInit(){
	const callingDir = process.cwd();
	const promptResponses = await prompts.awaitPrompts();
	const eslintConfig = configCreator.createConfigFromPromptResponses(promptResponses);
	fs.writeFileSync('.eslintrc.js', 'module.exports =' + JSON.stringify(eslintConfig, null, 2));
	console.log('ESLint config created.');
	console.log(JSON.stringify(promptResponses, ' ', 2));
}


eslintInit();