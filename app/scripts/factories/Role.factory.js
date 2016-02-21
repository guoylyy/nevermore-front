;void function(){
	angular.module("nevermore")
			.factory("RoleFactory", RoleFactory)

	function RoleFactory(){
		return {
			isStudent: isStudent,
			isTeacher: isTeacher,
			isAdmin: isAdmin,
		}
	}

	function isStudent(role){
		var ROLE_NAME = "STUDENT"

		return hasRole(role, ROLE_NAME)
	}

	function isTeacher(role){
		var ROLE_NAME = "TEACHER"

		return hasRole(role, ROLE_NAME)
	}

	function isAdmin(role){
		var ROLE_NAME = "ADMIN"

		return hasRole(role, ROLE_NAME)
	}

	function hasRole(role, targetRoleName){
		if(isValidRole(role) === false){
			return false
		}

		for(var i = 0 ; i < role.length ; i++){
			var roleElement = role[i]
			if(!!roleElement.name && roleElement.name.code === targetRoleName){
				return true
			}
		}

		return false
	}

	function isValidRole(role){
		return Array.isArray(role)
	}
}()