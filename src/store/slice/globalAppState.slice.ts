import { GlobalAppState } from '@/src/interfaces/globale/appState.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: GlobalAppState = {
  isDrawerOpen: false,
  firstLance:false
};

const menuState = createSlice({
  name: 'GlobalAppState',
  initialState,
  reducers: {
    setGlobalAppState(_, action: PayloadAction<GlobalAppState>) {
      return action.payload;
    },

    resetGlobalAppState() {
      return initialState;
    },
  },
});

export const { resetGlobalAppState, setGlobalAppState } = menuState.actions;
export default menuState.reducer;
