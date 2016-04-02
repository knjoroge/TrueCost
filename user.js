// ==UserScript==
// @name         True Cost
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Display true cost of product
// @author       True Cost
// @match        http*://www.amazon.com/dp/B016CDOPAO/*
// @require      https://code.jquery.com/jquery-2.2.2.min.js
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  var $price = $('#priceblock_ourprice');
  var $realPrice = $('<span/>')
    .text('$50.00')
    .addClass('a-size-medium')
    .css('color', 'green')
    .css('padding', '0 10px');

  $price
    .css('text-decoration', 'line-through')
    .after($realPrice);
})();
