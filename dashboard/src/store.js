
import { configureStore } from "@reduxjs/toolkit";
import { technosaraApi } from "./services/technosara";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./features/auth/authSlice";
import productFilterSlice from "./features/productFilter/productFilterSlice";
import brandSlice from "./features/brand/brandSlice";
import productSlice from "./features/product/productSlice";
import categorySlice from "./features/category/categorySlice";
import storeSlice from "./features/store/storeSlice";
import favoriteSlice from "./features/favorite/favoriteSlice";
import cartSlice from "./features/cart/cartSlice";
import purchaseSlice from "./features/purchase/purchaseSlice";
import filterSlice from "./features/filter/filterSlice";
import userSlice from "@/features/user/userSlice";
import tagSlice from "@/features/tag/tagSlice";
import unitSlice from "@/features/unit/unitSlice";
export const store = configureStore({
  reducer: {
    [technosaraApi.reducerPath]: technosaraApi.reducer,
    auth: authSlice,
    brand: brandSlice,
    category: categorySlice,
    product: productSlice,
    store: storeSlice,
    favorite: favoriteSlice,
    cart: cartSlice,
    purchase: purchaseSlice,
    filter: filterSlice,
    user:userSlice,
    tag:tagSlice,
    unit:unitSlice,
    // productFilter: productFilterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(technosaraApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);
