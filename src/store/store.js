"use strict";
exports.__esModule = true;
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var counterSlice_1 = require("./features/counter/counterSlice");
var displaySlice_1 = require("./features/display/displaySlice");
var positionSlice_1 = require("./features/position/positionSlice");
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        counter: counterSlice_1["default"],
        display: displaySlice_1["default"],
        position: positionSlice_1["default"]
    },
    middleware: function (getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: false
        });
    }
});
