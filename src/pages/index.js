import Head from 'next/head'
import { db } from "../../firebase-config";
import { collection, doc, getDocs, setDoc, query, where, onSnapshot, getDoc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from 'react';
import Creatable, { useCreatable } from 'react-select/creatable';
import Fuse from 'fuse.js'
import { getUnique, getUniqueTag, getUniqueValue, getUniquePaper } from '@/functions';
import { Editor } from '@tinymce/tinymce-react';
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import { marked } from 'marked';


export default function Home() {
  const [lits, setLits] = useState([]);
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterPaper, setFilterPaper] = useState("");
  const [filterLit, setFilterLit] = useState("");
  const [tab, setTab] = useState("Tag");
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [ID, setID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tempData, setTempData] = useState({
    tag: "",
    title: "",
    text: "",
    link: "",
  })
  // quill state
  const [quillTheme, setQuillTheme] = useState("snow");
  const [editorHtml, setEditorHtml] = useState("");
  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link',
    'image', 'video'
  ]
  const quillModules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  console.log(tempData)

  const blankTemp = {
    tag: "",
    title: "",
    text: "",
    link: "",
  }
  const excerptLength = 100;
  const tagInput = useRef();
  const searchInput = useRef();
  const getLits = async () => {
    onSnapshot(collection(db, 'literatures'), docs => {
      setLits(docs.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    })
  }
  const createLit = async (e) => {
    e.preventDefault()

    if (tempData.tag.length) {
      setIsLoading(true);
      await addDoc(collection(db, 'literatures'), tempData)
      setShowForm(false)
      setTempData(blankTemp)
      setIsLoading(false);
    } else {
      alert("Silahkan isi tag terlebih dahulu!")
    }

  }
  const updateLit = async (e, id) => {
    e.preventDefault()
    setIsLoading(true);
    await updateDoc(doc(db, 'literatures', id), tempData);
    setIsLoading(false)
    setShowForm(!showForm);
    setIsEdit(!isEdit)
  }
  const deleteLit = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteDoc(doc(db, 'literatures', id), tempData);
    }

  }
  const handleCloseModal = () => {
    setShowForm(!showForm);
    setIsEdit(false);

  }
  const handleAddClick = () => {
    setTempData(blankTemp)
    setShowForm(!showForm)
  }
  const handleEditClick = (id) => {
    setIsEdit(!isEdit)
    setID(id);
    setTempData(lits.filter(item => item.id == id)[0])
    setShowForm(!showForm)

  }
  const handleFormButton = (e) => {
    isEdit ? updateLit(e, ID) : createLit(e);
    setTempData(blankTemp);
    setSearch("");
    setTab("Lit");
  }

  // Fuzzy Search Logic
  const fuseOptions = {
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
  }

  const fuse = new Fuse(lits, fuseOptions);
  const fuseFilterTag = new Fuse(getUniqueTag(lits), fuseOptions)
  const fuseFilterPaper = new Fuse(getUniquePaper(lits), fuseOptions)

  useEffect(() => {
    getLits()
  }, [])

  const tagOptions = getUniqueValue(lits.map(item => ({ value: item.tag, label: item.tag })));
  const titleOptions = getUniqueValue(lits.map(item => ({ value: item.title, label: item.title })));
  const tagList = filterTag.length === 0 ? getUniqueTag(lits) : fuseFilterTag.search(filterTag).map(item => ({ ...item.item }));
  const paperList = filterPaper.length === 0 ? getUniquePaper(lits) : fuseFilterPaper.search(filterPaper).map(item => ({ ...item.item }));
  const litList = filterLit.length === 0 ? lits : fuse.search(filterLit).map(item => ({ ...item.item }));
  //console.log(fuseFilter.search("ti").map(item => ({...item.item})))
  //console.log(paperList)



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
            <div className='fixed top-0 left-0 bottom-0 right-0 cursor-pointer' style={{ zIndex: "1" }} onClick={handleCloseModal}></div>
            <div className='bg-white rounded-lg p-4 w-full md:w-1/2' style={{ zIndex: "2" }}>
              {isLoading ?
                <div className='w-full flex justify-center'>
                  <Loader />
                </div>
                :
                <form>
                  <div className='mb-4 font-bold text-xl'>{isEdit ? "Update" : "Add"} Tag</div>
                  <div className=''>
                    <Creatable
                      options={tagOptions}
                      defaultInputValue={tempData.tag}
                      placeholder="Select Tag..."
                      onChange={value => setTempData({ ...tempData, tag: value.value })}
                    />
                  </div>
                  <div className='mt-2'>
                    <Creatable
                      options={titleOptions}
                      defaultInputValue={tempData.title}
                      placeholder="Select Title..."
                      onChange={value => setTempData({ ...tempData, title: value.value })}
                    />
                  </div>
                  <div className='mt-2'>
                    <input
                      className='w-full outline-none bg-white rounded-md px-2 py-1'
                      style={{ border: "1px solid hsl(0, 0%, 80%)" }}
                      placeholder="Insert Article Link..."
                      value={tempData.link}
                      onChange={(e) => setTempData({ ...tempData, link: e.target.value })}
                    />

                  </div>
                  <div className='mt-2 h-60 md:h-48'>

                    <ReactQuill
                      theme={quillTheme}
                      onChange={(value) => setTempData({ ...tempData, text: value })}
                      value={tempData.text}
                      modules={quillModules}
                      formats={quillFormats}
                      bounds={'.app'}
                      placeholder="Isi text..."
                      className='h-32'
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

                <div className='absolute right-4 top-2 cursor-pointer' onClick={() => setSearch("")}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>

                </div>
              }
            </div>
          </div>
          <div className='px-4 w-full flex justify-center mt-4'>
            <div className="bg-white shadow-lg rounded-lg my-2 p-4 flex items-center justify-center cursor-pointer w-full md:w-1/2"
              onClick={handleAddClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          {lits.length === 0 ?
            <div className='flex justify-center w-full mt-24'>
              <Loader />
            </div>
            :
            <div className='mt-4 w-screen md:w-1/2 px-4 overflow-auto hide-scrollbar pb-8'>
              {search.length === 0 &&
                <div className='mt-4 font-bold text-xl'>
                  <div className='flex w-full py-2 px-4 mb-8 rounded-lg overflow-hidden'>
                    {["Tag", "Paper", "Lit"].map(item => (
                      <div className='w-1/2 flex justify-center items-center py-2 cursor-pointer'
                        style={{
                          background: tab === item ? "rgb(80, 104, 169)" : "white",
                          color: tab === item ? "white" : "black"
                        }}
                        onClick={() => setTab(item)}
                      >
                        <div className='flex-1 flex justify-center'>{item}</div>
                        <div className='w-auto h-8 px-4 mr-4 flex justify-center rounded-lg' style={{
                          background: "rgb(255, 233, 174)",
                          color: "rgb(80, 104, 169)"
                        }}>
                          {item === "Tag" ? tagList.length : item === "Paper" ? paperList.length : lits.length}
                        </div>
                      </div>
                    ))}
                  </div>
                  {tab === "Tag" &&
                    <>
                      <div className='font-bold text-xl mb-2'>Pilih Tag</div>
                      <div className='my-2 w-full'>
                        <input
                          className='w-full py-2 px-4 outline-none'
                          placeholder='Filter Tag...'
                          value={filterTag}
                          onChange={e => { setFilterTag(e.target.value) }}
                        />
                      </div>
                      <div className='my-2 font-normal text-md'>Result: {tagList.length}</div>
                      {tagList.map((item, key) => (
                        <div key={key} className="flex items-center bg-white rounded-lg shadow-md p-4 mb-2 cursor-pointer"
                          onClick={() => setSearch(item.tag)}
                        >
                          <div className='' style={{ width: "90%" }}>
                            {item.tag}
                          </div>
                          <div className='w-full h-full flex justify-center rounded-lg' style={{ width: "10%", background: "#FFE9AE", color: "#5068a9" }}>
                            {lits.filter(i => i.tag == item.tag).length}
                          </div>

                        </div>
                      ))}
                    </>
                  }
                  {tab === "Paper" &&
                    <>
                      <div className='font-bold text-xl mb-2'>Pilih Paper</div>
                      <div className='my-2 w-full'>
                        <input
                          className='w-full py-2 px-4 outline-none'
                          placeholder='Filter Paper...'
                          value={filterPaper}
                          onChange={e => { setFilterPaper(e.target.value) }}
                        />
                      </div>
                      <div className='my-2 font-normal text-md'>Result: {paperList.length}</div>
                      {paperList.map((item, key) => (
                        <div key={key} className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 mb-2"
                        >
                          <div className='cursor-pointer'
                            onClick={() => setSearch(item.title)}
                          >
                            {item.title}
                          </div>
                          <div className='flex justify-end w-full'>
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
                      ))}
                    </>
                  }
                  {tab === "Lit" &&
                    <>
                      <div className='my-2 w-full'>
                        <input
                          className='w-full py-2 px-4 outline-none'
                          placeholder='Filter Lit...'
                          value={filterLit}
                          onChange={e => { setFilterLit(e.target.value) }}
                        />
                      </div>
                      <div className='my-2 font-normal tex-md'>Result: {litList.length}</div>
                      {litList.sort(function (a, b) { new Date(a.updatedAt) - new Date(b.updatedAt) }).map((item, key) => (
                        <div key={key}>
                          <LitCard data={item} handleEditClick={handleEditClick} deleteLit={deleteLit} />
                        </div>
                      ))}
                    </>
                  }


                </div>
              }
              {search.length !== 0 && lits.length !== 0 && fuse.search(search).map(item => ({ ...item.item })).map((item, key) => (
                <div key={key}>
                  <LitCard data={item} handleEditClick={handleEditClick} deleteLit={deleteLit} />
                </div>
              ))}

            </div>
          }
        </div>
      </main>
    </>
  )
}

