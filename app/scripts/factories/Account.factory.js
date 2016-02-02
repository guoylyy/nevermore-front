;
void

function() {
    'use strict';

    angular.module('nevermore')
        .factory('AccountFactory', AccountFactory);

    AccountFactory.$inject = ["$resource", "sessionService", "$rootScope", "MiddlewareFactory"];

    function AccountFactory($resource, sessionService, $rootScope, MiddlewareFactory) {

        var baseUrl = base_Url + '/account';
        var headers = sessionService.headers();
        var middlewareList = MiddlewareFactory.getMiddlewareList()

        return {
            removeClazzStudent: removeClazzStudent,
            addStudentToClazz: addStudentToClazz,
            clearClazzStudent: clearClazzStudent,
            accountIcon: accountIcon,
            uploadIcon: uploadIcon,
            profile: profile,
            search: search,
            password: password,
            passwordByAdmin: passwordByAdmin,
            create: create,
            all: all,
            page: page,
            login: login,
        };

        function removeClazzStudent() {
            return $resource(baseUrl + '/class/:clazzId/st/:studentId', {
                clazzId: "@clazzId",
                studentId: "@studentId"
            }, {
                'delete': {
                    method: 'DELETE',
                    headers: sessionService.headers()
                }
            });
        }

        function addStudentToClazz() {
            return $resource(baseUrl + '/class/:classId/st', {
                classId: "@classId"
            }, {
                'post': {
                    method: 'POST',
                    headers: sessionService.headers()
                }
            });
        }

        function clearClazzStudent() {
            return $resource(baseUrl + '/class/:classId/st/clear', {
                classId: "@classId"
            }, {
                'delete': {
                    method: 'DELETE',
                    headers: sessionService.headers()
                }
            });
        }

        function accountIcon() {
            return $resource(baseUrl + '/icon/:attachId', {
                attachId: "@attachId"
            }, {
                'put': {
                    method: 'PUT',
                    headers: sessionService.headers()
                }
            })
        }

        function uploadIcon() {
            return $resource(baseUrl + '/icon', {}, {
                'post': {
                    method: 'POST',
                    headers: sessionService.headers()
                }
            })
        }

        function profile() {
            return $resource(baseUrl + '/profile', {}, {
                'get': {
                    method: 'GET',
                    headers: sessionService.headers()
                },
                'put': {
                    method: 'PUT',
                    headers: sessionService.headers()
                }
            });
        }

        function search() {
            return $resource(baseUrl + '/searchByNameAndNumber', {

            }, {
                'get': {
                    method: 'GET',
                    headers: sessionService.headers()
                }
            });
        }

        function password() {
            return $resource(baseUrl + '/password', {}, {
                'put': {
                    method: 'PUT',
                    headers: sessionService.headers()
                }
            });
        }

        function passwordByAdmin() {
            return $resource(baseUrl + '/:id/passwordByAdmin', {
                id: "@id"
            }, {
                'put': {
                    method: 'PUT',
                    headers: sessionService.headers()
                }
            });
        }

        function create() {
            return $resource(baseUrl, {

            }, {
                'post': {
                    method: 'POST',
                    headers: sessionService.headers()
                }
            })
        }

        function all() {
            return $resource(baseUrl + '/list/all', {

            }, {
                'get': {
                    method: 'GET',
                    headers: sessionService.headers()
                }
            });
        }

        function page() { //分页获取用户
            return $resource(baseUrl + '/list/page/:pageSize/:pageNumber', {
                pageSize: "@pageSize",
                pageNumber: "@pageNumber"
            }, {
                'get': {
                    method: 'GET',
                    headers: sessionService.headers()
                }
            });
        }

        function login(userName, password) {
            var header = {
                "X-Username": userName,
                "X-Password": encryptPassword(password, userName),
            };
            var url = apiUrl + "/authentication";
            var loginResource = $resource(url, null, {
                "post": {
                    method: 'POST',
                    headers: header,
                }
            });

            return loginResource.post({})
                .$promise
                .then(function(response) {
                    for (var i = 0; i < middlewareList.length; i++) {
                        var middleware = middlewareList[i]
                        response = middleware(response)
                    }
                    return response
                })
        }

        function encryptPassword(basePassword, userName, sbin) {
            sbin = "1234"; //未来从后台获取
            var encryptOnce = md5(basePassword);
            var encryptTwice = md5(encryptOnce + userName);
            var encryptThird = md5(encryptTwice + sbin.toUpperCase());
            return encryptThird;
        }

    }
}();