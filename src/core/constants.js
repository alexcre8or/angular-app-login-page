/* global Chart:false, CryptoJS:false, moment:false */
(function () {
  'use strict';

  angular
    .module('app.core')
    .constant('Chart', Chart)
    .constant('CryptoJS', CryptoJS)
    .constant('moment', moment);
})();
