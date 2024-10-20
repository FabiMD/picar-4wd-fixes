// (function(doc, win) {
//     var docEl = doc.documentElement,
//         isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
//         dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
//         dpr = window.top === window.self ? dpr : 1, // When referenced by an iframe, disable scaling
//         dpr = 1,
//         scale = 1 / dpr,
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
//     docEl.dataset.dpr = dpr;
//     var metaEl = doc.createElement('meta');
//     metaEl.name = 'viewport';
//     metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale;
//     docEl.firstElementChild.appendChild(metaEl);
//     var recalc = function() {
//         var width = docEl.clientWidth;
//         if (width / dpr > 750) {
//             width = 750 * dpr;
//         }
//         // Multiply by 100, px : rem = 100 : 1
//         docEl.style.fontSize = 100 * (width / 1340) + 'px';
//     };
//     recalc()
//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
// })(document, window);


;(function (designWidth, maxWidth) {
    var doc = document,
        win = window;
    var docEl = doc.documentElement;
    var tid;
    var rootItem, rootStyle;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (!maxWidth) {
            maxWidth = 540;
        }
        ;
        if (width > maxWidth) {
            width = maxWidth;
        }
        // Unlike Taobao's approach, directly using a simple rem conversion method 1rem = 100px
        var rem = width * 100 / designWidth;
        // UC browser compatibility start
        rootStyle = "html{font-size:" + rem + 'px !important}';
        rootItem = document.getElementById('rootsize') || document.createElement("style");
        if (!document.getElementById('rootsize')) {
            document.getElementsByTagName("head")[0].appendChild(rootItem);
            rootItem.id = 'rootsize';
        }
        if (rootItem.styleSheet) {
            rootItem.styleSheet.disabled || (rootItem.styleSheet.cssText = rootStyle)
        } else {
            try {
                rootItem.innerHTML = rootStyle
            } catch (f) {
                rootItem.innerText = rootStyle
            }
        }
        // UC browser compatibility end
        docEl.style.fontSize = rem + "px";
    };
    refreshRem();

    win.addEventListener("resize", function () {
        clearTimeout(tid); // Prevent execution twice
        tid = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener("pageshow", function (e) {
        if (e.persisted) { // Recalculate when the browser goes back
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === "complete") {
        doc.body.style.fontSize = "16px";
    } else {
        doc.addEventListener("DOMContentLoaded", function (e) {
            doc.body.style.fontSize = "16px";
        }, false);
    }
})(1334, 2048);
