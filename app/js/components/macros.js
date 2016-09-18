'use strict';

angular.module('ffxivCraftOptWeb.components')
  .directive('macros', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/macros.html',
      scope: {
        sequence: '=',
        options: '='
      },
      controller: function ($scope, $translate, _actionsByName, _allActions) {
        var update = function() {
          if (typeof $scope.sequence == 'undefined') {
            return '';
          }

          var buffs = {};
          for (var i = 0; i < _allActions.length; i++) {
            var action = _allActions[i];
            if (action.buff) {
              buffs[action.shortName] = true;
            }
          }

          var maxLines = 14;

          var waitString = '<wait.' + $scope.options.waitTime + '>';
          var buffWaitString = '<wait.' + $scope.options.buffWaitTime + '>';
          var stepSoundEffect = '<se.' + $scope.options.stepSoundEffect + '>';
          var finishSoundEffect = '<se.' + $scope.options.finishSoundEffect + '>';

          var lines = [];
          var waitTimes = [];

          for (var i = 0; i < $scope.sequence.length; i++) {
            var action = $scope.sequence[i];
            var waitTime = 0;
            var info = _actionsByName[action];
            if (info) {
              var actionName = $translate.instant(info.name);
              var line = '/ac "' + actionName + '" <me> ';
              if (buffs[action]) {
                line += buffWaitString;
                waitTime = $scope.options.buffWaitTime;
              }
              else {
                line += waitString;
                waitTime = $scope.options.waitTime;
              }
              line += '\n';
              lines.push(line);
              waitTimes.push(waitTime);
            }
            else {
              lines.push('/echo Error: Unknown action ' + action);
              waitTimes.push(waitTime);
            }
          }

          var macroList = [];
          
          var macroData = {macroText: '', macroTotalWait: 0};
          for (var j = 0; j < lines.length; j++) {
            macroData.macroText += lines[j];
            macroData.macroTotalWait += waitTimes[j];
            var step = j + 1;
            if (step % maxLines === 0) {
              macroData.macroText += '/echo Macro #' + step / maxLines + ' complete ' + stepSoundEffect + '\n';
              macroList.push(macroData);
              macroData = {macroText: '', macroTotalWait: 0};
            }
          }

          if (macroData.macroText !== '') {
            macroData.macroText += '/echo Macro #' + Math.ceil(lines.length / maxLines) + ' complete ' + finishSoundEffect + '\n';
            macroList.push(macroData);
          }

          $scope.macroList = macroList;
        };

        $scope.$on('$translateChangeSuccess', update);
        $scope.$watchCollection('sequence', update);
        $scope.$watchCollection('options', update);

        update();
      }
    }
  });
