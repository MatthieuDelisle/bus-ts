import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import IDisplay from "./IDisplay";
import ILayer from "./ILayer";

export interface DisplayState {
  value: IDisplay;
}

const initialState: DisplayState = {
  value: {
    layers: [
      {markers: [{pos: {lat: 47.64795, lng: 6.85469}, color: "fff"}], name:"layer_default", displayed: true, polylines: []},
    ]
  },
};

export const displaySlice = createSlice({
  name: 'display',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggleLayerVisibility: (state,  action: PayloadAction<number>) => {
      console.log("toggleLayerVisibility");
      const copy = {...state.value};
      copy.layers[action.payload].displayed = !copy.layers[action.payload].displayed;
      state.value = copy;
    },
    addLayer: (state,  action: PayloadAction<ILayer>) => {
      const copy = {...state.value};
      copy.layers.push(action.payload);
      state.value = copy;
    },
  },
});

export const { addLayer, toggleLayerVisibility } = displaySlice.actions;

export const selectDisplay = (state: RootState) => state.display.value;

export default displaySlice.reducer;
