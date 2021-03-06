angular.module('app')
	.factory('wFProjectFactory', ['$rootScope', '$http', '$q', '$location', 'wFNotifier', 
		function($rootScope, $http, $q, $location, wFNotifier){

		var mapData = [];
		var wildlifeData = [];
		var wildlifeInProject = [];
		var projectMonitorArray = [];
		var editMonitorArray = [];
		var monitor = {};

		return {
				setWildlifeData : function(wildlife) {
					wildlifeData = wildlife;
				},

				getWildlifeData : function() {
					return wildlifeData;
				},

				setProjectMonitors : function(monitor) {
					console.log(monitor);
					projectMonitorArray.push(monitor);
				},

				setEditMonitors : function(monitor) {
					editMonitorArray.push(monitor);
				},
				// called by wFEditProjectCtrl->getProjectById();
				getProjectMonitors : function() {
					return projectMonitorArray;
				},

				getEditMonitors : function() {
					return editMonitorArray;
				},

				setWildlifeForEdit : function(projectWildlife) {
					wildlifeInProject = projectWildlife;
				},

				getWildlifeForEdit : function() {
					return wildlifeInProject;
				},

				getProjects : function() {
					var dfd = $q.defer();
					$http({method: 'GET', url: '/api/projects'})
						.success(function(data, status, headers, config) {
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;

				},

				getProjectById : function(id) {
					var dfd = $q.defer();
					$http({method: 'GET', url: '/api/getProject/' + id})
						.success(function(data, success, headers, config) {
							dfd.resolve(data);				
						})
						.error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;
				},

				getProjectTasks : function(id) {
					var dfd = $q.defer();
					$http({method: 'GET', url: '/api/getProjectTasks/' + id})
						.success(function(data, success, headers, config) {
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;
				},


				getProjectsByUser : function(user) {
			
					var dfd = $q.defer();
					$http({method: 'GET', url: '/api/projectsByUser/' + user})
						.success(function(data, success, headers, config) {
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;
				},

				getProjectsByGroup : function(group) {
					var dfd = $q.defer();
					$http({method: 'GET', url: '/api/projectsByGroup/' + group})
						.success(function(data, success, headers, config) {
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config) {

							dfd.reject(status);
						});
					return dfd.promise;
				},

				viewProjectDetails : function(name) {
					var dfd = $q.defer();
					$http({method: 'GET', url:'/api/projectDetails/' + name})
						.success(function(data, status, headers, config){
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config){
							dfd.reject(status);
						});
					return dfd.promise;
				},

				addProject : function(projectData) {
					var dfd = $q.defer();
					$http.post('/api/createProject', projectData)
						.success(function(data, status, headers, config) {
							project = data;
							dfd.resolve(data);
						})
						.error(function(response, status) {
							wFNotifier.error(response.reason);
							dfd.reject(status);
						});
					return dfd.promise;
				}, 

				addGroupToProject : function(groupToProjectData) {
					var dfd = $q.defer();
					$http.post('/api/addGroupToProject', groupToProjectData)
						.success(function(data, status, headers, config) {
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;
				},

				removeProject : function(id) {
					var dfd = $q.defer();
					$http.post('/api/removeProject/' + id)
						.success(function(data, success, headers, config) {
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;
				},

				updateProject : function(id, projectData) {
					var dfd = $q.defer();
					$http({method: 'PUT', url: '/api/updateProject/' + id, data:{projectData: projectData}})
						.success(function(data, status, headers, config) {
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config) {
							dfd.reject(data);
						});
					return dfd.promise;
				},

				makePayment : function(token, amount, project){

					var dfd = $q.defer();
					$http.post('/api/makePayment/' + token + '/' + amount + '/' + project)
						.success(function(data, status, headers, config) {
							
							var dfd = $q.defer();
							$http({method: 'PUT', url: '/api/projects/' + project, data:{amount: amount}})
								.success(function(data, status, headers, config) {
									wFNotifier.notify('Thanks. You\'ve just made a contribution of $' + amount + ' to project ' + name + ' was successfully recieved.');
									$location.path('/projects');
								})
								.error(function(data, status, headers, config){
									console.log(status);
								});

						})
						.error(function(data, status, headers, config) {
							dfd.reject(data);
						});

					return dfd.promise;
				}/*,

				contributeToProject: function(id, amount, name) {
					console.log('cTP called');
					var dfd = $q.defer();
					$http({method: 'PUT', url: '/api/projects/' + id, data:{amount: amount}})
						.success(function(data, status, headers, config) {
							wFNotifier.notify('Thanks. You\'ve just made a contribution of $' + amount + ' to project ' + name + ' was successfully recieved.');
							$location.path('/projects/' + id);
						})
						.error(function(data, status, headers, config){
							console.log(status);
						});
					return dfd.promise;
					
				}*/
		} 
	}]);