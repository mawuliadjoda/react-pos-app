import { createSlice } from "@reduxjs/toolkit";
import localforage from "localforage";
import { nanoid } from "nanoid";
import { CLIENTS_KEY, CLIENT_FORM_KEY } from "../constants/localKeys";

const initialState = {
  openClientSelector: false,
  selectedClient: null,
  data: [],
  newForm: {
    id: nanoid(),
    image: "",
    name: "",
    email: "",
    billingAddress: "",
    mobileNo: "",
  },
  editedID: null,
  deletedID: null,
};

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    addNewClient: (state: any, action) => {
      const newDatas = [...state.data, action.payload];
      state.data = newDatas;
      localforage.setItem(CLIENTS_KEY, newDatas);

      const reNewForm = {
        id: nanoid(),
        image: "",
        name: "",
        email: "",
        billingAddress: "",
        mobileNo: "",
      };

      state.newForm = { ...reNewForm };
      localforage.setItem(CLIENT_FORM_KEY, reNewForm);
    },

    updateNewClientForm: (state, action) => {
      state.newForm = { ...action.payload };
      localforage.setItem(CLIENT_FORM_KEY, { ...state.newForm });
    },

    updateNewClientFormField: (state: any, action) => {
      state.newForm[action.payload.key] = action.payload.value;
      localforage.setItem(CLIENT_FORM_KEY, { ...state.newForm });
    },

    setAllClients: (state, action) => {
      state.data = action.payload;
    },

    setDeleteId: (state, action) => {
      state.deletedID = action.payload;
    },

    setEditedId: (state, action) => {
      state.editedID = action.payload;
    },

    onConfirmDeletedClient: (state) => {
      const newDatas = state.data.filter(
        (client: any) => client.id !== state.deletedID
      );
      state.data = newDatas;
      state.deletedID = null;
      localforage.setItem(CLIENTS_KEY, newDatas);
    },

    onConfirmEditClient: (state: any, action) => {
      const isFindIndex = state.data.findIndex(
        (client: any) => client.id === state.editedID
      );
      if (isFindIndex !== -1) {
        state.data[isFindIndex] = { ...action.payload };
      }
      state.editedID = null;
      localforage.setItem(CLIENTS_KEY, [...state.data]);
    },

    setOpenClientSelector: (state, action) => {
      state.openClientSelector = action.payload;
      if (!action.payload) {
        state.selectedClient = null;
      }
    },

    setClientSelector: (state, action) => {
      const isFindIndex = state.data.findIndex(
        (client: any) => client.id === action.payload
      );
      if (isFindIndex !== -1) {
        state.selectedClient = state.data[isFindIndex];
      }
    },
  },
});

export const {
  addNewClient,
  updateNewClientForm,
  updateNewClientFormField,
  setAllClients,
  setDeleteId,
  setEditedId,
  onConfirmDeletedClient,
  onConfirmEditClient,
  setOpenClientSelector,
  setClientSelector,
} = clientsSlice.actions;

export const getAllClientsSelector = (state: any) => state.clients.data;

export const getClientNewForm = (state: any) => state.clients.newForm;

export const getDeletedClientForm = (state: any) => state.clients.deletedID;

export const getEditedIdForm = (state: any) => state.clients.editedID;

export const getIsOpenClientSelector = (state: any) =>
  state.clients.openClientSelector;

export const getSelectedClient = (state: any) => state.clients.selectedClient;

export default clientsSlice.reducer;
