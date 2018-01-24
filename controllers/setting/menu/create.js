angular.module('foodgasm')
    .controller('SettingMenuCreateController', [
        '$rootScope',
        '$scope',
        '$resource',
        'API',
        'Menu',

        function($rootScope, $scope, $resource, API, Menu) {

            $scope.menu = {};

            $scope.save = function() {
                $scope.menu.parent = Number($scope.menu.parent);
                Menu.create($scope.menu)
                    .$promise
                    .then(function(result) {
                        console.log(result);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            };

        }
    ])
    .directive('parents', [
        '$ocLazyLoad',
        '$resource',
        'API',
        '$q',
        '$compile',
        'Menu',
        function($ocLazyLoad, $resource, API, $q, $compile, Menu) {

            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    $ocLazyLoad.load('themes/js/plugins/select2/select2.full.min.js')
                        .then(function() {
                            return Menu.query().$promise
                        })
                        .then(function(result) {
                            scope.parents = result;
                            element.select2();
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                }


            }

        }
    ]);