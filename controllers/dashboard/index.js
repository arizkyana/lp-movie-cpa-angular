angular.module('foodgasm')
    .controller('DashboardIndexController', [
        '$rootScope', '$scope', 'Movies', 'API', '$q', 'Tv',
        function($rootScope, $scope, Movies, API, $q, Tv) {
            console.log("Dashboard Index");

            $scope.banners = []; // only 3 input for now playing movies
            $scope.movies = {
                nowPlaying: []
            };

            $scope.tv = {
                airingToday: []
            };

            $q.all([
                Movies.nowPlaying().get().$promise,
                Tv.airingToday().get().$promise
            ]).then(function(results){

                /**
                 * Movies
                 */

                $scope.banners = results[0].results.splice(0, 3);
                $scope.movies.nowPlaying = results[0].results.splice(0, 12);

                // marshall backdrop path
                $.each($scope.banners, function(i, banner) {
                    banner.type = 'movie';
                    banner.backdrop_path = API.TMDB.IMAGES.w1280 + banner.backdrop_path;
                });

                $.each($scope.movies.nowPlaying, function(i, movie) {
                    movie.poster_path = API.TMDB.IMAGES.w300 + movie.poster_path;
                });

                /**
                 * TV Shows
                 */

                $scope.tv.airingToday = results[1].results.splice(0, 12);
                $.each($scope.tv.airingToday, function(i, tv){
                    tv.poster_path = API.TMDB.IMAGES.w300 + tv.poster_path;
                });



            }).catch(function(err){
                console.log(err);
            });

        }
    ])
    .directive('slick', ['$q', '$timeout', function($q, $timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                $timeout(function() {
                    console.log('slick ready');
                    $(attr.class).slick({
                        infinite: true,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        centerMode: true,
                        responsive: [{
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3,
                                    infinite: true,
                                    dots: true
                                }
                            },
                            {
                                breakpoint: 600,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }
                        ]
                    });
                }, 3000);

            }
        }
    }])