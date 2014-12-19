(function(){
'use strict';

angular
	.module('zillowApp')
	.controller('compareController', compareController)
	function compareController(services) {

		var vm = this;
		vm.srv = services;

		vm.setZip = function(zip,num){
			vm.srv['zip'+num] = zip;
		}
	}

})()