const {existsSync} = require('fs');

function fetchTemplatePath(){
	return existsSync('./eslintTemplate.js') ? './eslintTemplate.js' : './eslintTemplate.json';

}

function fetchTemplate(){
	const path = fetchTemplatePath()
	return require(path);
}

module.exports = {
	fetchTemplate: fetchTemplate,
	fetchTemplatePath: fetchTemplatePath
};