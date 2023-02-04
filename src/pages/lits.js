import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import { useStore } from '@/store';
import { useRouter } from 'next/router';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import Creatable, { useCreatable } from 'react-select/creatable';
import { getUniqueValue, toExcerpt } from '@/functions';
import { addDoc, collection, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from 'firebase-config';

const Lits = () => {
    const {
        lits,
        showLitForm,
        setShowLitForm,
        isEdit,
        setIsEdit,
        searchLit,
        setSearchLit
    } = useStore(state => state);


    // Local States
    const [isLoading, setIsLoading] = useState(false);
    const [ID, setID] = useState()
    const blankData = {
        title: "",
        link: "",
        created: Timestamp.now()
    }
    const [tempData, setTempData] = useState(blankData);

    // Functions
    const createLit = async (e) => {
        e.preventDefault()

        if (tempData.title.length) {
            setIsLoading(true);
            await addDoc(collection(db, 'literatures'), { ...tempData, created: Timestamp.now() })
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
        await updateDoc(doc(db, 'literatures', id), { ...tempData, updated: Timestamp.now() });
        setIsLoading(false)
        setShowLitForm(!showLitForm);
        setIsEdit(!isEdit)
    }
    const handleFormButton = (e) => {
        isEdit ? updateLit(e, ID) : createLit(e);
        setTempData(blankData);
        setSearchLit("");
    }
    const handleEditLit = (id) => {
        setIsEdit(!isEdit)
        setID(id);
        setTempData(lits.filter(item => item.id == id)[0])
        setShowLitForm(!showLitForm)
    }

    const router = useRouter();

    const tagOptions = getUniqueValue(lits.map(item => ({ value: item.tag, label: item.tag })));
    const titleOptions = getUniqueValue(lits.map(item => ({ value: item.title, label: item.title })));

    const test = lits.map(item => ({ created: item.created }));


    return (
        <Layout>
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
                                <div className='mb-4 font-bold text-xl'>{isEdit ? "Update" : "Add"} Tag</div>
                                <div className='mt-2'>
                                    <Creatable
                                        className='outline-none focus:border-none'
                                        options={titleOptions}
                                        defaultInputValue={tempData.title}
                                        placeholder="Select Title..."
                                        onChange={value => setTempData({ ...tempData, title: value.value })}
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
            {/*Absolut End*/}
            <div className='w-full md:w-1/2'>
                <div className='mt-2 text-lg font-bold'>Result: </div>
            </div>
            <div className='mt-2 md:w-1/2 w-full'>
                {lits.map((item, key) => (
                    <div key={key} className="text-md font-semibold flex flex-col items-center bg-white rounded-lg shadow-md p-4 mb-2"
                    >
                        <div className='cursor-pointer'
                            onClick={() => setSearchLit(item.title)}
                        >
                            {toExcerpt(item.title, 100)}
                        </div>
                        <div className='flex justify-end w-full mt-2 items-center'>
                            <div onClick={() => handleEditLit(item.id)} className="cursor-pointer mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                </svg>
                            </div>
                            <div className='flex items-center'>
                                <a href={item.link}
                                    target="_blank"
                                    className="font-semibold"
                                    style={{
                                        pointerEvents: item.link ? "auto" : "none",
                                        color: item.link ? "#5068a9" : "#e7e7e7",
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

        </Layout>
    )

}
export default Lits;