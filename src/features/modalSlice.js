import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  modalData: []
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalData: (state, action) => {
      state.modalData = action.payload
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    }
  }
})

export const { setIsModalOpen, setModalData } = modalSlice.actions;

export default modalSlice.reducer;