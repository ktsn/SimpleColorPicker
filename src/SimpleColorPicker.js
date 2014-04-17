/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 2014/04/17
 */

(function(window, document) {
    var messages = {
        picker_header: "色を選択してください"
    };

    var default_options = {
        colors: ["#3D5AFC", "#D12016", "#04A200", "#E3D700"]
    };

    var SimpleColorPicker = function() {
        this._initialize.apply(this, arguments);
    };

    /*  Utilities
       ================================================================================= */

    var Util = {
        extend: function(func, extensions) {
            for(var key in extensions) {
                if (extensions.hasOwnProperty(key)) {
                    func.prototype[key] = extensions[key];
                }
            }
        },

        applyOptions: function(defaults, options) {
            if (options == null || typeof(options) !== "object") {
                return defaults;
            }

            var result = {};
            for (var key in defaults) {
                if (defaults.hasOwnProperty(key)) {
                    result[key] = options[key] != null ? options[key] : defaults[key];
                }
            }
            return result;
        },

        getScrollPoint: function() {
            var scroll_left = document.body.scrollLeft  || document.documentElement.scrollLeft;
            var scroll_top = document.body.scrollTop  || document.documentElement.scrollTop;

            return {
                x: scroll_left,
                y: scroll_top
            }
        }
    };

    /*  Picker
       ================================================================================== */

    Util.extend(SimpleColorPicker, {
        _initialize: function(input_el, options) {
            this.options = Util.applyOptions(default_options, options);

            this.input_el = input_el;
            this.picker = this._createPicker(this.options.colors);

            document.body.appendChild(this.picker);

            this.input_el.addEventListener("click", this._onClickInput.bind(this));
        },

        show: function(x, y) {
            this.picker.style.left = x + "px";
            this.picker.style.top = y + "px";
            this.picker.classList.add("sc-appear");
        },

        hide: function() {
            this.picker.classList.remove("sc-appear");
        },

        _createPicker: function(colors) {
            var container = document.createElement("div");
            var header = document.createElement("p");
            var buttons = colors.map(function(color_css) {
                return this._createColorButton(color_css);
            }.bind(this));

            container.className = "sc-picker";
            header.innerHTML = messages.picker_header;

            container.appendChild(header);
            buttons.forEach(function(button) {
                container.appendChild(button);
            });

            return container;
        },

        _createColorButton: function(color_css) {
            var button = document.createElement("button");
            button.value = button.style.backgroundColor = color_css;
            button.className = "sc-button";

            button.addEventListener("click", this._onClickColorButton.bind(this));

            return button;
        },

        _onClickInput: function(e) {
            e.preventDefault();

            var scroll_point = Util.getScrollPoint();
            this.show(scroll_point.x + e.clientX, scroll_point.y + e.clientY);
        },

        _onClickColorButton: function(e) {
            console.log("select color : " + e.target.value);
            this.input_el.value = e.target.value;
            this.hide();
        }
    });

    window.SimpleColorPicker = SimpleColorPicker;
})(window, document);