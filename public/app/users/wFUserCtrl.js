angular.module('app').controller('wFUserCtrl', ['$scope', 'wFUserFactory', 'wFMailService', function($scope, wFUserFactory, wFMailService) {
	//	$scope.users = ['User 1', 'User 2', 'User 3'];
	//	var newUserNo = [];
/*
		$scope.users = {
			firstname  : 'Enter name...',
		};

	    $scope.addUserToGroup = function() {
	//  	  newUserNo = $scope.users.length + 1;
	//      $scope.users.push('User ' + newUserNo);
	      var addUser = wFUserFactory.addUserToGroup();

	    }*/
	    $scope.userStatus = [
	    	{name: 'not sent', value: 'not sent'},
	    	{name: 'accepted', value: 'accepted'},
	    	{name: 'pending', value: 'pending'},
	    	{name: 'declined', value: 'declined'}
	    ];

	    $scope.setStatus = {type: $scope.userStatus[0].value};
	    $scope.emailButtonValue = 'Invite';

		$scope.users = [
			{
				id: 1,
				priority: 0,
				email: "wade_mansell@hotmail.com",
				name: "wade",
				setStatus: $scope.userStatus[0].value,
				emailButtonValue: 'Email'
			}
		];

	    $scope.addInvite = {
			id: $scope.users.length + 1,
			priority: 0,
			email: "Enter email...",
			name: "Enter name...",
			setStatus: $scope.userStatus[0].value,
			emailButtonValue: 'Invite'
		};

	    $scope.removeUserFromGroup = function(gid, uid) {
	    	console.log($scope.users);
	    }



	    $scope.accordianMenu = {
	      isFirstOpen: true,
	      isFirstDisabled: false
	    };

	    $scope.sendInvite = function(email, name, group, project) {
			wFMailService.sendInvite(email, name, group, project) 
				.then(function(status) {
					$scope.setStatus = {type: $scope.userStatus[2].value};
					$scope.emailButtonValue = 'Email';
					$scope.emailStatus = 'Sending...';
					$scope.users.push($scope.addInvite);
				}, function(err) {
					console.log(status);
			});
		}

}]);