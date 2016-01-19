(function () {
  'use strict';

  angular
    .module('app.components')
    .directive('alexeyAppLoader', alexeyAppLoader);

  function alexeyAppLoader() {
    return {
      restrict: 'A',
      link:     function (scope, element, attributes) {

        scope.$watch(attributes.alexeyAppLoader, changeButtonState);

        function changeButtonState(state) {
          if (state) {
            element.addClass('is-loading');
            element.attr('disabled', 'disabled');

          } else {
            element.removeClass('is-loading');
            element.removeAttr('disabled');
          }
        }
      }
    };
  }

})();
