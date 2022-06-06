"use strict";
exports.__esModule = true;
exports.selectPosition = exports.setPosition = exports.positionSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    value: { lat: 0, lng: 0 }
};
exports.positionSlice = (0, toolkit_1.createSlice)({
    name: 'position',
    initialState: initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setPosition: function (state, action) {
            state.value = action.payload;
        }
    }
});
exports.setPosition = exports.positionSlice.actions.setPosition;
var selectPosition = function (state) { return state.position.value; };
exports.selectPosition = selectPosition;
exports["default"] = exports.positionSlice.reducer;
