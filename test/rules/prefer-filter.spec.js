'use strict'

const rule = require('../../src/rules/prefer-filter')
const {RuleTester} = require('eslint')

const ruleTester = new RuleTester()
const errorsObject = require('../util/errorsObject')

const useFilter = 'Use Array.filter instead of filtering inside the forEach'

ruleTester.run('prefer-filter', rule, {
  valid: [
    '[].forEach(function(){if(b){}else{}})',
    '[].forEach(function(){if(b){}else if(c){}})',
    '[].forEach(function(){x=2;if(b){}})',
    '[].forEach(function(){if(b){};x=2})',
    '[].map(function(){if(b){}})'
  ],
  invalid: [
    {code: '[].forEach(function(){if(b){}})', errors: errorsObject(useFilter)},
    {code: '[].forEach(function(){if(b){;;;;;}})', errors: errorsObject(useFilter)},
    {code: '[].forEach(function(){if(!b){}})', errors: errorsObject(useFilter)},
    {code: '[].forEach(function(){if(b) a = 4;})', errors: errorsObject(useFilter)}
  ]
})
