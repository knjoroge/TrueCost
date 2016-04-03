// ==UserScript==
// @name         True Cost
// @namespace    http://github.com/truecost4env/
// @version      0.1
// @description  Display true cost of product and allow user to offset environmental impacts
// @author       True Cost
// @match        http*://www.amazon.com/dp/*
// @match        http*://www.amazon.com/*/dp/*
// @match        http*://www.amazon.com/gp/*
// @match        http*://www.amazon.com/*/gp/*
// @match        http*://www.amazon.com/huc/*
// @match        http*://www.amazon.com/*/huc/*
// @match        http*://www.amazon.com/buy/*
// @match        http*://www.amazon.com/*/buy/*
// @require      https://raw.githubusercontent.com/truecost4env/truecost-chrome-extension/master/products.json
// @require      https://code.jquery.com/jquery-2.2.2.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/accounting.js/0.4.1/accounting.min.js
// @resource css https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
  'use strict';

  // Insert custom CSS
  var css = GM_getResourceText("css");
  GM_addStyle(css);

  GM_addStyle(".fa-ico { font-family: FontAwesome !important; font-size: 20px; height: 20px; padding: 10px 30px 0 26px; width: 20px; }");
  GM_addStyle(".input-checkbox-true-cost { float: left; margin: 0 10px 30px 0; }");
  GM_addStyle(".label-donate { font-size: 14px }");
  GM_addStyle(".product-impact { margin-bottom: 10px; }");
  GM_addStyle(".product-impact-header { color: green; padding: 10px 25px 0; }");
  GM_addStyle(".true-cost { background-color: #E5F3FF; border: 1px solid #BBB; border-radius: 3px; margin: 10px 0 20px; padding: 8px; }");
  GM_addStyle(".color-green { color: Green; }");
  GM_addStyle(".add-to-cart-margin{ margin: 0px 0 5px; }");

  var isProductPage = /\/[dg]p\//.test(location.href),
      isAddToCartPage = /\/huc\//.test(location.href),
      isCheckoutPage = /\/buy\//.test(location.href);

  // Find product by ASIN from products JSON
  function findProductByAsin(asin){
    var product = products[(asin || '').toUpperCase()],
        defaultProduct = {};

    if(product){
      console.log('found product', product.name, product);
    } else {
      defaultProduct = products.B002RP8YH2;
      console.log('did not find product for', asin, 'defaulting to', defaultProduct);
    }

    return product || defaultProduct;
  }

  // Get last donation amount
  function getLastDonation(){
    return GM_getValue('lastDonation');
  }

  // Set last donation amount
  function setLastDonation(cost){
    GM_setValue('lastDonation', cost);
  }

  // When AJAX changes Add to Cart section
  function timedAddTrueCostView(){
    setTimeout(addTrueCostView, 1000);
  }

  // Find product recommendations by category
  function findProductRecommendations(product){
    var productCategory = product.category,
        arrProducts = [];

    console.log('category', productCategory);

    $.each(products, function(key, obj){
      console.log(key, obj, obj.category);
      if(obj.name != product.name && obj.category == productCategory) arrProducts.push(obj);
    });

    return arrProducts;
  }

  // For product page
  function addTrueCostView(){
    console.log('add true cost');

    if(!!$('.true-cost').length) return;

    // Get cost
    var $cost = $('#priceblock_ourprice'),
        cost = accounting.unformat($cost.text()),
        $addToCart = $('#add-to-cart-button, #add-to-cart-button-ubb').closest('.a-button-stack'),
        asin = jQuery('#detailBullets_feature_div').find('span:contains("ASIN"):first').find('span:last').text() || $('#ASIN').val(),
        product = findProductByAsin(asin);

    var $icoCarbon = $('<i/>').addClass('fa-ico fa fa-cloud').attr('title', 'Carbon'),
        $icoEnergy = $('<i/>').addClass('fa-ico fa fa-bolt').attr('title', 'Energy'),
        $icoWaste = $('<i/>').addClass('fa-ico fa fa-trash-o').attr('title', 'Waste'),
        $icoWater = $('<i/>').addClass('fa-ico fa fa-globe').attr('title', 'Water'),
        $icoOzone = $('<i/>').addClass('fa-ico fa fa-circle-o').attr('title', 'Ozone');

    var productCarbon = product.greenhouse_footprint || 0,
        productEnergy = product.energy_footprint || 0,
        productOzone = product.ozone_footprint || 0,
        productWater = product.water_footprint || 0,
        productWaste = product.waste_footprint || 0,
        productCost = product.total_footprint_cost || 0;

    var productRecommendations = findProductRecommendations(product);

    var $valCarbon = productCarbon ? $('<span/>').text(accounting.formatNumber(productCarbon.usage) + ' ' + productCarbon.unit) : '',
        $valEnergy = productEnergy ? $('<span/>').text(accounting.formatNumber(productEnergy.usage) + ' ' + productEnergy.unit) : '',
        $valWater = productWater ? $('<span/>').text(accounting.formatNumber(productWater.usage) + ' ' + productWater.unit) : '',
        $valOzone = productOzone ? $('<span/>').text(accounting.formatNumber(productOzone.usage, 1) + ' ' + productOzone.unit) : '',
        $valWaste = productWaste ? $('<span/>').text(accounting.formatNumber(productWaste.usage, 1) + ' ' + productWaste.unit) : '';

    var $carbon = productCarbon ? $('<div/>')
          .append($icoCarbon)
          .append($valCarbon) : '',
        $energy = productEnergy ? $('<div/>')
          .append($icoEnergy)
          .append($valEnergy) : '',
        $water = productWater ? $('<div/>')
          .append($icoWater)
          .append($valWater) : '',
        $waste = productWaste ? $('<div/>')
          .append($icoWaste)
          .append($valWaste) : '',
        $ozone = productOzone ? $('<div/>')
          .append($icoOzone)
          .append($valOzone) : '';

    var $productImpact = $('<div/>')
      .text("Product Impact")
      .addClass('a-size-medium product-impact-header');

    var $inputCheckbox = $('<input/>')
          .attr('type', 'checkbox')
          .prop('checked', true)
          .addClass('input-checkbox-true-cost'),
        checkboxText = 'Donate ' + accounting.formatMoney(productCost) + ' to help counteract your environmental impact',
        $donate = $('<label/>')
          .addClass('label-donate')
          .text(checkboxText)
          .prepend($inputCheckbox);

    $(document).on('click', '.input-checkbox-true-cost', function(){
      var checked = $(this).prop('checked');
      setLastDonation(checked ? productCost : 0);
    });

    setLastDonation(productCost);

    var $footprint = $('<div/>')
      .addClass('product-impact')
      .append($carbon)
      .append($energy)
      .append($waste)
      .append($water)
      .append($ozone);

    var $wrapper = $('<div/>')
      .addClass('true-cost')
      .append($donate)
      .append($productImpact)
      .append($footprint);

    console.log('product recommendations', productRecommendations);

    $addToCart.after($wrapper);
  }

  // Checkout page
  if(isCheckoutPage){
    console.log('checkout page');
  // Add Product To Cart page
  } else if(isAddToCartPage){
    console.log('added product to cart', getLastDonation());
    var lastDonation = getLastDonation();

    if(!lastDonation) return;

    var totalCostOutput = "<div class='true-cost add-to-cart-margin'><span class='a-size-medium a-align-center huc-subtotal'>";
    totalCostOutput += "<span><b>Donation subtotal </b></span>";
    totalCostOutput += "<span class='color-green hlb-price a-inline-block a-text-bold'>" + accounting.formatMoney(lastDonation) + "</span>";
    totalCostOutput += "</span></div>";


    var $carOutput = $("#hlb-subcart .a-row:last-child").html(totalCostOutput);

  // Product page
  } else if(isProductPage){
    $(document).on('change', '#native_dropdown_selected_size_name', timedAddTrueCostView);
    $(document).on('click', '.a-declarative', timedAddTrueCostView);

    addTrueCostView();
  }
})();
