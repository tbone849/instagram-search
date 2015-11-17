angular.module('instagramSearchApp', ['ngMessages', 'ngAnimate'])
	.controller('searchFormController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
		$scope.tag = '';
		$scope.results = [];
		$scope.submitError = false;
		var timeout = $timeout;

		function showError(){
			$scope.submitError = true;
			timeout(function(){
				$scope.submitError = false;
			}, 3000);
		};

		$scope.submit = function(){
			var params = {
				callback: 'JSON_CALLBACK',
				client_id: '80acbb5ef24f4d95a5b50c1c2b987377',
			}
			$http({
				url: 'https://api.instagram.com/v1/tags/' + $scope.tag + '/media/recent',
				method: 'JSONP',
				params: params
			})
			.then(function(results){
				$scope.results = results.data.data;
				console.log(results.data.data);
			},
			function(){
				showError();
			});
		};
		
	}]);