angular.module('foodgasm')
    .factory('Movies', ['$resource', 'API', function($resource, API) {
        var url = API.TMDB.BASE_URI + API.TMDB.MOVIE;

        console.log(url);

        let latest = function() {
            console.log(url);
            return $resource(url + '/latest', {}, {
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

        let nowPlaying = function() {
            return $resource(url + '/now_playing', {}, {
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

        let upComing = function() {
            return $resource(url + '/upcoming', {}, {
                get: { method: 'get' },
                query: { method: 'get', isArray: true }
            });
        };



        return {
            latest: (latest),
            nowPlaying: (nowPlaying),
            popular: (popular),
            topRated: (topRated),
            upComing: (upComing)
        };

    }]);