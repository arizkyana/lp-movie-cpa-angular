let route = angular.module('foodgasm.route', [
    'ngRoute',
    'ui.router'
]);
route.config([
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider',
    function($stateProvider, $locationProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/app/');


        // routes

        $stateProvider.state('app', {
                abstract: true,
                url: '/app',
                template: '<ui-view />',

            })
            .state('app.dashboard', {
                url: '/',
                templateUrl: 'views/dashboard/index.html',
                resolve: {
                    loadController: loadController([
                        'models/movies.js',
                        'models/tv.js',
                        'controllers/dashboard/index.js'
                    ])
                },
                controller: 'DashboardIndexController',
            })
            .state('app.setting', {
                abstract: true,
                url: '/setting',
                template: '<ui-view />'
            })
            .state('app.setting.user', {
                url: '/user',
                templateUrl: 'views/setting/user/index.html',
                resolve: {
                    loadController: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('controllers/setting/user/index.js');
                    }]
                },
                controller: 'SettingUserIndexController'
            })
            .state('app.setting.role', {
                url: '/role',
                templateUrl: 'views/setting/role/index.html',
                resolve: {

                    loadController: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('controllers/setting/role/index.js');
                    }]
                },
                controller: 'SettingRoleIndexController'
            })

            // menu
            .state('app.setting.menu', {
                url: '/menu',
                templateUrl: 'views/setting/menu/index.html',
                resolve: {
                    loadController: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('controllers/setting/menu/index.js');
                    }]
                },
                controller: 'SettingMenuIndexController'
            })
            .state('app.setting.menu.create', {
                url: '/create',
                replace: true,
                templateUrl: 'views/setting/menu/create.html',
                resolve: {
                    loadController: loadController([
                        'models/menu.js',
                        'controllers/setting/menu/create.js'
                    ])
                },
                controller: 'SettingMenuCreateController'
            })
            .state('app.setting.menu.edit', {
                url: '/edit/:id',
                replace: true,
                templateUrl: 'views/setting/menu/update.html',
                resolve: {
                    loadController: loadController([
                        'models/menu.js',
                        'controllers/setting/menu/update.js'
                    ])
                },
                controller: 'SettingMenuUpdateController'
            });




    }
]);

// loadController
function loadController(files) {
    return ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load(files);
    }];
}