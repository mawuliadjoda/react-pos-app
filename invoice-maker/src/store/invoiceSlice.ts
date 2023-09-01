import { createSlice, nanoid } from "@reduxjs/toolkit";
import localforage from "localforage";
import imageData from "../shared/imageData.json";
import colorData from "../shared/colorData.json";
import {
  INVOICES_KEY,
  DEFAULT_INVOICE_COLOR,
  DEFAULT_INVOICE_BG,
  INVOICE_DETAILS,
  INVOICE_FORM_KEY,
} from "../constants/localKeys";

const appImageData: any = imageData;

const initialState = {
  isConfirmModal: false,
  isConfirm: false,
  settingOpen: false,
  defaultColor: colorData[0],
  defaultBgImage: appImageData[0],
  colors: colorData,
  images: imageData,
  data: [],
  detailList: [],
  deletedID: null,
  currentEditedID: null,
  newForm: {
    id: nanoid(),
    invoiceNo: "",
    statusIndex: "1",
    statusName: "Draft",
    totalAmount: 1200,
    color: colorData[0],
    backgroundImage: appImageData[0],
    dueDate: new Date(),
    createdDate: new Date(),
    currencyUnit: "$",
    clientDetail: {
      id: "",
      name: "",
      mobileNo: "",
      email: "",
      image: "",
      billingAddress: "",
    },
    products: [
      {
        amount: 1200,
        id: "D9vPlvwg11cxYJToEf3x4",
        name: "productName",
        productID: "",
        quantity: 1,
      },
    ],
    taxes: [],
  },
};

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    setAllInvoice: (state:any, action) => {
      state.data = [...action.payload];
    },

    setAllInvoiceDetailList: (state: any, action) => {
      state.detailList = [...action.payload];
    },

    setNewInvoices: (state: any, action) => {
      const { payload } = action;

      const id = nanoid();

      const {
        invoiceNo,
        statusIndex,
        statusName,
        totalAmount,
        dueDate,
        createdDate,
        clientDetail,
      } = payload;

      const newInvoice = {
        id,
        invoiceNo,
        statusIndex,
        statusName,
        totalAmount,
        dueDate,
        createdDate,
        clientName: clientDetail?.name,
      };

      const updateState = [...state.data, newInvoice];
      state.data = updateState;
      localforage.setItem(INVOICES_KEY, updateState);

      const newDetailList = [...state.detailList, { ...payload, id }];
      state.detailList = newDetailList;
      localforage.setItem(INVOICE_DETAILS, newDetailList);
    },

    setDefaultColor: (state, action) => {
      const newColor = action.payload;
      state.defaultColor = newColor;
      localforage.setItem(DEFAULT_INVOICE_COLOR, newColor);
    },

    setDefaultBackground: (state, action) => {
      const newBackground = action.payload;
      state.defaultBgImage = newBackground;
      localforage.setItem(DEFAULT_INVOICE_BG, newBackground);
    },

    setDeleteId: (state, action) => {
      state.deletedID = action.payload;
    },

    setEditedId: (state, action) => {
      state.currentEditedID = action.payload;
    },

    onConfirmDeletedInvoice: (state) => {
      const newDatas = state.data.filter(
        (invoice: any) => invoice.id !== state.deletedID
      );
      state.data = newDatas;

      const newDetails = state.detailList.filter(
        (invoice: any) => invoice.id !== state.deletedID
      );

      state.deletedID = null;
      localforage.setItem(INVOICES_KEY, newDatas);
      localforage.setItem(INVOICE_DETAILS, newDetails);
    },

    onConfirmEditInvoice: (state: any, action) => {
      const isFindIndex = state.data.findIndex(
        (product: any) => product.id === state.currentEditedID
      );
      if (isFindIndex !== -1) {
        state.data[isFindIndex] = { ...action.payload };
      }
      state.currentEditedID = null;
      localforage.setItem(INVOICES_KEY, [...state.data]);
    },

    updateNewInvoiceFormField: (state: any, action) => {
      state.newForm[action.payload.key] = action.payload.value;
      const newForm = { ...state.newForm };
      localforage.setItem(
        INVOICE_FORM_KEY,
        JSON.parse(JSON.stringify(newForm))
      );
    },

    updateNewInvoiceForm: (state, action) => {
      state.newForm = { ...action.payload };
      localforage.setItem(INVOICE_FORM_KEY, { ...state.newForm });
    },

    updateExisitingInvoiceForm: (state: any, action) => {
      const {
        id,
        invoiceNo,
        statusIndex,
        statusName,
        totalAmount,
        dueDate,
        createdDate,
        clientDetail,
      } = action.payload;

      const findIndexOfList = state.data.findIndex(
        (product: any) => product.id === id
      );

      const newInvoice = {
        id,
        invoiceNo,
        statusIndex,
        statusName,
        totalAmount,
        dueDate,
        createdDate,
        clientName: clientDetail?.name,
      };

      if (findIndexOfList !== -1) {
        state.data[findIndexOfList] = { ...newInvoice };
      }
      const findIndexOfDetail = state.detailList.findIndex(
        (product: any) => product.id === id
      );

      if (findIndexOfDetail !== -1) {
        state.detailList[findIndexOfDetail] = { ...action.payload };
      }

      localforage.setItem(INVOICES_KEY, [...state.data]);
      localforage.setItem(INVOICE_DETAILS, [...state.detailList]);
    },

    setSettingModalOpen: (state, action) => {
      state.settingOpen = action.payload;
    },

    setConfirmModalOpen: (state, action) => {
      state.isConfirmModal = action.payload;
    },

    setIsConfirm: (state, action) => {
      state.isConfirm = action.payload;
    },
  },
});

export const {
  setAllInvoice,
  setAllInvoiceDetailList,
  setNewInvoices,
  setDefaultColor,
  setDefaultBackground,
  setDeleteId,
  setEditedId,
  setSettingModalOpen,
  setConfirmModalOpen,
  setIsConfirm,
  onConfirmDeletedInvoice,
  onConfirmEditInvoice,
  updateNewInvoiceForm,
  updateNewInvoiceFormField,
  updateExisitingInvoiceForm,
} = invoiceSlice.actions;

export const getAllInvoiceSelector = (state: any) => state.invoices.data;

export const getAllColorSelector = (state: any) => state.invoices.colors;

export const getAllImageSelector = (state: any) => state.invoices.images;

export const getCurrentBGImage = (state: any) => state.invoices.defaultBgImage;

export const getCurrentColor = (state: any) => state.invoices.defaultColor;

export const getAllInvoiceDetailSelector = (state: any) => state.invoices.detailList;

export const getInvoiceDetailByID = (id: any) => (state: any) =>
  state.invoices.detailList.find((detail: any) => detail.id === id);

export const getDeletedInvoiceForm = (state: any) => state.invoices.deletedID;

export const getInvoiceNewForm = (state: any) => state.invoices.newForm;

export const getInvoiceSettingModal = (state: any) => state.invoices.settingOpen;

export const getIsInvoiceConfirmModal = (state: any) =>
  state.invoices.isConfirmModal;

export const getIsConfirm = (state: any) => state.invoices.isConfirm;

export const getTotalBalance = (state: any) =>
  state.invoices.data.reduce((prev: any, next: any) => {
    return prev + (next.totalAmount || 0);
  }, 0);

export default invoiceSlice.reducer;
