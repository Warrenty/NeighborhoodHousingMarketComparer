;(function() {
  "use strict";

  angular
    .module('zillowApp')
    .service('services', services);

    function services($http){
      var srv = this 
      srv.zips = {};
      srv.neighborhoods = {};
      srv.currentLocation;
      srv.currentNeighborhood = {};
      srv.zip1;
      srv.zip2;
      srv.zip3;
      srv.zip4;



      srv.getDemographics = function(zipCode) {
        return $http({
          method:'GET',
          // transformResponse: appendTransform($http.defaults.transformResponse, function(value) {
          //   return xmlToJSON.parseString(value);
          // }),
          url: 'http://www.zillow.com/webservice/GetDemographics.htm?zws-id=X1-ZWz1b0u419464r_1oefy&zip='+zipCode,
          headers: {
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers":  'Origin, X-Requested-With, Content-Type, Accept'
          }

        })
        .success(function(res){
          var jsonRes = xmlToJSON.parseString(res);
          if (!jsonRes.demographics[0].response){
            alert('Invalid Zipcode');
          }
          var response = jsonRes.demographics[0].response[0];
          var affordability = response.pages[0].page[0].tables[0].table[0].data[0].attribute;
          // var homesAndRealEstate = pages[1].tables[0].table
          // var people = pages[2].tables[0].table[0].data[0].attribute;
          var affordabilityObject = {};
          // var peopleObject = {};
          affordability.forEach(function(object){
            if(object.values[0].zip) {
              var value = object.values[0].zip[0].value[0]._text;
            }
            if (typeof(value) !== 'number'){
              value = 'Not Available'
            }
            affordabilityObject[object.name[0]._text] = value;
          })
          // people.forEach(function(object,index){
          //  peopleObject[object.name[0]._text] = object.values[0].zip;
          // })
          var location = response.region[0];

          srv.currentLocation = location.city[0]._text +',  '+ location.state[0]._text +'  '+ zipCode;
          srv.currentNeighborhood = affordabilityObject;
          srv.neighborhoods[zipCode] = {'location':srv.currentLocation, 'data':affordabilityObject};
          srv.zips[zipCode] = zipCode;
          console.log(jsonRes.demographics);
          return
        })
        .catch(function(res){
          console.error(res);
        })
      }
    }

}).call(this);
