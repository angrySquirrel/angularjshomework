(function(){
	'use strict';
angular.module('LunchCheck',[])
.controller('LunchCheckController',function($scope){
	$scope.inputDishes = "";
	$scope.num = 0;
	$scope.displayNumber = function(){
		$scope.num = calculateNumber($scope.inputDishes);
		$scope.displayText = "you have chosen "+ $scope.num + " different kinds of foods";
	};
	$scope.checkToMuch = function(){
		 if($scope.num>=5)
		 	$scope.outputText = "eat enough!";
		 else
		 	$scope.outputText = "not enough! go above 5";
	};

	//return the number of the dishes separated by comma
	function calculateNumber(str){
		if(str && typeof(str) === "string"){
			var res = str.split(",");
			return res.length;
		};
		return 0;
	};

});


})();
