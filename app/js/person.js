angular.module("personApp", [])
	.controller("PersonController", function ($scope, $http)
		{
			$scope.persons = {};
			$scope.person = {};
			
			$scope.states = 
			{
				showPersonForm : false
			};
			
			$http.get("http://localhost:8080/person").success(function (response) {
				$scope.persons = response;
			});
			
			$scope.add = function (person)
			{
				$scope.persons.push(person);
				$scope.person = {};
				
				$scope.states.showPersonForm = false;
			};
		});