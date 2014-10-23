/**
 * Created by ttsvetko on 10/21/14.
 */
angular.module('connectikApp')
    .filter('inStock', function () {
    return function (input, filter) {
        if (input && filter) {
            return input.filter(function(value, index, array) {
                return !!value.doc.inStock;
            });
        };
        return input;
    };
});