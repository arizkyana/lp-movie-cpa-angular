angular.module('foodgasm')
    .controller('SettingMenuUpdateController', [
        '$rootScope',
        '$scope',
        '$resource',
        'API',
        'Menu',
        '$stateParams',
        function($rootScope, $scope, $resource, API, Menu, $stateParams) {

            $scope.menu = {};

            Menu.get({ id: $stateParams.id })
                .$promise
                .then(function(result) {
                    $scope.menu = result;
                })
                .catch(function(err) {
                    console.log(err);
                });

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
    .directive('parents', ['$ocLazyLoad', '$resource', 'API', '$q', '$compile', function($ocLazyLoad, $resource, API, $q, $compile) {

        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $ocLazyLoad.load('themes/js/plugins/select2/select2.full.min.js')
                    .then(function() {
                        return $resource(API.BASE_URI + '/menu').query().$promise
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

    }]);