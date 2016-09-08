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
        var crossClassesMemoized = {
          'Carpenter': [],
          'Blacksmith': [],
          'Armorer': [],
          'Goldsmith': [],
          'Leatherworker': [],
          'Weaver': [],
          'Alchemist': [],
          'Culinarian': []
        };
        var crossClasses = [
          {cls: 'Carpenter', actions: crossClassesMemoized['Carpenter']},
          {cls: 'Blacksmith', actions: crossClassesMemoized['Blacksmith']},
          {cls: 'Armorer', actions: crossClassesMemoized['Armorer']},
          {cls: 'Goldsmith', actions: crossClassesMemoized['Goldsmith']},
          {cls: 'Leatherworker', actions: crossClassesMemoized['Leatherworker']},
          {cls: 'Weaver', actions: crossClassesMemoized['Weaver']},
          {cls: 'Alchemist', actions: crossClassesMemoized['Alchemist']},
          {cls: 'Culinarian', actions: crossClassesMemoized['Culinarian']}
        ];
        $scope.getCrossClasses = function() {
          var cls = $scope.cls;
          //Wipe memoized values first
          for (var prop in crossClassesMemoized)
            if (crossClassesMemoized.hasOwnProperty(prop))
              crossClassesMemoized[prop].length = 0;
          for (var actionIndex = 0, actionsLen = $scope.actions.length; actionIndex < actionsLen; actionIndex++) {
            var action = $scope.actions[actionIndex];
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
            if (infoCls != 'All' && infoCls != cls) {
              var memoized = crossClassesMemoized[infoCls];
              var found = false;
              for (var memoizedIndex = 0, memoizedLength = memoized.length; memoizedIndex < memoizedLength; memoizedIndex++) {
                if (memoized[memoizedIndex] == action) {
                  found = true;
                  break;
                }
              }
              if (!found)
                crossClassesMemoized[infoCls].push(action);
            }
          }
          return crossClasses;
        };
      }
    }
  });
