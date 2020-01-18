const {existsSync} = require('fs');


function fetchTemplate(){
	const path = fetchTemplatePath();
	return require(path);
}

function fetchTemplatePath(){
	return existsSync(__dirname + '/eslintTemplate.js') ? __dirname + '/eslintTemplate.js' : __dirname + '/eslintTemplate.json';

}


module.exports = {
	fetchTemplate: fetchTemplate,
	fetchTemplatePath: fetchTemplatePath
};