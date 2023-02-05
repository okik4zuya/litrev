import Layout from '@/components/Layout';
import { getUniqueValue, toExcerpt } from '@/functions';
import { useStore } from '@/store';
import { addDoc, collection, deleteDoc, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import Creatable, { useCreatable } from 'react-select/creatable';
import { db } from 'firebase-config';
import Loader from '@/components/Loader';
import Fuse from "fuse.js";
var _ = require('lodash');

const Notes = () => {
  const router = useRouter();
  const {
    notes,
    showNoteForm,
    setShowNoteForm,
    isEdit,
    setIsEdit,
    searchNote,
    setSearchNote,
    fuseOptions
  } = useStore(state => state)
  // Local States
  const [isLoading, setIsLoading] = useState(false);
  const [ID, setID] = useState()
  const blankData = {
    title: "",
    tag: "",
    type: "note",
    note: "",
    updated: Timestamp.now()
  }
  const [tempData, setTempData] = useState(blankData);

  // Functions
  const createNote = async (e) => {
    e.preventDefault()
    if (tempData.tag.length) {
      setIsLoading(true);
      await addDoc(collection(db, 'posts'), {
        ...tempData,
        created: Timestamp.now(),
        updated: Timestamp.now(),
        type: "note"
      })
      setShowNoteForm(false)
      setTempData(blankData)
      setIsLoading(false);
    } else {
      alert("Please fill Tag field!")
    }

  }
  const updateNote = async (e, id) => {
    e.preventDefault()
    setIsLoading(true);
    await updateDoc(doc(db, 'posts', id), { ...tempData, updated: Timestamp.now() });
    setIsLoading(false)
    setShowNoteForm(false);
    setIsEdit(false)
  }
  const deleteNote = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteDoc(doc(db, 'posts', id));
    }

  }
  const handleFormButton = (e) => {
    isEdit ? updateNote(e, ID) : createNote(e);
    setTempData(blankData);
    setSearchNote("");
  }
  const handleEditClick = (id) => {
    setIsEdit(true)
    setID(id);
    setTempData(notes.filter(item => item.id == id)[0])
    setShowNoteForm(true)

  }

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
  useEffect(() => {
    router.query.search && setSearchNote(router.query.search)
  }, [])

  const fuseNote = new Fuse(notes, fuseOptions);
  // Computed
  let notesList;
  notesList = searchNote.length !== 0 ? fuseNote.search(searchNote).map(item => ({ ...item.item })) : notes;

  const tagOptions = getUniqueValue(notes.map(item => ({ value: item.tag, label: item.tag })));
  const titleOptions = getUniqueValue(notes.map(item => ({ value: item.title, label: item.title })));
  return (
    <Layout>
      {showNoteForm &&
        <div className='fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center p-4' style={{ background: "#0000004d", zIndex: "1" }}>
          <div className='fixed top-0 left-0 bottom-0 right-0 cursor-pointer' style={{ zIndex: "1" }} onClick={() => setShowNoteForm(false)}></div>
          <div className='bg-white rounded-lg p-4 w-full md:w-1/2' style={{ zIndex: "2" }}>
            {isLoading ?
              <div className='w-full flex justify-center'>
                <Loader />
              </div>
              :
              <form>
                <div className='mb-4 font-bold text-xl'>{isEdit ? "Update" : "Add"} Note</div>
                <div className='mt-2'>
                  <Creatable
                    className='outline-none focus:border-none'
                    options={tagOptions}
                    defaultInputValue={tempData.tag}
                    placeholder="Select Tag..."
                    onChange={value => setTempData({ ...tempData, tag: value.value })}
                  />
                </div>
                <div className='mt-2'>
                  <Creatable
                    className='outline-none focus:border-none'
                    options={titleOptions}
                    defaultInputValue={tempData.title}
                    placeholder="Select Literature Title..."
                    onChange={value => setTempData({ ...tempData, title: value.value })}
                  />
                </div>
                <div className='mt-2 h-60 md:h-48'>

                  <ReactQuill
                    theme={quillTheme}
                    onChange={(value) => setTempData({ ...tempData, note: value })}
                    value={tempData.note}
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
      <div className='fixed bottom-4 right-4 mt-4 md:w-20 w-16 flex items-center justify-center cursor-pointer'
        style={{ zIndex: "3" }}
        onClick={() => { setShowNoteForm(true); setIsEdit(false); setTempData(blankData) }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
        </svg>

      </div>
      {/*Absolut End*/}
      <div className='w-full mt-2 md:w-1/2'>
        <div className='text-lg font-bold text-left w-full'>Result: {notesList.length}</div>
      </div>

      <div className='mt-2 md:w-1/2 w-full'>
        {notes.length !== 0 && notesList.map((item, key) => (
          <div key={key}>
            <NoteCard data={item} handleEditClick={handleEditClick} deleteNote={deleteNote} />
          </div>
        ))}

      </div>
    </Layout>
  )

}
export default Notes;

const NoteCard = (props) => {
  const {
    data,
    handleEditClick,
    deleteNote
  } = props;
  const {
    lits
  } = useStore(state=>state)
  const [isExcerpt, setIsExcerpt] = useState(true);

  return (
    <div className="relative bg-white shadow-lg rounded-lg my-2 px-4 pt-2 pb-8" style={{ zIndex: "0", fontSize: "16px" }}>
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
          <a href={lits.filter(item => item.title === data.title)[0]?.link}
            target="_blank"
            className="font-semibold"
            style={{
              pointerEvents: lits.filter(item => item.title === data.title)[0]?.link ? "auto" : "none",
              color: lits.filter(item => item.title === data.title)[0]?.link ? "#5068a9" : "#000000",
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
            isExcerpt ? toExcerpt(data.note, 100) : data.note
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
        <div className='ml-2 cursor-pointer' onClick={() => deleteNote(data.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
          </svg>
        </div>


      </div>
    </div>
  )
}

