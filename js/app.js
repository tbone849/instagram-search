angular.module('instagramSearchApp', ['ngMessages', 'ngAnimate'])
	.controller('searchFormController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
		$scope.tag = '';
		$scope.results = [];
		$scope.submitError = false;

		function showError(){
			$scope.submitError = true;
			$timout(function(){
				console.log($timeout);
				$scope.submitError = false;
			}, 3000);
		};

		$scope.submit = function(){
			$http({
				url: 'https://api.instagram.com/v1/tags/' + $scope.tag + '/media/recent',
				callback: 'JSON_CALLBACK',
				client_id: '80acbb5ef24f4d95a5b50c1c2b987377',
				method: 'JSONP'
			})
			.then(function(results){
				$scope.results = results.data;
			},
			function(){
				showError();
			});
		};
		
	}]);