'use strict';

angular.module('ffxivCraftOptWeb.components')
  .directive('crossClassDepiction', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/cross-class-depiction.html',
      scope: {
        actions: '=',
        cls: '='
      },
      controller: function ($scope, _actionsByName) {
        $scope.getCrossClasses = function() {
          var crossClasses = {
            'Carpenter': false,
            'Blacksmith': false,
            'Armorer': false,
            'Goldsmith': false,
            'Leatherworker': false,
            'Weaver': false,
            'Alchemist': false,
            'Culinarian': false
          };
          var cls = $scope.cls;
          for (var i = 0, len = $scope.actions.length; i < len; i++) {
            var action = $scope.actions[i];
            if (!angular.isDefined(action)) {
              console.error('undefined actionName');
              continue;
            }
            var info = _actionsByName[action];
            if (!angular.isDefined(info)) {
              console.error('unknown action: %s', action);
              continue;
            }
            var infoCls = info.cls;
            if (infoCls != 'All' && infoCls != cls)
              crossClasses[infoCls] = true;
          }
          return crossClasses;
        };
      }
    }
  });
