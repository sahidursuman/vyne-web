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
//= require library
//= require forms
//= require vendor/maskedinput
//= require vendor/swiper_min
//= require vendor/idangerous.swiper.hashnav
//= require vendor/leaflet-0.7.3/leaflet.js
//= require vendor/leaflet-plugins-1.2.0/layer/tile/Google
//= require carhartl/jquery.cookie.js
//= require mroderick/pubsub.js
//= require moment
//= require delivery
//= require device
//= require orders
//= require bootstrap-sprockets
//= require drew/jpreloader.min
//= require drew/jquery.counterup.min
//= require drew/jquery.inview.min
//= require drew/jquery.nav.min
//= require drew/jquery.stellar.min
//= require drew/picturefill.min
//= require drew/smoothscroll.min
//= require mathiasbynens/jquery.placeholder
//= require home

//= require react
//= require app
//= require session

/**
 * Turbolinks always at the end of all scripts.
 */
//= require turbolinks

/**
 * Triger Analytics for turbolinks pages
 */

$(document).on('ready', function () {
    checkForMobileDevice();
});

/**
 * =======================================
 * Function: Detect Mobile Device
 * =======================================
 */
// source: http://www.abeautifulsite.net/detecting-mobile-devices-with-javascript/
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return ( isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() );
    }
};

var checkForMobileDevice = function () {
    if (isMobile.any()) {
        // add identifier class to <body>
        $('body').addClass('mobile-device');
        // remove all element with class "remove-on-mobile-device"
        $('.remove-on-mobile-device').remove();
    }

    //TODO: This is to clean-up old cookie. Can be removed after 01-07-2015
    $.removeCookie('wines', { path: '/shop' });
};

var events = [];

var wines = [];

var wine = function () {
    this.id;
    this.quantity = 0;
    this.category = 0;
    this.label = '';
    this.price = '';
    this.priceMin = 0;
    this.priceMax = 0;
    this.specificWine = '';
    this.food = [];
    this.occasion = 0;
    this.occasionName = '';
    this.wineType = {id: 0, name: ''};
    this.complete = false;
    this.promoPrice = null
};

//Object to store food details
var food = function (id, name, preparationId, preparationName) {
    this.id = id;
    this.name = name;
    this.preparation = preparationId;
    this.preparationName = preparationName;
};

var wineCount = 0;
var secondBottle = false;
var orderSwiper;
var userEstablished = false;
var free = false;

/**
 * When we're in the cart there are always 3 swiper events
 * required to go back to the beginning of the flow.
 */

var resetEventsForCart = function () {
    events = [];
    for (var i = 0; i < 3; i++) {
        events.push({
            type: 'slideChange'
        });
    }
};

var cleanupUnfinishedWines = function () {
    if (wines) {
        for (var i = 0; i < wines.length; i++) {
            if (!wines[i].complete) {
                wines.splice(i, 1);
                wineCount--;
            }
        }
    }

    secondBottle = false;
};

var loadWines = function () {
    if ($('body.shop').length && $('body.new').length) {
        var savedWines = $.cookie('wines');
        if (savedWines) {
            if (JSON.parse(savedWines).length > 0) {
                $('input[name="wines"]').val(savedWines);
                wines = JSON.parse(savedWines);
                createCartPage(wines, wines.length - 1);
                orderSwiper.swipeTo(2, 500);
                resetEventsForCart();
            }
        }

        updateOrderSummary();
    }
};

$(document).on('page:load page:change', function () {
    loadWines();
});

var mailingListSignUp = function (email, callback) {

    $.ajax({
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').last().attr('content'))
        },
        url: '/mailing_list_signup',
        data: {
            email: email
        },
        error: function (data) {

            if (data && data.responseJSON) {
                var errors = data.responseJSON.errors;
                if (errors) {
                    var error = errors.join(', ');
                    callback(error);
                }
            } else {

                if (data.statusText) {
                    callback(data.statusText);
                } else {
                    callback('Error');
                }
            }

        },
        success: function () {

            callback();

            analytics.track('User home mailing list sing up', {
                email: email
            });
        }
    });
};


