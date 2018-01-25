angular.module('foodgasm')
    .controller('TvDetailController', [
        '$rootScope', '$scope', 'Tv', '$stateParams', 'API', '$state', 'Movies',
        function($rootScope, $scope, Tv, $stateParams, API, $state, Movies) {
            console.log('masuk detail tv : ', $stateParams.id);

            $scope.tv = {};
            $scope.movies = [];

            Tv.tv($stateParams.id).get()
                .$promise
                .then(function(tv) {

                    $scope.tv = tv;

                    $scope.tv.backdrop_path = API.TMDB.IMAGES.w1280 + tv.backdrop_path;
                    $scope.tv.poster_path = API.TMDB.IMAGES.w300 + tv.poster_path;

                    $scope.tv.genres = $.map(tv.genres, function(tv) {
                        return tv.name;
                    }).join();

                    $scope.tv.production_companies = $.map(tv.production_companies, function(company) {
                        return company.name;
                    }).join();

                    $scope.tv.seasons = $.map(tv.seasons, function(season) {
                        if (season.poster_path) {
                            console.log('ada poster path')
                            season.poster_path = API.TMDB.IMAGES.w300 + season.poster_path;
                            return season;
                        } else {
                            console.log('ga ada poster path');
                        }
                    });

                    $scope.tv.languages = tv.languages.join();

                    return Tv.videos($stateParams.id).get().$promise;


                })
                .then(function(videos) {
                    let video = {};
                    if (videos.results.length >= 1) {
                        video = videos.results[0];
                        $scope.tv.trailer = video.key;

                        // <iframe width="560" height="315" src="https://www.youtube.com/embed/FKbVQEBuemQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    }

                    return Tv.popular().get().$promise;

                })
                .then(function(populars) {
                    $scope.tv.populars = $.map(populars.results, function(popular) {
                        popular.backdrop_path = API.TMDB.IMAGES.w1280 + popular.backdrop_path;
                        popular.poster_path = API.TMDB.IMAGES.w300 + popular.poster_path;
                        return popular;
                    });

                    return Movies.nowPlaying().get().$promise;
                })
                .then(function(movies) {
                    $scope.movies = $.map(movies.results, function(movie) {
                        movie.backdrop_path = API.TMDB.IMAGES.w1280 + movie.backdrop_path;
                        movie.poster_path = API.TMDB.IMAGES.w300 + movie.poster_path;
                        return movie;
                    });
                })
                .catch(function(err) {
                    console.log(err);
                });

            $scope.goToDetail = function(id) {
                $state.go('app.tv.detail', { id: id });
            }

            $scope.goToDetailMovie = function(id) {
                $state.go('app.movies.detail', { id: id });
            }

            $scope.goToDetailSeason = function(id) {
                window.location.href = $rootScope.campaign;
            }
        }
    ])

    .directive('repeatEvent', ['$rootScope', function($rootScope) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last) {
                    let parentClass = angular.element(element).parent().attr('class');

                    $('.' + parentClass).slick({
                        infinite: true,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        centerMode: false,
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
                }
            }
        }
    }])