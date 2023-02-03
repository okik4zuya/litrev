import { create } from 'zustand'

export const useStore = create((set, get) => ({
    search: 0,
    tab: "",
    searchLit: "searchLit",
    searchNote: "searchNote",
    searchTag: "searchTag",
    lits: [],
    tags: [],
    notes: [],
    showLitForm: false,
    showNoteForm: false,
    isEdit: false,

    // Set functions
    setSearch: (value) => { set({ search: value }) },
    setTab: (value) => { set({ tab: value }) },
    setSearchLit: (value) => { set({ searchLit: value }) },
    setSearchTag: (value) => { set({ searchTag: value }) },
    setSearchNote: (value) => { set({ searchNote: value }) },
    setLits: (value) => { set({ lits: value }) },
    setTags: (value) => { set({ tags: value }) },
    setNotes: (value) => { set({ notes: value }) },
    setShowLitForm: (value) => { set({ showLitForm: value }) },
    setShowNoteForm: (value) => { set({ showNoteForm: value }) },
    setIsEdit: (value) => { set({ isEdit: value }) },
}))