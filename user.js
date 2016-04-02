// ==UserScript==
// @name         True Cost
// @namespace    http://github.com/truecost4env/
// @version      0.1
// @description  Display true cost of product and allow user to offset environmental impacts
// @author       True Cost
// @match        http*://www.amazon.com/*/dp/*
// @match        http*://www.amazon.com/*/huc/*
// @match        http*://www.amazon.com/*/buy/*
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

  var isProductPage = /\/dp\//.test(location.href),
      isAddToCartPage = /\/huc\//.test(location.href),
      isCheckoutPage = /\/buy\//.test(location.href);

  // Product page
  if(isProductPage){
      // Get cost
      var $cost = $('#priceblock_ourprice'),
          cost = accounting.unformat($cost.text()),
          trueCost = accounting.formatMoney(cost * 2),
          $addToCart = $('#add-to-cart-button').closest('.a-button-stack');

      var $icoCarbon = $('<i/>').addClass('fa fa-cloud'),
          $icoEnergy = $('<i/>').addClass('fa fa-bolt'),
          $icoWaste = $('<i/>').addClass('fa fa-trash-o'),
          $icoChem = $('<i/>').addClass('fa fa-flask');

      var $trueCost = $('<span/>')
      .text("True Cost: " + trueCost)
      .addClass('a-size-medium')
      .css('color', 'green')
      .css('padding', '0 10px');

      $addToCart
          .after($trueCost)
          .after($icoCarbon)
          .after($icoEnergy)
          .after($icoWaste)
          .after($icoChem);

  // Add Product To Cart page
  }else if(isAddToCartPage){
    console.log('added product to cart');

  // Checkout page
  }else if(isCheckoutPage){
    console.log('checkout page');
  }
})();
