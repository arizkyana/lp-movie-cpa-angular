angular.module('foodgasm')
    .factory('Tv', ['$resource', 'API', function($resource, API) {
        var url = API.TMDB.BASE_URI + API.TMDB.TV;

        console.log(url);

        let airingToday = function() {
            console.log(url);
            return $resource(url + '/airing_today', {}, {
                get: { method: 'get' },
                query: { method: 'get', isArray: true }
            });
        };

        let onTheAir = function() {
            return $resource(url + '/on_the_air', {}, {
                get: { method: 'get' },
                query: { method: 'get', isArray: true }
            });
        };

        let popular = function() {
            return $resource(url + '/popular', {}, {
                get: { method: 'get' },
                query: { method: 'get', isArray: true }
            });
        };

        let topRated = function() {
            return $resource(url + '/top_rated', {}, {
                get: { method: 'get' },
                query: { method: 'get', isArray: true }
            });
        };




        return {
            airingToday: (airingToday),
            onTheAir: (onTheAir),
            popular: (popular),
            topRated: (topRated),
        };

    }]);