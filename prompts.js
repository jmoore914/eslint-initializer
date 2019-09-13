const inquirer = require('inquirer');

async function awaitPrompts(){
	const answers = await runAllPrompts();
	return answers;

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
	choices: ['None','Vue', 'React'],
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
	


function runAllPrompts()	{
	return new Promise((resolve) => {
		inquirer
			.prompt([typescriptPrompt, frameworkPrompt, environmentPrompt],)
			.then((answers)=>resolve(answers));
	});
}



module.exports={
	awaitPrompts:awaitPrompts
};