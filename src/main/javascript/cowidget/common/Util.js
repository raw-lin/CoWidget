/*
 * CoWidget
 * 
 * (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version 2.0 - see LICENSE.
 */
/*
 * This is an optimized version of CoWidget, built for deployment and not for development. To get sources and documentation, please visit: http://cow.rawya.net
 */
'use strict';
(function() {
    console.log('[Util] return Util class');

    // var RgMuiBox = {};
    // RgMuiBox.method = function() {
    // // ....
    // }

    return class Util {

        constructor(option) {

        }

        static callTest() {
            console.log('[Util.callTest] callTest');
            return 'success';
        }

        static mixin(desObj, srcObj) {
            desObj = desObj ? desObj : {};
            console.log('[cow] ' + typeof srcObj);

            var empty = {};

            if (typeof srcObj === 'object') {
                if (true) {
                    for (var p in srcObj) {
                        if (!(p in empty)) {
                            desObj[p] = srcObj[p];
                        }
                    }
                } else {
                    desObj = Object.assign(desObj, srcObj);
                }
            } else if (typeof srcObj === 'function') {
                eval(srcObj);
            }

            return desObj;
        }
        // Getter
        get area() {
            return 'area';
        }
    };

})();