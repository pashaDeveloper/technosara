import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "@/components/storage";

import productsReducer from "@/lib/features/products/productsSlice";
import cartsReducer from "@/lib/features/carts/cartsSlice";

import specialOfferProductsReducer from "./specialOfferProducts-slice";
import newestProductReducer from "./newestProduct-slice";
import SortedProductsListReducer from "./sortedProductList-slice";
import cartUiReducer from "./cartUI-slice";
import cartSliceReducer from "./cart-slice";
import userInfoReducer from "./user-slice";
import sideNavBarReducer from "./sideNavBar-slice";
import megaMenuReducer from "./megaMenu-slice";
import activeMenuItemReducer from "./activeMenuItem-slice";
import settingBoxReducer from "./settingBox-slice";
import favoriteReducer from "./favorite-slice";

// تنظیمات persist فقط برای carts
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["carts"],
};

// ترکیب همه‌ی reducerها
const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
  specialOfferProductsList: specialOfferProductsReducer,
  newestProductsList: newestProductReducer,
  sortedProductsList: SortedProductsListReducer,
  cartUi: cartUiReducer,
  cart: cartSliceReducer,
  userInfo: userInfoReducer,
  sideNavBar: sideNavBarReducer,
  megaMenu: megaMenuReducer,
  activeMenuItem: activeMenuItemReducer,
  settingBox: settingBoxReducer,
  favorite: favoriteReducer,
});

// اعمال persist فقط روی موارد انتخاب شده
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ساخت store
export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

// خروجی پیش‌فرض store برای استفاده مستقیم
const { store, persistor } = makeStore();

export { store, persistor };

// تایپ‌ها برای TypeScript
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