const Loader = () => {
  return (
    <div className="lds-ripple"><div></div><div></div></div>
  )
}

const LitCard = (props) => {
  const {
    data,
    handleEditClick,
    deleteLit
  } = props;
  const [isExcerpt, setIsExcerpt] = useState(true);

  return (
    <div className="relative bg-white shadow-lg rounded-lg my-2 px-4 pt-2 pb-8" style={{ zIndex: "0", fontSize:"14px" }}>
      <div className='flex my-1'>
        <div className='w-6'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
          </svg>
        </div>
        <div className='ml-2 font-bold'>{data.tag}</div>

      </div>
      <div className='flex my-1'>
        <div className='w-6'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
            <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
          </svg>
        </div>
        <div className='ml-2'>
          <a href={data.link}
            target="_blank"
            className="font-semibold"
            style={{
              pointerEvents: data.link ? "auto" : "none",
              color: data.link ? "#5068a9" : "#000000",
            }}
          >
            {isExcerpt ? toExcerpt(data.title, 100) : data.title}
          </a>
        </div>
      </div>
      <div className='flex my-1 w-full'>
        <div className='w-6'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z" clipRule="evenodd" />
            <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" />
          </svg>
        </div>
        <div className='ml-2 break-word font-normal' dangerouslySetInnerHTML={{
          __html:
            isExcerpt ? toExcerpt(data.text, 100) : data.text
        }}>
        </div>
      </div>
      {/*Absolute*/}
      <div className='absolute flex bottom-2 right-2'>
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
        <div onClick={() => handleEditClick(data.id)} className="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
        </div>
        <div className='ml-2 cursor-pointer' onClick={() => deleteLit(data.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
          </svg>
        </div>


      </div>
    </div>
  )
}


const toExcerpt = (str, length) => {
  if (str.length > length) {
    return str.slice(0, length) + '...'
  } else {
    return str
  }

}