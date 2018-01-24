let menu = angular.module('foodgasm', []);
menu.controller('SettingMenuIndexController', [
    '$rootScope',
    '$scope',
    '$ocLazyLoad',
    'API',
    '$resource',

    function($rootScope, $scope, $ocLazyLoad, API, $resource) {


    }
]);

menu.directive('tableMenu', ['$ocLazyLoad', '$resource', 'API', '$q', '$compile', function($ocLazyLoad, $resource, API, $q, $compile) {

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            var table;

            $ocLazyLoad
                .load([{ type: 'js', path: 'themes/js/plugins/dataTables/datatables.min.js', cache: true }])
                .then(function(result) {
                    table = element.DataTable({
                        saveState: true,
                        ajax: {
                            url: API.BASE_URI + '/menu/datatable',
                            method: 'get'
                        },
                        order: [
                            [0, 'asc']
                        ],

                        columns: [{
                                data: 'name',
                                render: function(data, type, row, meta) {
                                    return '<a ui-sref="app.setting.menu.edit({id:' + row.id + '})" class="text-danger no-underline">' + data + '</a>';
                                }
                            },
                            { data: 'url' },
                            { data: 'icon' },
                            { data: 'parent' },
                            {
                                data: 'id',
                                render: function(data, type, row, meta) {
                                    return '<button ng-click="remove(' + data + ')" type="button" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>';
                                }
                            },
                        ],
                        createdRow: function(row) {
                            $compile(row)(scope);
                        }
                    });
                });

            scope.remove = function(id) {

                table.ajax.url(API.BASE_URI + '/menu/datatable').load(function() {
                    table.draw(true);
                });
            }


        }
    }

}]);