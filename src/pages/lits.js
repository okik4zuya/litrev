import Loader from '@/components/Loader';
import { useStore } from '@/store';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { getUniqueValue, toExcerpt } from '@/functions';
import { addDoc, collection, deleteDoc, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from 'firebase-config';
import Fuse from "fuse.js";
var _ = require('lodash');

const Lits = () => {
    const {
        setTab,
        lits,
        showLitForm,
        setShowLitForm,
        setSearchNote,
        isEdit,
        setIsEdit,
        searchLit,
        setSearchLit,
        fuseOptions,
        notes
    } = useStore(state => state);


    // Local States
    const [isLoading, setIsLoading] = useState(false);
    const [ID, setID] = useState()
    const blankData = {
        title: "",
        link: "",
        type: "literature",
        updated: Timestamp.now()
    }
    const [tempData, setTempData] = useState(blankData);

    // Functions
    const createLit = async (e) => {
        e.preventDefault()
        if (tempData.title.length) {
            setIsLoading(true);
            await addDoc(collection(db, 'posts'), {
                ...tempData,
                created: Timestamp.now(),
                updated: Timestamp.now(),
                type: "literature"
            })
            setShowLitForm(false)
            setTempData(blankData)
            setIsLoading(false);
        } else {
            alert("Please fill Title field!")
        }

    }
    const updateLit = async (e, id) => {
        e.preventDefault()
        setIsLoading(true);
        await updateDoc(doc(db, 'posts', id), { ...tempData, updated: Timestamp.now() });
        setIsLoading(false)
        setShowLitForm(!showLitForm);
        setIsEdit(false)
    }
    const deleteLit = async (id) => {
        if (window.confirm('Are you sure?')) {
            await deleteDoc(doc(db, 'posts', id));
        }

    }
    const handleFormButton = (e) => {
        isEdit ? updateLit(e, ID) : createLit(e);
        setTempData(blankData);
        setSearchLit("");
    }
    const openLitFormEdit = (id) => {
        setIsEdit(true)
        setID(id);
        setTempData(lits.filter(item => item.id == id)[0])
        setShowLitForm(true)
    }

    const fuseLit = new Fuse(lits, fuseOptions);

    // Computed
    let litslist;
    litslist = searchLit.length !== 0 ? fuseLit.search(searchLit).map(item => ({ ...item.item })) : lits;

    return (
        <>
            {/*Absolut Start*/}

            {showLitForm &&
                <div className='fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center p-4' style={{ background: "#0000004d", zIndex: "1" }}>
                    <div className='fixed top-0 left-0 bottom-0 right-0 cursor-pointer' style={{ zIndex: "1" }} onClick={() => setShowLitForm(false)}></div>
                    <div className='bg-white rounded-lg p-4 w-full md:w-1/2' style={{ zIndex: "2" }}>
                        {isLoading ?
                            <div className='w-full flex justify-center'>
                                <Loader />
                            </div>
                            :
                            <form>
                                <div className='mb-4 font-bold text-xl'>{isEdit ? "Update" : "Add"} Literature</div>
                                <div className='mt-2'>
                                    {/* <Creatable
                                        className='outline-none focus:border-none'
                                        options={titleOptions}
                                        defaultInputValue={tempData.title}
                                        placeholder="Select Title..."
                                        onChange={value => setTempData({ ...tempData, title: value.value })}
                                    /> */}
                                    <input
                                        className='bg-white rounded-md w-full px-4 py-2 outline-none'
                                        value={tempData.title}
                                        placeholder="Insert Title..."
                                        style={{ border: " 1px solid hsl(0, 0%, 80%)" }}
                                        onChange={(e) => { setTempData({ ...tempData, title: e.target.value }) }}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <input
                                        className='bg-white rounded-md w-full px-4 py-2 outline-none'
                                        value={tempData.link}
                                        placeholder="Insert link..."
                                        style={{ border: " 1px solid hsl(0, 0%, 80%)" }}
                                        onChange={(e) => { setTempData({ ...tempData, link: e.target.value }) }}
                                    />
                                </div>
                                <div className='flex justify-center mt-4'>
                                    <input className="py-2 px-4 rounded-lg text-white font-semibold outline-none cursor-pointer"
                                        style={{ background: "#5068a9" }}
                                        type="submit"
                                        value={isEdit ? "Update" : "Submit"}
                                        onClick={e => handleFormButton(e)}
                                    />
                                </div>
                            </form>
                        }
                    </div>
                </div>
            }
            <div className='fixed bottom-4 right-4 mt-4 md:w-20 w-16 flex items-center justify-center cursor-pointer'
                onClick={() => { setShowLitForm(true); setIsEdit(false); setTempData(blankData) }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                </svg>

            </div>
            {/*Absolut End*/}
            <div className='w-full mt-2 md:w-1/2'>
                <div className='text-lg font-bold text-left w-full'>Result: {litslist.length}</div>
            </div>
            <div className='mt-2 md:w-1/2 w-full pb-20'>
                {litslist.map((item, key) => (
                    <div key={key}>
                        <LitCard 
                        data={item}
                        openLitFormEdit={openLitFormEdit}
                        deleteLit={deleteLit}
                        />
                    </div>
                ))}

            </div>

        </>
    )

}
export default Lits;


const LitCard = (props) => {
    const {data, openLitFormEdit, deleteLit} = props;
    const { notes, setSearchNote, setTab } = useStore(state => state);
    const [isExcerpt, setIsExcerpt] = useState(true)
    return (
        <div className="text-md font-semibold flex flex-col items-center bg-white rounded-lg shadow-md p-4 mb-2"
        >
            <div className='w-full text-lg font-bold'
            >
                {isExcerpt ? toExcerpt(data.title, 100) : data.title}
            </div>
            <div className='flex justify-end w-full mt-2 items-center'>
                <div className='flex'>
                    <div className='py-1 px-4 rounded-lg text-sm text-white font-bold cursor-pointer'
                        style={{ background: "rgb(80, 104, 169)" }}
                        onClick={() => { setTab("Notes"); setSearchNote(data.title) }}
                    >
                        {notes.filter(i => i.title == data.title).length} Notes
                    </div>
                </div>
                <div className='flex flex-1 ml-2 items-center'>
                    <a href={data.link}
                        target="_blank"
                        className="font-semibold"
                        style={{
                            pointerEvents: data.link ? "auto" : "none",
                            color: data.link ? "#5068a9" : "#e7e7e7",
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
                <div className='cursor-pointer mr-2' onClick={() => setIsExcerpt(!isExcerpt)}>
                    {isExcerpt ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                        </svg>

                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                        </svg>
                    }

                </div>
                <div onClick={() => openLitFormEdit(data.id)} className="cursor-pointer mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                    </svg>
                </div>
                <div className='ml-2 cursor-pointer' onClick={() => deleteLit(data.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    )
}