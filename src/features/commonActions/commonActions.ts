import { createAction } from "@reduxjs/toolkit";
import { NetworkDescription } from "../networksSlice/networksSlice";

export const addModifyNetwork =
  createAction<NetworkDescription>("addModifyNetwork");