$(function () {

    // IE 9 Placeholder Polyfill
    $('input, textarea').placeholder({customClass: 'ie-placeholder'});

    //Hamburger/menu icon animation classes
    $('.menu-link').click(function (e) {

        if ($('.menu-link').hasClass('slide')) {
            analytics.track('Menu', {
                action: 'Closed'
            });
        } else {
            analytics.track('Menu', {
                action: 'Opened'
            });
        }

        e.preventDefault();
        $('.menu-link').toggleClass('slide');
        $('.container').toggleClass('menu-visible');
        $('.aside-bar').toggleClass('visible');
    });

    /* Walkthrough */

    var $arrowLeft = $('.arrow-left');
    var $arrowRight = $('.arrow-right');
    var $arrowLeftImage = $('.arrow-left-image');
    var $arrowRightImage = $('.arrow-right-image');

    //Initialising the walkthrough slider
    var walkThtough = $('#walkthrough').swiper({
        mode: 'horizontal',
        speed: 200,
        pagination: '.pagination',
        paginationClickable: true,
        onSlideChangeStart: function () {
            // first Slide
            switch (walkThtough.activeIndex) {
                case 0:
                    $arrowLeft.hide();
                    $arrowRight.show();
                    break;
                case 2:
                    $arrowLeft.show();
                    $arrowRight.hide();
                    break;
                default:
                    $arrowLeft.show();
                    $arrowRight.show();
            }
        }
    });

    $arrowLeft.on('click', function (e) {
        e.preventDefault();
        walkThtough.swipePrev();
    });

    $arrowRight.on('click', function (e) {
        e.preventDefault();
        walkThtough.swipeNext();
    });

    function checkWidth() {
        var windowsize = $(window).width();
        if (windowsize <= 414) {
            $arrowLeftImage.css("width", 10);
            $arrowLeftImage.css("height", 18);
            $arrowRightImage.css("width", 10);
            $arrowRightImage.css("height", 18);
        }
    }

    checkWidth();
    $(window).resize(checkWidth);

    //Initialising order slider
    orderSwiper = $('#order').swiper({
        mode: 'horizontal',
        speed: 200,
        //hashNav: true,
        noSwiping: true,
        simulateTouch: false,
        onlyExternal: true,
        onSlideChangeStart: function (swiper) {
            if (swiper.activeSlide()) {
                analytics.track('Slide changed', {
                    slide: swiper.activeSlide().id
                });

                if (swiper.activeSlide().id == 'delivery-panel') {
                    verifyAddress();
                }

                if (swiper.activeSlide().id == 'payment-panel') {
                    checkPromotions();
                }
            }
        },
        onSlideNext: function (swiper) {
            //Dont register new event if last panel was registration panel. We will be removing it.
            if (swiper.getSlide(swiper.previousIndex).id !== 'register-panel') {
                events.push({
                    type: 'slideChange'
                });
            }
        },
        onSlideChangeEnd: function (swiper) {
            //Remove registration panel. User successfully registered or signed by this point.

            if (swiper.getSlide(swiper.previousIndex).id === 'register-panel' && userEstablished) {
                swiper.removeSlide(swiper.previousIndex);

                if (ieVersion() > 0 && ieVersion() < 11) {
                    setTimeout(function () {
                        swiper.swipeTo(swiper.previousIndex - 1, 0, false);
                    }, 0);
                } else {
                    swiper.swipeTo(swiper.previousIndex - 1, 0, false);
                }
            }

            updateOrderSummary();
        }
    });

    //A class for navigating to the next slide
    $('.next-slide').click(function (e) {
        e.preventDefault();
        orderSwiper.swipeNext();
    });

    $('.back-nav').click(function (e) {
        e.preventDefault();

        analytics.track('Back button clicked');

        var event = events.pop();
        if (event) {
            switch (event.type) {
                case 'slideChange':
                    if (event.name) {
                        orderSwiper.swipeTo(event.name, 500);
                    } else {
                        orderSwiper.swipePrev();
                    }
                    break;
                case 'matchingWine':
                    clearPreferences();
                    break;

            }
        }
    });


    /* Availabilty */


    $('#order input').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
        }
    });

    /* Select a Bottle */

    //Display more infomation about a bottle on click
    $('.bottle-link').click(function (e) {
        if (!$('.close').hasClass('hover')) {
            $('.bottle-info').removeClass('active');
            $(this).parent().find('.bottle-info').addClass('active');
        }
        analytics.track('Bottle selected', {
            category: $(this).data('category-id')
        });
    });

    $('.order-panel-overlay').css({
        'height': $(this).parent().height() + 'px'
    });

    $('.close').hover(function () {
        $(this).addClass('hover');
    }, function () {
        $(this).removeClass('hover');
    });

    $('.close').click(function (e) {
        $('.bottle-info').removeClass('active');
    });

    $('.not-in-stock').click(function (e) {
        $('.bottle-info').removeClass('active');
    });

    $('.select-bottle').click(function (e) {
        e.preventDefault();
        $('.bottle-info').removeClass('active');

        if (secondBottle && wineCount == 0) {
            wineCount++;
        }

        //Create a new wine object
        wines[wineCount] = new wine();
        wines[wineCount].quantity = 1;
        wines[wineCount].label = $(this).parent().find('.label').text();
        wines[wineCount].price = $(this).parent().find('.price').text();
        wines[wineCount].category = $(this).closest('.bottle-info').data('category-id');
        wines[wineCount].priceMin = $(this).closest('.bottle-info').data('price-min');
        wines[wineCount].priceMax = $(this).closest('.bottle-info').data('price-max');
        wines[wineCount].id = wineCount;

        analytics.track('Bottle chosen', {
            category: wines[wineCount].category
        });

        orderSwiper.swipeNext();
    });


    /* Preferences */

    var ingredientCount, cartCount = 0;

    //Simple tab naviation
    $('.tab-list li a').click(function (e) {
        e.preventDefault();
        $($(this).attr('href')).parent().find('.tab').removeClass('active');
        $($(this).attr('href')).addClass('active');

        if ($(this).parent().parent().parent().find('#food-list').length > 0 || $(this).parent().parent().parent().find('#occasion-list').length > 0) {
            $('.main-preferences').hide();
        }
    });

    $('.tab-list.tab-list__horizontal li a').click(function (e) {
        e.preventDefault();

        analytics.track('Matching wine', {
            type: $(this).attr('href').replace('#', '')
        });

        events.push({
            type: 'matchingWine',
            name: $(this).attr('href').replace('#', '')
        });

        $('#matching-wine').hide();
    });

    $('.back').click(function (e) {
        e.preventDefault();
        $('.tab.active').last().removeClass('active');
    });

    $(document).on('click', '.prefs-list li a', function (e) {
        e.preventDefault();
        $('.order-panel').scrollTop(0);

        if ($(this).closest('ul').attr('id') == 'occasion-list') {
            setOccasion(this);
        }

        analytics.track('Matching selected', {
            selection: $(this).parent().attr('id')
        });
    });

    var setFood = function () {

        clearFood();//??

        $('.prefs-overview-list li').each(function (i, el) {
            if (!$(this).hasClass('empty')) {
                wines[wineCount].food.push(
                    new food(
                        $(this).find('img').first().attr('id').split('-')[2],
                        $(this).find('.food-name').text(),
                        $(this).find('.prep-name').text(),
                        $(this).find('.prep-name-text').text()
                    )
                );
            }
        });

        wines[wineCount].complete = true;

        clearOccasion();
        clearSpecificWine()
    };

    var setOccasion = function (element) {

        wines[wineCount].occasion = $(element).parent().attr('id').split('-')[1];
        wines[wineCount].occasionName = $(element).find('span').text();

        wines[wineCount].complete = true;

        clearFood();
        clearSpecificWine();
    };

    var setSpecificWine = function (element) {

        wines[wineCount].specificWine = $('input[name="specific-wine"]').val();

        wines[wineCount].complete = true;

        clearFood();
        clearOccasion();
    };

    var clearFood = function () {
        if (wines[wineCount]) {
            wines[wineCount].food = [];
        }
    };

    var clearOccasion = function () {
        wines[wineCount].occasion = null;
        wines[wineCount].occasionName = null;
        wines[wineCount].wineType.id = 0;
        wines[wineCount].wineType.name = null;
    };

    var clearSpecificWine = function () {
        wines[wineCount].specificWine = null;
    };

    $(document).on('click', '.prefs-list-bottom li a', function (e) {
        e.preventDefault();

        var $this = $(this);
        var id = $this.parent().attr('id').split('-')[1];
        var name = $this.parent().find('span').text();

        if ($this.attr('href') == '#preparation') {
            parentid = $this.parent().attr('id').split('-')[1];
        }

        if (!$this.parent().hasClass('selected')) {

            if ($this.closest('.tab').attr('id') == 'preparation') {
                var $img = $this.find('img').clone();
                var prepID = $this.closest('li').attr('id').split('-')[1];
                var prepName = $(this).find('span').text();
                $('#food-item-' + parentid).after($img.addClass('food-prep').attr('id', parentid));
                $('#food-item-' + parentid).closest('li').append($('<span/>', {text: prepID}).addClass('prep-name'));
                $('#food-item-' + parentid).closest('li').append($('<span/>', {text: prepName}).addClass('prep-name-text'));
            } else if ($this.closest('ul').attr('id') == 'wine-list') {
                //Add the food to the wine object
                wines[wineCount].wineType.id = id;
                wines[wineCount].wineType.name = name;
            } else {
                //Add the food to our mini review bar at the bottom
                var $img = $this.find('img').clone();
                $img.attr('id', 'food-item-' + id);
                var $empty = $('.prefs-overview-list .empty').first();
                $empty.find('span').replaceWith($img);
                $empty.append($('<span/>', {text: name}).addClass('food-name')).removeClass('empty');

                $this.parent().addClass('selected');
            }

            var numberOfNotSelectedFoodCategories = $('.prefs-overview-list').find('.empty').length;
            var $foodCategoryText = $('#food-category');

            if (numberOfNotSelectedFoodCategories < 3) {
                $('#select-preferences').show();
            }

            switch (numberOfNotSelectedFoodCategories) {
                case 3:
                    $foodCategoryText.text('a');
                    break;
                case 2:
                    $foodCategoryText.text('second');
                    break;
                case 1:
                    $foodCategoryText.text('third');
                    break;
            }

            if (numberOfNotSelectedFoodCategories == 0 && $this.attr('href') != '#preparation') {
                $('.food-limit').show();
                $foodCategoryText.text('a');
            }

            $this.closest('.tab').removeClass('active');

            if ($('.tab.preferences-sub-sub-panel.active').length === 0) {
                $('.main-preferences').show();
            }

            if ($this.closest('ul').attr('id') == 'wine-list') {
                orderSwiper.swipeNext();
                createCartPage(wines, wineCount);
            }

        } else {
            $this.parent().removeClass('selected');
            $('#food-item-' + id).closest('li').addClass('empty').empty().append('<a href=""><span>+</span></a>');
            $('#food-' + $this.parent().attr('id')).removeClass('selected');
        }

    });

    $(document).on('click', '.prefs-overview-list li a', function (e) {
        e.preventDefault();
        $this = $(this);
        if ($this.hasClass('empty')) {
            $('prefs-list-bottom').closest('.tab').removeClass('active');
        } else {
            $foodid = $this.find('img').attr('id').split('-');
            $('#food-' + $foodid[2]).removeClass('selected');
            $('.food-limit').hide();
            $this.parent().addClass('empty').empty().append('<a href=""><span>+</span></a>');
        }

        var numberNotSelectedFoods = $('.prefs-overview-list').find('.empty').length;
        var $foodCategoryText = $('#food-category');

        switch (numberNotSelectedFoods) {
            case 3:
                $foodCategoryText.text('a');
                break;
            case 2:
                $foodCategoryText.text('second');
                break;
            case 1:
                $foodCategoryText.text('third');
                break;
        }

        if (numberNotSelectedFoods === 3) {
            $('#select-preferences').hide();
        }
    });

    /***
     * Done with food or occasion preferences selection. Moving to order review.
     * */
    $('#select-preferences').click(function (e) {
        e.preventDefault();

        setFood();

        createCartPage(wines, wineCount);
    });

    /***
     * Done with specific wine selection. Moving to order review.
     * */
    $('#specific-wine').click(function (e) {
        e.preventDefault();

        if ($('input[name="specific-wine"]').val() != '') {
            setSpecificWine();

            analytics.track('Matching wine', {
                type: 'Specific wine',
                text: wines[wineCount].specificWine
            });

            createCartPage(wines, wineCount);
            $('#specific-wine-errors').empty().hide();
            orderSwiper.swipeNext();
        } else {
            $('#specific-wine-errors').empty().show().append('<li>Please enter wine name</li>');
        }

    });

    $(document).on('click', '#account-link', function (e) {
        e.preventDefault();
        if ($('#account-form').hasClass('register-form')) {
            $('#account-form').removeClass().addClass('signin-form');
            $('.account-heading').text('Sign In');
            $('.account-message').html('Don\'t have an account? <a href="" id="account-link" class="register-link">Register</a>');
            $('input[name="user[first_name]"], input[name="user[last_name]"], input[name="user[mobile]"], input[name="user[password_confirmation]"]').hide();
        } else {
            $('#account-form').removeClass().addClass('register-form');
            $('.account-heading').text('Register');
            $('.account-message').html('Have an account? <a href="" id="account-link" class="signin-link">Sign In</a>');
            $('input[name="user[first_name]"], input[name="user[last_name]"], input[name="user[mobile]"], input[name="user[password_confirmation]"]').show();
        }
    });

    /* Delivery Details */

    $('#delivery-details').click(function (e) {

        e.preventDefault();

        var $orderCard = $('#orderCard');

        var first_name = $('input[name="user[first_name]"]').val();
        var last_name = $('input[name="user[last_name]"]').val();
        var email = $('input[name="user[email]"]').val();
        var password = $('input[name="user[password]"]').val();

        if ($('#account-form').hasClass('register-form')) {

            $.ajax({
                type: "POST",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').last().attr('content'))
                },
                url: '/signup/create',
                data: {
                    'user[first_name]': first_name,
                    'user[last_name]': last_name,
                    'user[email]': email,
                    'user[password]': password
                },
                error: function (data) {
                    //Response
                    var error = '';
                    var errors = data.responseJSON.errors;
                    if (errors) {
                        error = errors.join(', ');
                        var $errorList = $('#sign-in-errors');
                        $errorList.empty().show();
                        errors.forEach(function (error) {
                            $errorList.append('<li>' + error + '</li>');
                        });
                    }

                },
                success: function (data) {
                    analytics.track('New user', {
                        name: first_name,
                        email: email
                    });

                    analytics.identify(data.id, {
                        name: data.first_name,
                        email: data.email
                    });

                    userEstablished = true;

                    orderSwiper.swipeNext();
                }
            });

        } else if ($('#account-form').hasClass('signin-form')) {

            $.ajax({
                type: "POST",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').last().attr('content'))
                },
                url: '/users/sign_in.json',
                data: {
                    'user[email]': email,
                    'user[password]': password
                },
                error: function (data) {
                    //TODO: Log this

                    var $errorList = $('#sign-in-errors');
                    $errorList.empty().show();
                    $errorList.append('<li>There was an error communicating with the server. Please try again.</li>');
                    console.log(data);
                },
                success: function (data) {
                    if (data.success) {
                        $('meta[name="csrf-token"]').last().prop("content", data.csrfToken);
                        $('input[name="authenticity_token"]').last().val(data.csrfToken);
                        var initialPostCode = $('#filterPostcode').val();
                        var foundSavedAddress = false;
                        var $select = $('#order-address');
                        if (data.addresses && data.addresses.length > 0) {
                            var addresses = data.addresses;
                            for (var i = 0; i < addresses.length; i++) {
                                var address = addresses[i];
                                var fullAddress = address.line_1 + ' ' + address.postcode;

                                if (address.postcode.match(initialPostCode) && address.postcode.match(initialPostCode).length > 0 && !foundSavedAddress) {
                                    $select.append('<option value=' + address.id + ' selected="selected">' + fullAddress + '</option>');
                                    foundSavedAddress = true;
                                } else {
                                    $select.append('<option value=' + address.id + '>' + fullAddress + '</option>');
                                }
                            }
                            if (foundSavedAddress) {
                                $('#new_delivery_address').fadeOut();
                            }
                        }
                        if (data.payments && data.payments.length > 0) {
                            var payments = data.payments;
                            $orderCard.show();

                            $('#new_card').hide();
                            for (var i = 0; i < payments.length; i++) {
                                var payment = payments[i];
                                var cardNumber;
                                if (payment.brand == 3) { // American Express
                                    cardNumber = '**** ****** ' + payment.number;
                                } else {
                                    cardNumber = '**** **** **** ' + payment.number;
                                }

                                if (i === 0) {
                                    $orderCard.append('<option value=' + payment.id + ' selected="selected">' + cardNumber + '</option>');
                                    $('#old-card').val(payment.id);
                                } else {
                                    $orderCard.append('<option value=' + payment.id + '>' + cardNumber + '</option>');
                                }
                            }
                        } else {

                        }

                        analytics.track('User sign in', {
                            status: 'successfull',
                            email: email
                        });

                        analytics.identify(data.user.id, {
                            name: data.user.first_name,
                            email: data.user.email
                        });

                        userEstablished = true;

                        orderSwiper.swipeNext();
                    } else {

                        var errors = data.errors;
                        if (errors) {
                            var $errorList = $('#sign-in-errors');
                            $errorList.empty().show();
                            errors.forEach(function (error) {
                                $errorList.append('<li>' + error + '</li>');
                            });
                        }

                        analytics.track('User sign in', {
                            status: 'error',
                            errors: errors.join(', '),
                            email: email
                        });
                    }

                }
            });
        }

    });


    /* Address Details */

    $('#address-details').click(function (e) {

        e.preventDefault();

        var address = {
            address_line_1: $('#addr-line-1').val(),
            address_line_2: $('#addr-line-2').val(),
            address_lat: $('#addr-lat').val(),
            address_lng: $('#addr-lng').val(),
            company_name: $('#addr-company-name').val(),
            address_p: $('#addr-pc').val(),
            mobile: $('#mobile').val(),
            address_id: $('#address-id').val(),
            new_address: $('#new-address').val()
        };

        if (address.address_lat === "" || address.address_lng === "") {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': 'London+' + address.address_line_1 + '+' + address.address_line_2 + '+UK'}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    address.address_lat = results[0].geometry.location.lat();
                    address.address_lng = results[0].geometry.location.lng();

                }
                createAddress(address);
            });

        } else {
            createAddress(address);
        }
    });

    var createAddress = function (address) {

        var $errorList = $('#address-errors');

        $.ajax({
            type: "POST",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').last().attr('content'))
            },
            url: '/signup/address',
            data: {
                address_line_1: address.address_line_1,
                address_line_2: address.address_line_2,
                company_name: address.company_name,
                address_p: address.address_p,
                mobile: address.mobile,
                address_id: address.address_id,
                new_address: address.new_address,
                address_lat: address.address_lat,
                address_lng: address.address_lng
            },
            error: function (data) {

                $errorList.empty().show();

                if (data.responseJSON) {
                    var errors = data.responseJSON.errors;
                    if (errors) {
                        errors.forEach(function (error) {
                            $errorList.append('<li>' + error + '</li>');
                        });
                    }

                    analytics.track('Address error', {
                        status: 'error',
                        errors: errors.join(', ')
                    });
                } else {
                    if (data.status && data.statusText)
                        analytics.track('Address error', {
                            status: data.status,
                            errors: data.statusText
                        });

                    $errorList.append('<li>We apologise. There was a server error.</li>');
                }

            },
            success: function (data) {

                $errorList.empty().hide();

                if (address.address_id !== '' && address.address_id !== '0') {
                    analytics.track('Address updated', {
                        address_street: address.address_line_1,
                        address_postcode: address.address_p,
                        mobile: address.mobile,
                        id: data.id
                    });
                } else {
                    analytics.track('Address created', {
                        address_street: address.address_line_1,
                        address_postcode: address.address_p,
                        mobile: address.mobile,
                        id: data.id
                    });
                }
                $('#address-id').val(data.id);

                orderSwiper.swipeNext();
            }
        });
    };

    /**
     * Lookup valid addresses for a post code
     */
    var verifyAddress = function () {

        if ($('#address-id').val() === 0 || $('#address-id').val() === '') {
            var initialPostCode = $('#addr-pc').val();

            //Preselect existing address for logged-in users
            var existingAddresses = $('#order-address').find('option');
            if (existingAddresses.length > 2) {
                var foundSavedAddress = false;
                existingAddresses.filter(function () {
                    if ($(this).text().match(initialPostCode) && !foundSavedAddress) {
                        foundSavedAddress = true;
                        $('#address-id').val($(this).val());
                        $('#new_delivery_address').fadeOut();
                        $('#order-address').show();
                        $('#new-address').val(false);
                        $('#addr-line-1').val('');
                        return true;
                    }
                }).prop('selected', true);

                if (!foundSavedAddress) {
                    postCodeLookup(initialPostCode);
                }
            } else {
                $('#order-address').hide();
                //Pre-fill addresses available for that postcode
                postCodeLookup(initialPostCode);
            }
        }
    };

});

