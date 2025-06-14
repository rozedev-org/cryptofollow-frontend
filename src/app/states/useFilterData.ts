import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type FilterStore = {
    filter:string
    saveFilter: (data:string)=> void
    clearFilter: ()=> void
}
export const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      filter:'',
      saveFilter:(data)=> set({filter: data}),
      clearFilter:()=> set({filter:''})
    }),
    {
      name: 'filter-data',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)