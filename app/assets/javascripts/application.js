// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//# require turbolinks
//= require_tree .

var ready = function() {
    // console.log('Doc is apparently ready');
    if (typeof(admin) !== 'undefined' && admin !== null && admin === true) {
    } else {
        // console.log('Executing onReady functions');
        // Transferred from client.js
        // loadCrappyCode();
        // formStepSetup();
    }

};
// console.log(2);
$(function() {

	$('.menu-link').click(function(e) {
		e.preventDefault();
		$('.container').toggleClass('menu-visible');
	});

	var mySwiper = $('.swiper-container').swiper({
		mode:'horizontal',
		loop: true,
		pagination: '.pagination',
		paginationClickable: true
	});

});