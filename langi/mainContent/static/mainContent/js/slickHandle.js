$(document).ready(function () {
    $('.tiles').slick({
        vertical: true,
        verticalSwiping: true,
        swipeToSlide: true,
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>',
        dots: true,
        speed: 100,
        cssEase: 'linear',
        infinite: true,
        touchThreshold: 10000,
    });
});