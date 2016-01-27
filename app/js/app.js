angular.module("myapp", [])
	.controller("PersonController", ["$scope", "$http", function ($scope, $http)
		{
			var url = "http://localhost:8080/person";
			$scope.persons = [];
			$scope.person = {};
			$scope.newPerson = {};
			$scope.selected = {};
			
			$scope.states = 
			{	
				showPersonForm : false
			};
			
			$scope.showPersonForm = function (show)
			{
				$scope.states.showPersonForm = show;
			}
			
			$scope.displayAllPersons = function ()
			{
				$http({url : url, method : "GET"})
					.success(function (response)
					{
						$scope.persons = response;
					});
			};
			
			$scope.displayAllPersons();
			
			$scope.getTemplate = function (person)
			{
				if (person.id === $scope.selected.id)
				{
					return "edit";
				}
				else
				{
					return "display";
				}
			};
			
			$scope.editPerson = function (editingPerson)
			{
				$scope.selected = angular.copy(editingPerson);
			};
			
			$scope.saveEdit = function (selected) 
			{
				$scope.selected.startDate = new Date(selected.startDate);
				
				$http({url : url + "/" + selected.id, method : "PUT", data : selected})
					.success(function (response)
						{
							console.log(selected.id + " " + selected.name + " " + selected.startDate + " updated");
							
							$scope.persons = response;
						}) 
					.error(function (response)
						{
							console.log(response);
						});
				
				$scope.reset();
			};
			
			$scope.reset = function ()
			{
				$scope.selected = {};
			};
			
			$scope.deletePerson = function (person, $index)
			{
				$scope.person.startDate = new Date(person.startDate);
				
				$http({url : url + "/" + person.id, method : "DELETE"})
					.success(function (response)
						{
							console.log(person.id + " " + person.name + " " + person.startDate + " deleted");
						}) 
					.error(function (response)
						{
							console.log(response);
						});
				
				$scope.persons.splice($index, 1);
			}
			
			$scope.addPerson = function (newPerson) 
			{
				$scope.newPerson.startDate = new Date(newPerson.startDate);
				
				$http({url : url, method : "POST", data : newPerson})
					.success(function (response) 
					{
						$scope.persons = response;
					})
					.error(function (response)
					{
						console.log(response);
					});
				
				$scope.newPerson = {};
			};
		}
	]);