var matchedAddresses = {};

var postCodeLookup = function (postcode) {

    $('#suggested-addresses').val(0);

    if ($('#suggested-addresses').find('option').length > 1) {
        return;
    }

    var line_1 = $('#addr-line-1');
    var line_2 = $('#addr-line-2');
    var addrLat = $('#addr-lat');
    var addrLng = $('#addr-lng');
    var companyName = $('#addr-company-name');

    var apiUrl = 'https://api.ideal-postcodes.co.uk/v1/postcodes/' + postcode;

    $.get(apiUrl,
        {
            api_key: 'ak_i1kkwsp8EIoMBD8vWt8q9NZSG74De'
        },
        function (data) {
            if (data.code === 2000) {

                matchedAddresses = data.result;

                $.each(matchedAddresses, function (key, value) {

                    var address = value.line_1;

                    if (value.line_2) {
                        address = address + ', ' + value.line_2;
                    }

                    if (value.line_3) {
                        address = address + ', ' + value.line_3;
                    }

                    $('#suggested-addresses')
                        .append($("<option></option>")
                            .attr("value", value.udprn)
                            .text(address));
                });

                $('#suggested-addresses').change(function () {
                    $("#suggested-addresses").find("option:selected").each(function () {

                        var udprn = this.value;
                        var idealAddress;

                        for (var i = 0; i < matchedAddresses.length; i++) {
                            if (matchedAddresses[i].udprn.toString() === udprn) {
                                idealAddress = matchedAddresses[i];
                                break;
                            }
                        }

                        if (idealAddress) {

                            if (idealAddress.organisation_name.trim().toLowerCase() == idealAddress.line_1.trim().toLowerCase()) {
                                companyName.val(idealAddress.organisation_name);
                                line_1.val(idealAddress.line_2);
                                line_2.val(idealAddress.line_3);
                            } else {
                                line_1.val(idealAddress.line_1);
                                var line2 = idealAddress.line_2;
                                if (idealAddress.line_3.length > 0) {
                                    line2 += ', ' + idealAddress.line_3;
                                }
                                line_2.val(line2);
                            }

                            addrLat.val(idealAddress.latitude);
                            addrLng.val(idealAddress.longitude)

                        } else {
                            line_1.val('');
                            line_2.val('');
                            companyName.val('');
                            addrLat.val('');
                            addrLng.val('')
                        }
                    });
                });

            } else {
                console.log(data);
            }
        });
};

