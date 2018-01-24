angular.module('foodgasm')
    .factory('Menu', ['$resource', 'API', function($resource, API) {

        return $resource(API.BASE_URI + '/menu', {}, {
            query: { method: 'GET', isArray: true },
            create: { method: 'POST' },
            get: { method: 'GET' },
            remove: { method: 'DELETE' },
            update: { method: 'PUT' }
        });

    }]);