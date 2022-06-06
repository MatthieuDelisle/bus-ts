"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
exports.__esModule = true;
exports.selectDisplay = exports.updateOrAddLayer = exports.addLayer = exports.toggleLayerVisibility = exports.displaySlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    value: {
        layers: [
            {
                markers: [{ pos: { lat: 47.64795, lng: 6.85469 }, color: "d51717", id: -1 }],
                name: "layer_default",
                displayed: true,
                polylines: [],
                id: "aaa"
            },
        ]
    }
};
exports.displaySlice = (0, toolkit_1.createSlice)({
    name: 'display',
    initialState: initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        toggleLayerVisibility: function (state, action) {
            console.log("toggleLayerVisibility");
            var copy = __assign({}, state.value);
            copy.layers[action.payload].displayed = !copy.layers[action.payload].displayed;
            state.value = copy;
        },
        addLayer: function (state, action) {
            var copy = __assign({}, state.value);
            copy.layers.push(action.payload);
            state.value = copy;
        },
        updateOrAddLayer: function (state, action) {
            var copy = __assign({}, state.value);
            var index = -1;
            for (var i = 0; i < copy.layers.length; i++) {
                if (copy.layers[i].id === action.payload.id) {
                    index = i;
                    break;
                }
            }
            if (index === -1)
                copy.layers = __spreadArray(__spreadArray([], copy.layers, true), [action.payload], false);
            else {
                copy.layers = __spreadArray([], copy.layers, true);
                copy.layers[index] = action.payload;
            }
            state.value = copy;
        }
    }
});
exports.toggleLayerVisibility = (_a = exports.displaySlice.actions, _a.toggleLayerVisibility), exports.addLayer = _a.addLayer, exports.updateOrAddLayer = _a.updateOrAddLayer;
var selectDisplay = function (state) { return state.display.value; };
exports.selectDisplay = selectDisplay;
exports["default"] = exports.displaySlice.reducer;
