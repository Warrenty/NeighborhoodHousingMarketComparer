// var mocha = require('mocha');
// var assert = require('chai').assert;
// var request = require('supertest');
//var angular = require('angular-mocks');

// var app = require('../server.js');

// describe('GET /', function() {
//   it('should return html', function(done) {
//     request(app)
//       .get('/')
//       .expect(200,done)
//     });
// });

describe("searchController", function () {

    var $scope, ctrl, services;

    beforeEach(function () {
        module('zillowApp');
        inject(function ($rootScope, $controller) {

            $scope = $rootScope.$new();

            ctrl = $controller('searchController', {
                $scope: $scope
            });
        });

    });

    describe("changeCurrentNeighborhood", function(){
      it('should be defined as a function', function() {
        console.log($scope)
        expect(angular.isFunction($scope.vm.changeCurrentNeighborhood)).toBe(true);
      });
    });

  });
