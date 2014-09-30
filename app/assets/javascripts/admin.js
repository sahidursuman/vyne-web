//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require library
//= require jquery.typewatch
var advisor = advisor || null;
var addNestedField = function($anchorNode, parentEntity, nestedEntity, fieldName) {
    // $parentNode
    // parentEntity
    // nestedEntity
    // fieldName
    // id="wine_compositions_attributes_1_grape"
    // name="wine[compositions_attributes][1][grape]"

    // .before() – Inserts content outside and before.
    // .prepend() - Inserts content inside and before.
    // .after() – Inserts content outside and after.
    // .append() – Inserts content inside and after.
    var newId, newNm;
    var lastSum = parseInt($anchorNode.data('lastSum')) || 0;
    var fields = fieldName.split(",");
    for (var i = 0; i < fields.length; i++) {
        newId = parentEntity + '_' + nestedEntity + '_attributes_' + lastSum + '_' + fields[i];
        newNm = parentEntity + '[' + nestedEntity + '_attributes][' + lastSum + '][' + fields[i] + ']';
        $anchorNode.parent().append(
            $('<div>', { 'class':'field' }).append(
                $('<label>', { 'for': newId }).html(fields[i].capitalise()),
                $('<br>'),
                $('<input>', { 'id': newId, 'name': newNm, 'type': 'text' })
            )
        );
    }
    $anchorNode.data('lastSum', lastSum+1);
};

