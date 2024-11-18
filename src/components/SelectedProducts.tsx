import { create } from 'zustand'
import useLocalStorageState from 'use-local-storage-state'
import { persist } from 'zustand/middleware'

type SelectedProductsProps = {
  selectedProducts: string[]
  setSelectedProducts: (data: string[]) => void
}

//Usando zustand middleware `persist` para armazenar dados no localStorage
export const useDataStore = create<SelectedProductsProps>()(
  persist(
    (set) => ({
      selectedProducts: [],

      setSelectedProducts: (data) => {
        set((state) => ({ selectedProducts: [...state.selectedProducts, ...data] }))
      },
    }),
    {
      name: 'cart'
    }
  )
)