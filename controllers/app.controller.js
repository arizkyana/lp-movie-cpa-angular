'use-strict';

var app = angular.module('foodgasm', [
    'ngResource',
    'oc.lazyLoad',
    'foodgasm.route'
]);

app.constant('API', {
    BASE_URI: 'http://localhost:1337',
    TMDB: {
        BASE_URI: 'https://api.themoviedb.org/3',
        MOVIE: '/movie',
        TV: '/tv',
        KEY: '1b094a4879018e9474eeb5da63c8b14b',
        IMAGES: {
            w300: 'https://image.tmdb.org/t/p/w300/',
            w780: 'https://image.tmdb.org/t/p/w780/',
            w1280: 'https://image.tmdb.org/t/p/w1280/',
            original: 'https://image.tmdb.org/t/p/original/',
        }
    },
    CAMPAIGN: {
        MOVIES: 'http://ah.groundsec.com?s1=cg-875&s2=59ddebcf5fc61a6f73dbf537'
    }
});

app.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        debug: false,
        events: true
    });
}]);

app.config(['$httpProvider', function($httpProvider) {

    $httpProvider.interceptors.push(['$q', 'API', function($q, API) {
        return {
            request: function(config) {
                config.params = { api_key: API.TMDB.KEY };
                return config;
            },
            response: function(response) {
                return response;

            }
        }
    }]);

}]);

app.run(['$rootScope', '$ocLazyLoad', 'API', function($rootScope, $ocLazyLoad, API) {
    console.log("Angular is Running");

    $rootScope.campaign = API.CAMPAIGN.MOVIES;

    $(document).ready(function() {

        $('body').scrollspy({
            target: '.navbar-fixed-top',
            offset: 80
        });

        // Page scrolling feature
        $('a.page-scroll').bind('click', function(event) {
            var link = $(this);
            $('html, body').stop().animate({
                scrollTop: $(link.attr('href')).offset().top - 50
            }, 500);
            event.preventDefault();
            $("#navbar").collapse('hide');
        });
    });

    var cbpAnimatedHeader = (function() {
        var docElem = document.documentElement,
            header = document.querySelector('.navbar-default'),
            didScroll = false,
            changeHeaderOn = 200;

        function init() {
            window.addEventListener('scroll', function(event) {
                if (!didScroll) {
                    didScroll = true;
                    setTimeout(scrollPage, 250);
                }
            }, false);
        }

        function scrollPage() {
            var sy = scrollY();
            if (sy >= changeHeaderOn) {
                $(header).addClass('navbar-scroll')
            } else {
                $(header).removeClass('navbar-scroll')
            }
            didScroll = false;
        }

        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }
        init();

    })();

    // Activate WOW.js plugin for animation on scrol
    new WOW().init();
}]);