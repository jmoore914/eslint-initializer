const eslintTemplate = getTemplate();

function getTemplate(){
	try{
		return require('./eslintTemplate.js');
	}
	catch(e){
		return require('./eslintTemplate.json');
	}
}

function createConfigFromPromptResponses(promptResponses){
	const eslintTemplate = getTemplate();
	const plugins = getPluginsFromPromptResponses(promptResponses);
	const exts = filterItemsByPlugins(eslintTemplate.extends, plugins);
	const envs = getEnvFromPromptResponses(promptResponses);
	const pluginNames = eslintTemplate.plugins.filter(templatePlugin => plugins.some(promptPlugin => templatePlugin.includes(promptPlugin)));
	const rules = filterRulesByPlugins(eslintTemplate.rules, plugins);
	const parserConfig = getParserOptions(promptResponses);
	let eslintConfig = eslintTemplate;
	delete eslintConfig.parser;
	delete eslintConfig.parserOptions;
	eslintConfig.env=envs;
	eslintConfig.plugins=pluginNames;
	eslintConfig.extends = exts;
	eslintConfig.plugins=pluginNames;
	eslintConfig.rules=rules;
	eslintConfig = {...eslintConfig, ...parserConfig};
	return eslintConfig;

}

function getPluginsFromPromptResponses(promptResponses){
	let plugins = [];
	if(promptResponses.typescript){
		plugins.push('typescript');
	}
	if(promptResponses.framework !== 'None'){
		plugins.push(promptResponses.framework);
	}
	return plugins;
}

function getEnvFromPromptResponses(promptResponses){
	const envObject = {};
	promptResponses.env.forEach(env => envObject[env]=true);
	return envObject;
}

function filterItemsByPlugins(items, plugins){
	return items.filter(item => {
		return !item.toLowerCase().includes('/') || 
       plugins.some(plugin => item.includes(plugin));
	});
}

function filterRulesByPlugins(allRules, plugins){
	const ruleKeys = Object.keys(allRules);
	const filteredKeys = filterItemsByPlugins(ruleKeys, plugins);
	const filteredObj = {};
	filteredKeys.forEach(key=> filteredObj[key] = allRules[key]);
	return filteredObj;
}

function getParserOptions(promptResponses){
	return parserMap.find(parserConfig => {
		return parserConfig[0].typescript === promptResponses.typescript &&
		parserConfig[0].babel === promptResponses.babel &&
		parserConfig[0].framework === promptResponses.framework;
	});
}

const parserMap =[
	[{typescript:false, babel:false, framework:''}, {}],
	[{typescript:true, babel:false, framework:''}, {parser: '@typescript-eslint/parser'}],
	[{typescript:false, babel:true, framework:''}, {parser: 'babel-eslint'}],
	[{typescript:true, babel:true, framework:''}, {parser: '@typescript-eslint/parser',
		parserOptions: {
			parser: 'babel-eslint'
		}}],
	[{typescript:false, babel:false, framework:'vue'}, {parser: 'vue-eslint-parser',
	}],
	[{typescript:false, babel:true, framework:'vue'}, {parser: 'vue-eslint-parser',
		parserOptions: {
			parser: 'babel-eslint'
		}
	}],
	[{typescript:true, babel:false, framework:'vue'}, {parser: 'vue-eslint-parser',
		parserOptions: {
			parser: '@typescript-eslint/parser'
		}}],
	[{typescript:true, babel:true, framework:'vue'}, {parser: 'vue-eslint-parser',
		parserOptions: {
			parser: '@typescript-eslint/parser'
		}}],
	[{typescript:false, babel:false, framework:'react'}, {parserOptions: {
		ecmaFeatures:  {
			jsx:  true, 
		}
	}}],
	[{typescript:false, babel:true, framework:'react'}, {parser: 'babel-eslint',
		parserOptions: {
			ecmaFeatures:  {
				jsx:  true,  
			}
		}}],
	[{typescript:true, babel:false, framework:'react'}, {parser: '@typescript-eslint/parser',
		parserOptions: {
			ecmaFeatures:  {
				jsx:  true,
			}
		}}],
	[{typescript:true, babel:true, framework:'react'}, {parser: '@typescript-eslint/parser',
		parserOptions: {
			parser: 'babel-eslint',
			ecmaFeatures:  {
				jsx:  true,
			}
		}}]
];

module.exports={
	createConfigFromPromptResponses:createConfigFromPromptResponses
};