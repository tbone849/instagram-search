angular.module('instagramSearchApp', ['ngMessages', 'ngAnimate'])
	.controller('searchFormController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
		$scope.tagInput = '';
		$scope.tagCopy = '';
		$scope.results = [];
		$scope.foundError = false;
		$scope.foundResults = false;
		var timeout = $timeout;

		function showError(){
			$scope.foundError = true;
			timeout(function(){
				$scope.foundError = false;
			}, 5000);
		};

		$scope.submit = function(){
			$scope.foundResults = false;
			$scope.tagCopy = angular.copy($scope.tagInput);
			var tag = $scope.tagInput.split(' ').join('');
			console.log($scope.tag);
			var params = {
				callback: 'JSON_CALLBACK',
				client_id: '80acbb5ef24f4d95a5b50c1c2b987377',
				access_token: '2281757929.80acbb5.4986eadf824a4cb1b79774bc475740ec',
				scope: 'public_content'
			}
			$http({
				url: 'https://api.instagram.com/v1/tags/' + tag + '/media/recent',
				method: 'JSONP',
				params: params
			})
			.then(function(results){
				$scope.results = results.data.data;
				$scope.foundResults = true;
				$scope.tagInput = '';
				console.log(results);
			},
			function(){
				showError();
			});
		};
		
	}]);