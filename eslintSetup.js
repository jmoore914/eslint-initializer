const options = require('./options.js');
const readline = require('readline');
const fs = require('fs');

async function eslintSetup(){
	const callingDir = process.cwd();
	const typescript = await checkPlugin('Typescript');
	const vue = await checkPlugin('Vue');
	const eslintFile = configureEslintOptions(typescript, vue);
	fs.writeFileSync('.eslintrc.js', 'module.exports =' + JSON.stringify(eslintFile, null, 2));
	console.log('ESLint config created.');
	console.log('Options: {');
	console.log('   TS: ' + typescript);
	console.log('   Vue: ' + vue);
	console.log('}');
}

async function checkPlugin(plugin){
	const readLine = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});


	let enabled = undefined;

	return new Promise((resolve, reject) => {
		readLine.question(`Are you using ${plugin} for this project (y/n)?`, async (answer) => {
			if (answer === 'y'){
				console.log(plugin + ' added.');
				enabled = true;
			}
			else if (answer === 'n'){
				enabled = false;
			}
			else{
				console.log('Invalid input.');
				enabled = await checkPlugin(plugin);
			}

			readLine.close();
			resolve(enabled);
        

		});
	});
}

function configureEslintOptions(typescript, vue){
	let eslintOptions = options.baseOptions;
	if(typescript){
		eslintOptions.extends.push(...options.typescriptExtends);
		eslintOptions.plugins.push(...options.typescriptPlugins);
		eslintOptions.rules = {
			...eslintOptions.rules,
			...options.typescriptRules
		};
	}
	if(vue){
		eslintOptions.extends.push(...options.vueExtends);
		eslintOptions.plugins.push(...options.vuePlugins);
		eslintOptions.rules = {
			...eslintOptions.rules,
			...options.vueRules
		};
	}
	eslintOptions = {
		...eslintOptions,
		...options.getParser(typescript, vue)
        
	};
	return eslintOptions;
}

eslintSetup();