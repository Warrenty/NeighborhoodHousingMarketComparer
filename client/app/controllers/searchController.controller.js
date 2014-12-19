(function(){
'use strict';

angular
	.module('zillowApp')
	.controller('searchController', searchController)

	function searchController(services) {

		var vm = this;
		vm.srv = services;
		vm.changeCurrentNeighborhood = function(zip){
			vm.srv.currentLocation = vm.srv.neighborhoods[zip].location;
			vm.srv.currentNeighborhood = vm.srv.neighborhoods[zip].data;
		}
		vm.addZip = function(zipCode) {
			services.getDemographics(zipCode);
			vm.newZip = '';
		}
	}

})()