import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    sortOrder: 'asc',
}

export const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSortOrder(state, action) {
            state.sortOrder = action.payload;
        }
    }
})

export const {setSortOrder} = sortSlice.actions;
export default sortSlice.reducer;

