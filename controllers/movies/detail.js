angular.module('foodgasm')
    .controller('MoviesDetailController', [
        '$rootScope', '$scope', 'Movies', '$stateParams', 'API', '$state', 'Tv',
        function($rootScope, $scope, Movies, $stateParams, API, $state, Tv) {
            console.log('masuk detail movie : ', $stateParams.id);

            $rootScope.meta = {
                title: '',
                content: ''
            };

            $scope.movie = {
                movie: {},
                recommendations: [],
                trailer: {}
            };

            $scope.tv = {
                airingToday: []
            };

            Movies.movie($stateParams.id).get()
                .$promise
                .then(function(movie) {

                    $rootScope.meta = {
                        title: movie.original_title,
                        content: movie.overview
                    };

                    $scope.movie.movie = movie;

                    $scope.movie.movie.backdrop_path = API.TMDB.IMAGES.w1280 + movie.backdrop_path;
                    $scope.movie.movie.poster_path = API.TMDB.IMAGES.w300 + movie.poster_path;

                    let companies = [];
                    $.each($scope.movie.movie.production_companies, function(i, company) {
                        companies.push(company.name);
                    });
                    $scope.movie.movie.companies = companies.join();

                    return Movies.recommendation($stateParams.id).get().$promise;

                })
                .then(function(recommendations) {
                    console.log('recommendation movies');

                    $.each(recommendations.results, function(i, recommendation) {
                        recommendation.backdrop_path = API.TMDB.IMAGES.w1280 + recommendation.backdrop_path;
                        recommendation.poster_path = API.TMDB.IMAGES.w300 + recommendation.poster_path;
                    });

                    $scope.movie.recommendations = recommendations.results.splice(2, 18);

                    return Movies.videos($stateParams.id).get().$promise;
                })

                .then(function(videos) {

                    let video = {};
                    if (videos.results.length >= 1) {
                        video = videos.results[0];
                        $scope.movie.trailer = video.key;

                        // <iframe width="560" height="315" src="https://www.youtube.com/embed/FKbVQEBuemQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    }


                    return Tv.airingToday().get().$promise;
                })
                .then(function(airingToday) {
                    $scope.tv.airingToday = $.map(airingToday.results, function(airing) {
                        airing.backdrop_path = API.TMDB.IMAGES.w1280 + airing.backdrop_path;
                        airing.poster_path = API.TMDB.IMAGES.w300 + airing.poster_path;
                        return airing;
                    });

                })
                .catch(function(err) {
                    console.log(err);
                })

            $scope.goToDetail = function(id) {
                $state.go('app.movies.detail', { id: id });
            };

            $scope.goToDetailTv = function(id) {
                $state.go('app.tv.detail', { id: id });
            };

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