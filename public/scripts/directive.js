(function () {
  "use strict";

  // cart.directive.js
  angular
    .module('myApp')
    .directive('filterDirective', filterDirective);

  function filterDirective() {

    return {
      restrict: "E",
      template: `  <rzslider rz-slider-floor="priceSlider.floor" rz-slider-ceil="priceSlider.ceil"
      rz-slider-model="priceSlider.min" rz-slider-high="priceSlider.max" rz-slider-step="{{priceSlider.step}}">
    </rzslider><label>Price</label>`
    }
  }



})();