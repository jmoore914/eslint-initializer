const {existsSync} = require('fs');


function fetchTemplate(){
	const path = fetchTemplatePath();
	return require(path);
}

function fetchTemplatePath(){
	return existsSync('../eslintTemplate.js') ? '../eslintTemplate.js' : '../eslintTemplate.json';

}


module.exports = {
	fetchTemplate: fetchTemplate,
	fetchTemplatePath: fetchTemplatePath
};