//TODO: Remove almost all code here
function createCartPage(wines, wineCount) {

    clearPreferences();
    renderCart(wines);
    secondBottle = false;
    var bottlesInTheCart = wines.length;
    $('.cart-count').show().text(bottlesInTheCart);
    updateOrderSummary();
    $('input[name="wines"]').val(JSON.stringify(wines));
    $.cookie('wines', JSON.stringify(wines), { path: '/' });

}

var clearPreferences = function () {
    $('.tab').removeClass('active');
    $('.food-limit, .occasion-limit').hide();
    $('.prefs-list li').removeClass('selected');
    $('.prefs-overview-list li').empty().append('<a href=""><span>+</span></a>').removeClass('empty').addClass('empty');
    $('input[name="specific-wine"]').val('');
    $('#matching-wine').show();
    $('.main-preferences').show();
    $('#select-preferences').hide();
    cleanupEvents();
};

var cleanupEvents = function () {
    for (var i = 0; i < events.length; i++) {
        if (events[i].type == 'matchingWine') {
            events.splice(i, 1);
        }
    }
};

var resetEventsForEmptyCart = function () {
    events = [];

    events.push({
        type: 'slideChange',
        name: '0'
    });
};

var slidesArray = [
    'bottles-panel',
    'preferences-panel',
    'review-panel',
    'register-panel',
    'delivery-panel',
    'payment-panel'
];

