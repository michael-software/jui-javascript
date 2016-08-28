window.jui.views.input = (function (jsonObject) {
    var value = '';
    var preset = 0;
    var hint = '';
    var name = '';
    var properties = [];

    var _this = window.jui.views.input;
    var _tools = window.jui.tools;

    var parse = function (jsonObject) {
        if (!_tools.empty(jsonObject['name'])) {
            _this.setName(jsonObject['name']);

            if(!_tools.empty(jsonObject['value'])) {
                _this.setValue(jsonObject['value']);
            }

            if (!_tools.empty(jsonObject['preset'])) {
                _this.setPreset(jsonObject['preset']);
            }

            if (!_tools.empty(jsonObject['hint'])) {
                _this.setHint(jsonObject['hint']);
            }

            properties = jsonObject;
        }

        return _this;
    };

    _this.setValue = function (pValue) {
        value = pValue;
    };

    _this.setHint = function (pHint) {
        value = pHint;
    };

    _this.setName = function (pName) {
        name = pName;
    };

    _this.setPreset = function (pPreset) {
        if (pPreset.toUpperCase() == 'TEXTAREA') {
            preset = 1;
        } else if (pPreset.toUpperCase() == 'PASSWORD') {
            preset = 2;
        } else if (pPreset.toUpperCase() == 'NUMBER') {
            preset = 3;
        } else if (pPreset.toUpperCase() == 'DATE') {
            preset = 4;
        } else if (pPreset.toUpperCase() == 'COLOR') {
            preset = 5;
        } else {
            preset = 0;
        }
    };

    _this.getDomElement = function () {
        if(!_tools.empty(name)) {

            if(preset === 1) {
                var retval = document.createElement('textarea');
            } else if(preset === 2) {
                var retval = document.createElement('input');
                retval.setAttribute('type', 'password');
            } else if(preset === 3) {
                var retval = document.createElement('input');
                retval.setAttribute('type', 'number');
            } else if(preset === 4) {
                var retval = document.createElement('input');
                retval.setAttribute('type', 'date');
            } else if(preset === 5) {
                var retval = document.createElement('input');
                retval.setAttribute('type', 'color');
            } else {
                var retval = document.createElement('input');
                retval.setAttribute('type', 'text');
            }

            window.jui.registerSubmitElement(name, retval);
            
            if(!_tools.empty(value)) {
                if(preset === 1) {
                    retval.innerHTML = value;
                } else {
                    retval.value = value;
                }
            }

            if(!_tools.empty(hint)) {
                retval.placeholder = hint;
            }

            window.jui.views.view.addProperties(retval, properties);

            return window.jui.views.view.addInputProperties(retval, properties);
        }

        return null;
    };

    return parse(jsonObject);
});