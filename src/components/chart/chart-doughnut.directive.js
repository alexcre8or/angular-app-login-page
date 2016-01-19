(function () {

  'use strict';

  angular
    .module('app.components')
    .directive('alexeyAppChartDoughnut', alexeyAppChartDoughnut);

  alexeyAppChartDoughnut.$inject = ['Chart'];

  /**
   * Doughnut chart directive.
   */
  function alexeyAppChartDoughnut(Chart) {

    function link(scope, element, attrs, ngModel) {
      ngModel.$render = modelInitialized;

      function modelInitialized(model) {
        if (angular.isUndefined(ngModel.$modelValue)) {
          return null;
        }

        element.append('<canvas class="chart-doughnut" width="210" height="150">');

        var options = {
          segmentStrokeColor:    'transparent',
          segmentStrokeWidth:    0,
          percentageInnerCutout: 70,
          width: '100px'
        };

        var ctx = element.find('.chart-doughnut').get(0).getContext('2d');
        var doughnutChart = new Chart(ctx).Doughnut(ngModel.$modelValue, options);
      }
    }

    return {
      restrict: 'E',
      require:  'ngModel',
      scope:    {
        options: '=options'
      },
      link:     link
    };
  }

})();
