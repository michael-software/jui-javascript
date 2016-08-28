(function (action, window) {

    var actions = [];

	action.call = function(action) {
        name = action.replace(/((?:.?)*)\(((?:.?)*)\)/, '$1').toUpperCase(); //(?<!\\)(?:\\{2})*\K"

        values = action.replace(/((?:.?)*)\(((?:.?)*)\)/, '$2');
        values = values.replace(/(?:[[:blank:]]*),/g, ',').replace(/,(?:[[:blank:]]*)/g, ',');

        values = (' ' + values).replace(/([^(\\)])"/g, '$1');  // RegEx: /(?<!\\)(?:\\{2})*\K"/g
        values = values.replace(/([^(\\)])'/g, '$1');
        values = values.replace(/,/g, '$1');
        values = values.trim();
        values = values.split(',');

        if(!window.jui.tools.empty(actions))
        for(var i = 0, x = actions.length; i < x; i++) {
            if(actions[i].name === name) {
                actions[i].callback.apply(window, values);
                break;
            }
        }
	};

    action.addAction = function(name, callback) {

        if(window.jui.tools.isFunction(callback)) {
            actions.push({
                name: name.toUpperCase(),
                callback: callback
            });
        }
    };

    action.addAction("openUrl", function(url) {
         var win = window.open(url, '_blank');
         win.focus();
    });

    action.addAction("submit", function() {
         window.jui.submit();
    });

    action.addAction('parseUrl', function(url) {
        window.jui.requestParse(url);
    })
})(window.jui.action = {}, window);