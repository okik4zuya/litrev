import { create } from 'zustand'

export const useStore = create((set, get) => ({
    search: 0,
    tab: "",
    searchLit: "",
    searchNote: "",
    searchTag: "",
    lits: [],
    tags: [],
    notes: [],
    showLitForm: false,
    showNoteForm: false,
    isEdit: false,
    fuseOptions : {
        shouldSort: true,
        matchAllTokens: true,
        findAllMatches: true,
        threshold: 0.5,
        location: 0,
        distance: 200,
        ignoreLocation: false,
        includeMatcher: true,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["tag", "title", "text"]
    },

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