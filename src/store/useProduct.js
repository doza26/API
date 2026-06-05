import {create} from "zustand";
import {devtools} from 'zustand/middleware'

export const useProduct=create()(devtools((set)=>({
    searchValue:'',
    sortValue:'',
    limit:12,
    skip:0,
    currentPage:1,
    setCurrentPage:(value)=>set({currentPage:value}),
    setSkip:(value)=>set({skip:value}),
    setSearchValue:(val)=>set({searchValue:val}),
    setSortValue:(val)=>set({sortValue:val}),
})))