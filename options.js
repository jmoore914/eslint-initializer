const baseOptions = {
	root: true,
	env: {
		node: true,
		es6: true
	},
	extends: ['eslint:recommended'],
	plugins: [],
	rules: {
		indent: ['error', 'tab'],
		quotes: ['error', 'single', {avoidEscape: true}],
		semi: ['error', 'always'],
		'no-unused-vars': 0,
		'no-console': 0,
		// 'no-extra-parens': [2, 'all', [{ nestedBinaryExpressions: false }, { returnAssign: false }]],
		'array-callback-return': 2,
		eqeqeq: 2,
		'no-use-before-define': [2, {functions: false}],
		'comma-style': ['error', 'last'],
		'comma-spacing': 2,
		'function-paren-newline': ['error', 'never'],
		'one-var': [2, 'never'],
		'semi-style': [2, 'last'],
		'no-const-assign': 'error',
		'array-bracket-spacing': ['error', 'never'],
		'object-curly-spacing': ['error', 'never'],
	}
};

const vueExtends =  ['plugin:vue/strongly-recommended'];
const vuePlugins = ['vue'];
const vueRules = {'vue/require-default-prop':0,
	'vue/html-indent':0};


const typescriptExtends = ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'];
const typescriptPlugins = ['@typescript-eslint'];
const typescriptRules = {'@typescript-eslint/no-var-requires': 0,
	'@typescript-eslint/indent': ['error', 'tab'],
	'@typescript-eslint/no-use-before-define': [2, {functions: false}],
	'@typescript-eslint/explicit-function-return-type': ['error', {allowExpressions: true}],
	'@typescript-eslint/no-non-null-assertion': 0};

function getParser(typescript, vue){
	let parserReturn = {};
	if (vue){
		parserReturn.parser = 'vue-eslint-parser';
		if(typescript){
			parserReturn.parserOptions =  {
				parser: '@typescript-eslint/parser'
			};
		}
	}
	else if (typescript) {
		parserReturn.parser = '@typescript-eslint/parser';
		parserReturn.parserOptions = {parser: 'babel-eslint'
		};
	}
	else{
		parserReturn.parserOptions = {ecmaVersion: 2018
		};
	}
	return parserReturn;

}

module.exports = {
	baseOptions: baseOptions,
	vueExtends: vueExtends,
	vuePlugins: vuePlugins,
	vueRules:vueRules,
	typescriptExtends: typescriptExtends,
	typescriptPlugins:typescriptPlugins,
	typescriptRules: typescriptRules,
	getParser: getParser
};