import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import globalAppState from './slice/globalAppState.slice';


// Combine reducers
const rootReducer = combineReducers({
    globalAppState: globalAppState,
});

// Configuration de persist
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

// Reducer persistant
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Création du store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // serializableCheck: {
            //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            // },
            serializableCheck: false,
            immutableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
