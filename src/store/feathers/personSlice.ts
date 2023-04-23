import { createSlice } from "@reduxjs/toolkit";

export interface Person {
  id: number;
  name: string;
}

interface PersonState {
  persons: Person[];
}

const initialState: PersonState = {
  persons: [],
};

export const PersonSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addPerson: (state, action) => {
      state.persons = action.payload;
    },
  },
});

export const { addPerson } = PersonSlice.actions;
export default PersonSlice.reducer;
