var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	    console.log("Hello World from controller");
	  
       $scope.headerUrl = "../images/header.png";
    
        $scope.headerStyle = {
            "background-color": "coral",
            "width": "100%",
            "height": "auto"
        }
	   var refresh = function(){
		   $http.get("/contactlist")
		   		.success(function(response){
		   			console.log("Received the requested data");
		   			$scope.contactList = response;
		   			$scope.contact = '';
		   		});
	   }
	   refresh();
	   
	   $scope.addContact = function(){
		   console.log($scope.contact);
		   $http.post('/contactlist',$scope.contact)
		   		.success(function(response){
		   			console.log(response);
		   			refresh();
		   		});
	   }
	   
	   $scope.removeContact = function(id){
		   $http.delete("/contactlist/"+id).success(function(response){
			   refresh();
		   });
	   };
	   
	   $scope.editContact = function(id){
		   $http.get("/contactlist/"+id).success(function(response){
			   $scope.contact = response;
			   console.log($scope.contact);
		   });
	   };
	   
	   $scope.updateContact = function(){
		   console.log($scope.contact._id);
		   $http.put('/contactlist/'+$scope.contact._id, $scope.contact).success(function(response){
			   refresh();
		   });
	   };
	   $scope.resetContact = function(){
		 $scope.contact = "";  
	   };
}]);