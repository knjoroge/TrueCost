// ==UserScript==
// @name         True Cost
// @namespace    http://github.com/truecost4env/
// @version      0.1
// @description  Display true cost of product and allow user to offset environmental impacts
// @author       True Cost
// @match        http*://www.amazon.com*/dp/*
// @match        http*://www.amazon.com*/gp/*
// @match        http*://www.amazon.com*/huc/*
// @match        http*://www.amazon.com*/buy/*
// @require      https://raw.githubusercontent.com/truecost4env/truecost-chrome-extension/master/products.json
// @require      https://code.jquery.com/jquery-2.2.2.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/accounting.js/0.4.1/accounting.min.js
// @resource css https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function() {
  'use strict';

  // Insert custom CSS
  var css = GM_getResourceText("css");
  GM_addStyle(css);

  GM_addStyle("" + <><![CDATA[
    .fa-ico {
      font-size: 20px;
      height: 20px;
      padding: 10px 30px 0 40px;
      width: 20px;
    }

    .product-impact {
      margin-bottom: 20px;
    }
  ]]></>);

  var isProductPage = /\/[dg]p\//.test(location.href),
      isAddToCartPage = /\/huc\//.test(location.href),
      isCheckoutPage = /\/buy\//.test(location.href);

  // Product page
  if(isProductPage){
    // Get cost
    var $cost = $('#priceblock_ourprice'),
        cost = accounting.unformat($cost.text()),
        trueCost = cost + 10.0,
        costDifference = trueCost - cost,
        $addToCart = $('#add-to-cart-button').closest('.a-button-stack'),
        asin = $('#ASIN').val(),
        product = products.shoes[asin] || products.shoes['B002RP8YH2'];

    var $icoCarbon = $('<i/>').addClass('fa-ico fa fa-cloud'),
        $icoEnergy = $('<i/>').addClass('fa-ico fa fa-bolt'),
        $icoWaste = $('<i/>').addClass('fa-ico fa fa-trash-o'),
        $icoWater = $('<i/>').addClass('fa-ico fa fa-globe'),
        $icoChem = $('<i/>').addClass('fa-ico fa fa-flask');

    var productCarbon = product.greenhouse_footprint,
        productEnergy = product.energy_footprint,
        productChem = product.chemistry_footprint,
        productWater = product.water_footprint,
        productWaste = product.waste_footprint;

    var $valCarbon = $('<span/>').text(productCarbon.value + ' ' + productCarbon.unit),
        $valEnergy = $('<span/>').text(productEnergy.value + ' ' + productEnergy.unit),
        $valWater = $('<span/>').text(productWater.value + ' ' + productWater.unit),
        $valChem = $('<span/>').text(productChem.value + ' ' + productChem.unit),
        $valWaste = $('<span/>').text(productWaste.value + ' ' + productWaste.unit);

    var $carbon = $('<div/>')
          .append($icoCarbon)
          .append($valCarbon),
        $energy = $('<div/>')
          .append($icoEnergy)
          .append($valEnergy),
        $water = $('<div/>')
          .append($icoWater)
          .append($valWater),
        $waste = $('<div/>')
          .append($icoWaste)
          .append($valWaste),
        $chem = $('<div/>')
          .append($icoChem)
          .append($valChem);

    var $trueCost = $('<div/>')
      .text("True Cost: " + accounting.formatMoney(trueCost))
      .addClass('a-size-medium')
      .css('color', 'green')
      .css('padding', '0 10px');

    var $productImpact = $('<div/>')
      .text("Product Impact")
      .addClass('a-size-medium')
      .css('color', 'green')
      .css('padding', '10px 35px 0');

    var $checkbox = $('<label/>')
      .text('Donate ' + accounting.formatMoney(costDifference) + ' to help offset environmental impacts')
      .prepend($('<input/>')
        .attr('type', 'checkbox')
        .css('float', 'left')
        .css('margin', '0 8px 25px 5px')
      );

    var $footprint = $('<div/>')
      .addClass('product-impact')
      .append($carbon)
      .append($energy)
      .append($waste)
      .append($water)
      .append($chem);

    var $wrapper = $('<div/>')
      .append($checkbox)
      .append($productImpact)
      .append($footprint);

    $addToCart.after($wrapper);

  // Add Product To Cart page
  }else if(isAddToCartPage){
    console.log('added product to cart');

    var totalCostOutput = "<![CDATA[<span class='a-size-medium a-align-center huc-subtotal'>";
    totalCostOutput += "<span><b>Offset subtotal</b> (1 items): </span>";
    totalCostOutput += "<span class='a-color-price hlb-price a-inline-block a-text-bold'>$10</span>";
    totalCostOutput += "</span>";
    
    var $carOutput = $("#hlb-subcart .a-row:last-child").html(totalCostOutput);

  // Checkout page
  }else if(isCheckoutPage){
    console.log('checkout page');
  }
})();
