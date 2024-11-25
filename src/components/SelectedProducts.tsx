import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SelectedProductsProps = {
  selectedProducts: string[]
  setSelectedProducts: (data: string[] | ((prev: string[]) => string[])) => void
}

//Usando zustand middleware `persist` para armazenar dados no localStorage
export const useDataStore = create<SelectedProductsProps>()(
  persist(
    (set) => ({
      selectedProducts: [],

      setSelectedProducts: (data) => {
        set((state) => ({
          selectedProducts:
            typeof data === "function" ? data(state.selectedProducts) : [...state.selectedProducts, ...data],
        }));
      },
    }),
    {
      name: 'cart'
    }
  )
)