var currentSlidePosition = function () {
    var currentSlide = currentSlideName();
    if (currentSlide === '') {
        return 0;
    } else {
        return slidesArray.indexOf(currentSlide);
    }
};

var currentSlideName = function () {
    if (typeof(orderSwiper) === "undefined") {
        return '';
    } else {
        return orderSwiper.activeSlide().id;
    }
};

var $check = $('<i>').addClass('fa fa-check-square-o');

var updateOrderSummary = function () {
    var $orderSummary = $('.order-summary');
    var $unCheck = $('<i>').addClass('fa fa-square-o');
    var $step = $('<div>').addClass('order-summary-note-section');
    var $top = $('<div>').addClass('top');
    var $middle = $('<div>').addClass('middle');
    var $bottom = $('<div>').addClass('bottom');
    var $now = $('<div>').addClass('now-image');

    /**
     * Heading
     */
    var $orderSummaryHeading = $('<div>').addClass('order-summary-heading');
    $orderSummaryHeading.text('Order Summary');
    $top.append($orderSummaryHeading);

    /**
     * Delivery Summary
     */
    var postcode = $('#filterPostcode').val();
    var slotDate = $('#slot_date').val();
    var slotFrom = $('#slot_from').val();
    var slotTo = $('#slot_to').val();
    var deliveryText = ' Delivery to ' + postcode;

    if (slotDate) {
        deliveryText += ' - ' + moment(slotDate).format('dddd MMMM Do') +
        ' between ' + moment(slotDate + ' ' + slotFrom).format('h:mm a') + ' and ' +
        moment(slotDate + ' ' + slotTo).format('h:mm a');
    } else {
        deliveryText += ' - ASAP'
    }

    deliveryText += ' ';

    var $deliverySummary = $('<div>').addClass('order-summary-major-section');
    var $deliveryText = $check.clone().text(deliveryText);

    $deliveryText.append($('<a>')
        .attr({
            href: '/availability?postcode=' + postcode.replace(' ', '+'),
            'data-no-turbolink': 'true'
        })
        .addClass('change-delivery')
        .text('(change delivery)'));
    $deliverySummary.append($('<div>').append($deliveryText));
    $middle.append($deliverySummary);

    promoSummary($deliverySummary);
    selectedBottlesSummary($deliverySummary);

    /**
     * Bottle selection
     */
    var $bottleSelectionHeading = $('<div>').addClass('order-summary-major-section center');
    $bottleSelectionHeading.text(' Select Preferences');

    var chooseBottleText = ' Choose bottle price range';
    var choosePreferencesText = ' Choose preferences - the merchant will match best wine based on these';
    var $chooseBottleSection;
    var $choosePreferencesSection;

    if (wines.length == 0 || wines.length == 1 && secondBottle) {
        $chooseBottleSection = $unCheck.clone()
            .text(chooseBottleText).append($now);
    } else {
        $chooseBottleSection = $check.clone()
            .text(chooseBottleText);
    }

    if (wines.length > 0 && arePreferencesSelected(wines[0]) && !secondBottle) {
        $choosePreferencesSection = $check.clone()
            .text(choosePreferencesText);
    } else {
        $choosePreferencesSection = $unCheck.clone()
            .text(choosePreferencesText);
    }

    if ((wines.length > 0 && !arePreferencesSelected(wines[0])) || (secondBottle && wines.length > 1 && !arePreferencesSelected(wines[1]))) {
        $choosePreferencesSection.append($now);
    }

    $bottleSelectionHeading.append(
        $step.clone()
            .append($chooseBottleSection));

    $bottleSelectionHeading.append(
        $step.clone()
            .append($choosePreferencesSection));


    $middle.append($bottleSelectionHeading);

    /**
     * Order confirmation
     */

    var confirmSelectionText = ' Review your choices';
    var confirmDeliveryText = ' Confirm delivery address';

    if (currentSlidePosition() >= 2) {
        var $confirmationSelectionHeading = $('<div>').addClass('order-summary-major-section center');

        $confirmationSelectionHeading.text('Confirm Order');

        if (currentSlidePosition() <= 2) { //Check
            $confirmationSelectionHeading.append(
                $step.clone()
                    .append($unCheck.clone()
                        .text(confirmSelectionText).append($now))
            );
        } else { //Un-Check
            $confirmationSelectionHeading.append(
                $step.clone()
                    .append($check.clone()
                        .text(confirmSelectionText))
            );
        }

        if (currentSlidePosition() <= 4) { //Un-Check
            $confirmationSelectionHeading.append(
                $step.clone()
                    .append($unCheck.clone()
                        .text(confirmDeliveryText).append(currentSlideName() === 'delivery-panel' ? $now : ''))
            );
        } else { //Check
            $confirmationSelectionHeading.append(
                $step.clone()
                    .append($check.clone()
                        .text(confirmDeliveryText))
            );
        }

        var paymentText = ' Enter payment details (you won\'t be charged until you\'re notified of merchant\'s selection)';

        $confirmationSelectionHeading.append( //Always Un-Check
            $step.clone()
                .append($unCheck.clone()
                    .text(paymentText).append(currentSlideName() === 'payment-panel' ? $now : ''))
        );

        $middle.append($confirmationSelectionHeading);


        /**
         * Whats next
         */

        var $whatsNextHeading = $('<div>').addClass('order-summary-heading center');
        $whatsNextHeading.text('What\'s next');

        $middle.append($whatsNextHeading);

        var $whatsNextSelection = $('<div>').addClass('order-summary-major-section');

        $whatsNextSelection.append(
            $step.clone()
                .append($unCheck.clone()
                    .text(' Merchant expert chooses wine based on your preferences'))
        );

        $whatsNextSelection.append(
            $step.clone()
                .append($unCheck.clone()
                    .text(' You confirm merchants\'s selection'))
        );

        $whatsNextSelection.append(
            $step.clone()
                .append($unCheck.clone()
                    .text(' Wine delivered to your door'))
        );

        $middle.append($whatsNextSelection);
    }

    /**
     * Show summary
     */
    $orderSummary.empty();
    $orderSummary.append($top);
    $orderSummary.append($middle);
    $orderSummary.append($bottom);
    $orderSummary.show();

};