var adminReady = function() {
    console.log('ADMIN JS');
    // console.log('Doc is apparently ready');
    if (typeof(admin) !== 'undefined' && admin !== null && admin === true) {
        var tokenFields = ["occasion", "food", "note"];
        for (var i = 0; i < tokenFields.length; i++) {
            $("#wine_" + tokenFields[i] + "_tokens").tokenInput("/admin/" + tokenFields[i] + "s.json", {
                crossDomain: false,
                prePopulate: $("#wine_" + tokenFields[i] + "_tokens").data("pre"),
                theme: 'facebook'
            });
        }
        $('.add_nested_field').click(function(e){
            e.preventDefault();
            console.log('Generating field',
                $(this).data('parentEntity'),
                $(this).data('nestedEntity'),
                $(this).data('fieldName')
            );
            // var $parentNode = $(this).parent();
            addNestedField($(this), $(this).data('parentEntity'), $(this).data('nestedEntity'), $(this).data('fieldName'));
            // $parentNode.css('background', 'red');
        });



        //****************************
        // Advisor area






        String.prototype.trim    = function(){return this.replace(/^\s+|\s+$/g, '');};
        String.prototype.ltrim   = function(){return this.replace(/^\s+/,'');};
        String.prototype.rtrim   = function(){return this.replace(/\s+$/,'');};
        String.prototype.fulltrim= function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};

        token = $('meta[name="csrf-token"]').attr('content');


        var chooseWine = function(e) {
            e.preventDefault();
            var wine = parseInt($(this).closest('tr').data('id'));
            var order = parseInt($('#order_id').val());
            var warehouse = parseInt($('#warehouse_id').val());
            var data = {
                'wine':wine,
                'order':order,
                'warehouse':warehouse
            };
            console.log('chosen! ',data);
            alert('Line 89');
        };

        var renderWine = function(wine) {
            console.log('rendering wine', wine);
            var $container = $('#wine-list>table>tbody');
            // var types = [];
            // for (var i = 0, type; type = wine.type[i++];) {
            //     types.push(type.name);
            // }

            var basePrice = 0;
            var basePriceWarehouse = 0;
            var basePriceQuantity = 0;
            var multiplePrices = wine.availability.length > 1 ? '+' : ''
            for (var i = 0, availability; availability = wine.availability[i++];) {
                if (availability.quantity > 0) {
                    if (availability.price < basePrice || basePrice === 0) {
                        basePrice = availability.price;
                        basePriceQuantity = availability.quantity;
                        basePriceWarehouse = availability.warehouse;
                    }
                }
            }

            if (basePrice === 0) return;

            var compositionArray = [];
            for (var i = 0, composition; composition = wine.compositions[i++];) {
                compositionArray.push(composition.name + ': ' + composition.quantity + '%');
            }

            var $se, $vg, $vn, $og;

            if (wine.single_estate)
                $se = $('<span>').addClass('single flaticon solid house-2');
            if (wine.vegetarian)
                $vg = $('<span>').addClass('vegetarian').html('Vt');
            if (wine.vegan)
                $vn = $('<span>').addClass('vegan').html('Vn');
            if (wine.organic)
                $og = $('<span>').addClass('organic').html('Og');


            $container.append(
                $('<tr>')
                .attr('data-id', wine.id)
                .attr('data-warehouse', basePriceWarehouse)
                .addClass('wine').append(
                    $('<td>').addClass('flag').append(
                        $('<img>')
                            .attr('alt', wine.countryName)
                            .attr('src', "/assets/flags/"+wine.countryCode+".png")
                    ),
                    $('<td>').addClass('subregion').html(wine.subregion),
                    $('<td>').addClass('name').html(
                        wine.name + (wine.appellation ? " ("+wine.appellation+")" : '') +
                        ' ' + wine.vintage
                    ),
                    $('<td>').addClass('type').html(
                        wine.types.join(', ')
                    ),
                    $('<td>').addClass('price').html(
                        '&pound;' + basePrice + multiplePrices
                    ),
                    $('<td>').addClass('composition').html(
                        compositionArray.join(', ')
                    ),
                    $('<td>').addClass('flags').append(
                        $se, $vg, $vn, $og
                    ),
                    $('<td>').addClass('actions').append(
                        $('<a>').attr('href', '#').html('Choose').click(chooseWine)
                    )
                )
            );
        };

        var renderItems = function(r) {
            var $container = $('#wine-list');
            $container.html('');
            $container.append(
                $('<table>').attr('border','1').append(
                    $('<tbody>')
                )
            );
            for (var i = 0, wine; wine = r[i++];) {
                renderWine(wine);
            }
            $container.slideDown(200);                        
        };

        var parseResults = function(r){
            // console.log('okay');
            // console.log(r);
            renderItems(r);
        };
        var errorMethod = function(e){
            console.log('not okay');
        };

        var findKeywords = function(keywords){
            // var token = $('meta[name="csrf-token"]').attr('content');

            var categories = [];
            $.each($('.tick-category'), function() {
                if (this.checked)
                    categories.push(parseInt(this.name.split('-')[2]));
            });

            var data = {
                  'keywords': keywords,
                 'warehouse': $('#warehouse_id').val(),
                    'single': $('#tick-sing').is(':checked'),
                'vegetarian': $('#tick-vegt').is(':checked'),
                     'vegan': $('#tick-vegn').is(':checked'),
                   'organic': $('#tick-orgc').is(':checked'),
                'categories': categories
            };
            console.log('data', data);
            postJSON('advise/results.json', token, data, parseResults, errorMethod);
        };

        var sortKeyWords = function(e){
            $('#wine-list').slideUp(100);
            var keywords = $(this).val().split(',');
            for (var i = keywords.length - 1; i >= 0; i--) {
                keywords[i] = keywords[i].trim();
            }
            findKeywords(keywords.join(' '));
        };

        /**
         * Search field:
         */
        $('.advisor-area>#wine-filters>#search').typeWatch({
                highlight: true,
                     wait: 800,
            captureLength: -1,
                 callback: sortKeyWords
        });

        var renderOrder = function(order) {
            var $container = $('#order-list>table>tbody');
            console.log(order);

            var $adviseAnchor = $('<a>').attr('href', '#').html('Advise');
            var $orderRecoverAnchor = $('<a>').attr('href', '#').html('Return');
            
            $adviseAnchor.click(function(e){
                e.preventDefault();
                var $td = $(this).closest("td");
                var $tr = $td.closest("tr");
                var $siblings = $tr.siblings();
                var warehouse = $tr.data('warehouse');
                var id = $tr.data('id');
                $siblings.removeClass('selected');
                $siblings.hide();
                $('#orders-header').hide();
                $tr.addClass('selected');
                $td.html('');
                $td.append($orderRecoverAnchor);
                // Show search field
                $('#wine-filters').slideDown();
                $('#wine-list').html('').show();
                $('#wine-filters>#search').focus();
                $('#order_id').val(id);
                $('#warehouse_id').val(warehouse);
            });

            $orderRecoverAnchor.click(function(e){
                e.preventDefault();
                var $td = $(this).closest("td");
                var $tr = $td.closest("tr");
                var $siblings = $tr.siblings();
                $('#order_id').val('');
                $('#warehouse_id').val('');
                $tr.removeClass('selected');
                $td.html('');
                $td.append($adviseAnchor);
                $('#wine-list').hide();
                $('#wine-filters').hide();
                $('#orders-header').slideDown();
                $siblings.slideDown();
            });

            $container.append(
                $('<tr>')
                  .addClass('order')
                  .attr("data-warehouse", order.warehouse.id)
                  .attr("data-id", order.id)
                  .append(
                      $('<td>').addClass('client').html(
                          order.client.name
                      ),
                      $('<td>').addClass('postcode').html(
                          order.address.postcode
                      ),
                      $('<td>').addClass('warehouse').html(
                          order.warehouse.title
                      ),
                      $('<td>').addClass('actions').append($adviseAnchor)
                )
            );
        };

        var renderOrders = function(r) {
            // console.log('ro');
            var $container = $('#order-list');
            $container.append(
                $('<table>').attr('border','1').append(
                    $('<tbody>')
                )
            );
            for (var i = 0, order; order = r[i++];) {
                renderOrder(order);
            } 
        };

        var parseOrders = function(r) {
            // console.log(r);
            renderOrders(r);
        };

        if (advisor) {
            postJSON('orders/list.json', token, {'status':[2]}, parseOrders, errorMethod);
        }

        $('#reload-orders').click(function(e){
            e.preventDefault();
            $('#order-list').html('');
            postJSON('orders/list.json', token, {'status':[2]}, parseOrders, errorMethod);
        });



// http://127.0.0.1:3000/admin/advise/results.json

    }
};



// console.log(2);
$(document).ready(adminReady);
$(document).on('page:load', adminReady);
