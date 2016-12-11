 var app = angular.module('app', [])

    .controller('postController', getPosts)
        .filter('htmlToPlaintext', function() {
            return function(text) {
                return text ? String(text).replace(/<[^>]+>/gm, '') : '';
            };
        })
        .directive('blogPosts', function() {
            // Runs during compile
            return {
                restrict: 'AE',
                templateUrl: 'templates/blog-posts.html',
                replace:true,
                link: function($scope, iElm, iAttrs, controller) {

                }
            };
        });

    
    function getPosts($http, $scope) {
        $scope.myPosts = [];
        $http({
            method: 'GET',
            url: '/posts'
        }).then(function successCallBack(res) {

            for (i = 0; i < res.data.length; i++) {
                $scope.myPosts = res.data;
            }

        }, function errorCallBack(response) {

        });
    }