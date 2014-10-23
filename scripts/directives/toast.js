/**
 * Created by ttsvetko on 10/22/14.
 */
angular.module('connectikApp')
    .directive('toast',  function() {
        return {
            restrict: 'A',
            replace: true,
            template: '<div class="toast">{{errorMsg}}</div>'
        };
    });