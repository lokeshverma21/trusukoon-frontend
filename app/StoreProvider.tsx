'use client'

import { useRef, useMemo } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '@/lib/store/store'
import type { AppStore } from '@/lib/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // ✅ Initialize store only once using useMemo
  const store = useMemo<AppStore>(() => makeStore(), [])
   const persistor = persistStore(store)

  // ✅ Safe: no ref access during render
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

        {children}
    </PersistGate>
    </Provider>
}
