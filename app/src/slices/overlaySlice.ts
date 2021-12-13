import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OverlayState {
  isOpen: boolean,
}

const initialState: OverlayState = {
  isOpen: false,
}

export const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    openOverlay: (state) => {
      state.isOpen = true;
    },
    closeOverlay: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  openOverlay,
  closeOverlay,
} = overlaySlice.actions;

export default overlaySlice.reducer;