var selectedBottlesSummary = function ($deliverySummary) {

    var $selectedBottlesSummary = [];

    if (wines.length > 0) {

        $selectedBottlesSummary.push($('<div>').addClass('center').append($('<strong>').text('Wines Selected')));

        wines.forEach(function (wine) {
            var $summary = $('<div>').text(wineSummary(wine));
            $selectedBottlesSummary.push($summary)
        });
    }

    $deliverySummary.append($selectedBottlesSummary);
};

var promoSummary = function ($deliverySummary) {

    var promo = JSON.parse($('#promotion').val());

    if (promo.title !== '') {
        $deliverySummary.append($('<div>').append('<i>').addClass('fa fa-gift').text(' Promotion: ' + promo.title + ' - ' + promo.description));
    }
};

var wineSummary = function (wine) {
    var summary = [];

    if (wine.quantity) {
        summary.push(wine.quantity + 'x')
    }

    if (wine.label) {
        summary.push(wine.label);
    }

    if (wine.occasionName) {
        summary.push(wine.occasionName);
    }

    if (wine.food.length > 0) {
        wine.food.forEach(function (food) {
            summary.push(food.name + (food.preparationName ? ' (' + food.preparationName + ')' : ''));
        });
    }

    if (wine.wineType && wine.wineType.name) {
        summary.push(wine.wineType.name);
    }

    if (wine.specificWine) {
        summary.push(wine.specificWine);
    }

    return summary.join(', ');
};

var arePreferencesSelected = function (wine) {
    if (wine && wine.food.length > 0 || wine.occasion !== 0 || wine.specificWine !== '') {
        return true;
    } else {
        return false;
    }
};

var checkPromotions = function () {
    var newCardForm = $('#new_card');
    var promotionArea = $('#promotion-payment');
    var orderCard = $('#orderCard');

    if (free) {
        newCardForm.hide();
        orderCard.hide();
        promotionArea.show();
    } else {

        promotionArea.hide();

        if ($('#orderCard').find('option').length > 1) {
            newCardForm.hide();
            orderCard.show();
        }
        else {
            newCardForm.show();
            orderCard.hide();
        }
    }
};