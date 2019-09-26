const inquirer = require('inquirer');


async function awaitPrompts(){
	const answers = await runAllPrompts([typescriptPrompt, frameworkPrompt, environmentPrompt]);
	return answers;

}


function runAllPrompts(prompts)	{
	return new Promise((resolve) => {
		inquirer
			.prompt(prompts)
			.then((answers)=>resolve(answers));
	});
}

const typescriptPrompt = {
	type: 'confirm',
	name: 'typescript',
	message: 'Does your project use typescript?',
	default: false};

const frameworkPrompt = {
	type: 'list',
	name: 'framework',
	message: 'Which framework does your project use?',
	choices: ['None', 'Vue', 'React'],
	filter: function(choice) {
		return choice.toLowerCase().replace('None', '');
	}
};

const environmentPrompt = {
		
	type: 'checkbox',
	message: 'What environments will your project be running in?',
	name: 'env',
	choices: [
		{
			name: 'browser'
		},
		{
			name: 'node'
		},
		{
			name: 'shared-node-browser'
		},
		{
			name: 'commonjs'
		},
		{
			name: 'es6'
		}
	]
};


module.exports={
	awaitPrompts:awaitPrompts,
	runAllPrompts: runAllPrompts
};