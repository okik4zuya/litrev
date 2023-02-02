import Head from 'next/head'
import { db } from "../../firebase-config";
import { collection, doc, getDocs, setDoc, query, where, onSnapshot, getDoc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from 'react';
import Creatable, { useCreatable } from 'react-select/creatable';
import Fuse from 'fuse.js'
import { getUniqueTag } from '@/functions';


export default function Home() {
  const [lits, setLits] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [ID, setID] = useState(null);
  const [tempData, setTempData] = useState({
    tag: "",
    title: "",
    text: ""
  })
  const blankTemp = {
    tag: "",
    title: "",
    text: "",
    link: ""

  }
  const tagInput = useRef();
  const searchInput = useRef();
  const getLits = async () => {
    onSnapshot(collection(db, 'literatures'), docs => {
      setLits(docs.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    })
  }
  const createLit = async (e) => {
    e.preventDefault()
    await addDoc(collection(db, 'literatures'), tempData);
    setShowForm(false)
    setTempData(blankTemp)

  }
  const updateLit = async (e, id) => {
    e.preventDefault()
    await updateDoc(doc(db, 'literatures', id), tempData);
  }
  const deleteLit = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteDoc(doc(db, 'literatures', id), tempData);
    }

  }
  const handleAddClick = () => {
    setTempData(blankTemp)
    setShowForm(!showForm)
    if (tagInput.current) { console.log(tagInput.current.focus()) }
  }
  const handleEditClick = (id) => {
    setIsEdit(!isEdit)
    setID(id);
    setTempData(lits.filter(item => item.id == id)[0])
    setShowForm(!showForm)

  }
  const handleFormButton = (e) => {
    isEdit ? updateLit(e, ID) : createLit(e);
    setTempData(blankTemp)
    setShowForm(!showForm);


  }

  // FUzzy Search Logic
  const searchEle = searchInput.current;
  const fuseOptions = {
    shouldSort: true,
    matchAllTokens: true,
    findAllMatches: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["tag", "title", "text"]
  }

  var fuse = new Fuse(lits, fuseOptions);
  console.log(fuse.search("tambah"))

  console.log(getUniqueTag(lits))


  useEffect(() => {
    getLits()
  }, [])

  const tagOptions = lits.map(item => ({ value: item.tag, label: item.tag }));
  const titleOptions = lits.map(item => ({ value: item.title, label: item.title }));
  console.log(tempData)



  return (
    <>
      <Head>
        <title>Literature Review</title>
        <meta name="description" content="My Literature Note Taking App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ background: "#E9E8E8" }}>
        {showForm &&
          <div className='fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center p-4' style={{ background: "#0000004d", zIndex: "1" }}>
            <div className='fixed top-0 left-0 bottom-0 right-0 cursor-pointer' style={{ zIndex: "1" }} onClick={() => setShowForm(!showForm)}></div>
            <div className='bg-white rounded-lg p-4 w-full md:w-1/2' style={{ zIndex: "2" }}>
              <div className='mb-4 font-bold text-xl'>{isEdit ? "Update" : "Add"} Tag</div>
              <form>
                <div className=''>
                  <Creatable
                    options={tagOptions}
                    defaultInputValue={tempData.tag}
                    onChange={value => setTempData({ ...tempData, tag: value.value })}
                  />
                </div>
                <div className='mt-2'>
                  <Creatable
                    options={titleOptions}
                    defaultInputValue={tempData.title}
                    onChange={value => setTempData({ ...tempData, title: value.value })}
                  />
                </div>
                <div className='mt-2'>
                  <textarea
                    className='w-full outline-none bg-white resize-none rounded-md px-2 py-1 h-32'
                    placeholder='Text...'
                    style={{ border: "1px solid hsl(0, 0%, 80%)" }}
                    value={tempData.text}
                    onChange={e => setTempData({ ...tempData, text: e.target.value })}
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
            </div>
          </div>
        }
        <div className='h-screen w-screen flex flex-col items-center' style={{ zIndex: "0" }}>
          <div className="w-full py-2 px-2" style={{ background: "#5068a9" }}>
            <div className='flex relative'>
              <input
                ref={searchInput}
                value={search}
                className='flex-1 w-full h-12 rounded-md py-1 px-4 text-xl outline-none'
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search...' />
              {search.length !== 0 &&

                <div className='absolute right-4 top-2 cursor-pointer' onClick={()=> setSearch("")}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>

                </div>
              }
            </div>
          </div>
          <div className='mt-4 w-screen md:w-1/2 px-4 overflow-auto hide-scrollbar pb-8'>
            <div className="bg-white shadow-lg rounded-lg my-2 p-4 flex items-center justify-center cursor-pointer"
              onClick={handleAddClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
              </svg>
            </div>
            {search.length === 0 &&
              <div className='mt-8 font-bold text-xl'>
                <div className='font-bold text-xl mb-2'>Pilih Tag</div>
                {getUniqueTag(lits).map((item, key) => (
                  <div key={key} className="bg-white rounded-lg shadow-md p-4 mb-2 cursor-pointer"
                    onClick={() => setSearch(item.tag)}
                  >
                    {item.tag}

                  </div>
                ))}

              </div>
            }
            {search.length !== 0 && lits.length !== 0 && fuse.search(search).map((item, key) => (
              <div key={key} className="relative bg-white shadow-lg rounded-lg my-2 px-4 pt-2 pb-8" style={{ zIndex: "0" }}>
                <div className='flex my-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
                  </svg>
                  <div className='ml-2 font-bold text-xl'>{item.item.tag}</div>

                </div>
                <div className='flex my-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
                    <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                  </svg>
                  <div className='ml-2'>
                    {item.item.title}
                  </div>
                </div>
                <div className='flex my-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z" clipRule="evenodd" />
                    <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" />
                  </svg>
                  <div className='ml-2'>{item.item.text}</div>
                </div>
                {/*Absolute*/}
                <div className='absolute flex bottom-2 right-2'>
                  <div onClick={() => handleEditClick(item.item.id)} className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                      <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                    </svg>
                  </div>
                  <div className='ml-2 cursor-pointer' onClick={() => deleteLit(item.item.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                    </svg>
                  </div>


                </div>
              </div>
            ))}

          </div>
        </div>
      </main>
    </>
  )
}

