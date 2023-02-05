import { getUniqueTag } from "@/functions";
import { useStore } from "@/store";
import { db } from "firebase-config";
import { collection, onSnapshot, where } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Fetcher from "./Fetcher";

export default function Layout(props) {
    const { children } = props;
    const {
        tab,
        setTab,
        lits,
        notes,
        tags,
        searchLit,
        searchNote,
        searchTag,
        setSearchLit,
        setSearchNote,
        setSearchTag,
        setLits,
        setNotes,
        showLitForm,
        setShowLitForm
    } = useStore(state => state);
    const router = useRouter();


    // Local Computed
    let searchValue, setSearch, searchPlaceholder;

    switch (tab) {
        case "Literatures": {
            searchValue = searchLit;
            setSearch = setSearchLit;
            searchPlaceholder = "Search Literatures";
        };
            break;
        case "Notes": {
            searchValue = searchNote;
            setSearch = setSearchNote;
            searchPlaceholder = "Search Notes";
        };
            break;
        case "Tags": {
            searchValue = searchTag;
            setSearch = setSearchTag;
            searchPlaceholder = "Search Tags"
        };
            break;

    }

    // Define Tabs
    const tabs = [
        {
            title: "Literatures",
            link: "/lits",
            badge: lits.length
        },
        {
            title: "Notes",
            link: "/notes",
            badge: notes.length
        },
        {
            title: "Tags",
            link: "/tags",
            badge: getUniqueTag(notes).length
        }
    ]


    return (
        <Fetcher>
            <Head>
                <title>Literature Review</title>
                <meta name="description" content="My Literature Note Taking App" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex flex-col items-center bg-gray-100 min-h-screen">
                <div className="sticky top-0 w-full py-2 px-2 flex flex-col items-center justify-center" style={{ background: "#5068a9", zIndex:"1" }}>
                    <div className="flex mb-4">
                        {tabs.map((item, key) => (
                            <div key={key} onClick={()=> setTab(item.title)}>
                                <div className='flex mx-3 pt-2 justify-center items-center cursor-pointer text-white'
                                    style={{
                                        borderTop: item.title === tab ? "4px solid white" : "none",
                                        fontWeight: item.title === tab ? "700" : "400"
                                    }}
                                >
                                    <div className='flex-1 flex justify-center mr-2'>{item.title}</div>
                                    <div className='w-auto  px-4 flex justify-center rounded-lg' style={{
                                        background: "rgb(255, 233, 174)",
                                        color: "rgb(80, 104, 169)"
                                    }}>
                                        {item.badge}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex relative w-full md:w-1/2'>
                        <input
                            value={searchValue}
                            className='flex-1 w-full h-10 rounded-md py-1 px-4 text-xl outline-none'
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={`${searchPlaceholder}...`} />

                        {searchValue && searchValue.length !== 0 &&

                            <div className='absolute right-4 top-2 cursor-pointer' onClick={() => setSearch("")}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>

                            </div>
                        }
                    </div>
                </div>
                <div className="px-4 w-full flex flex-col items-center">
                {children}
                </div>
            </main>
        </Fetcher>
    )
}