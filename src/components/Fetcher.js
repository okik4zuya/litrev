import { useStore } from "@/store";
import { db } from "firebase-config";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react"
import Loader from "./Loader";

export default function Fetcher(props){
    const {children} = props;
    const {
        setLits,
        setNotes
    } = useStore(state=>state)

    const [isLoading, setIsLoading] = useState(true);
    const getLits = () => {
        onSnapshot(query(collection(db, 'posts'), where("type", "==", "literature")), docs => {
            setLits(docs.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            setIsLoading(false);
        })
    }
    const getNotes = () => {
        onSnapshot(query(collection(db, 'posts'), where("type", "==", "note")), docs => {
            setNotes(docs.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            setIsLoading(false);
        })
    }

    useEffect(()=>{
        getLits();
        getNotes();
    },[])


    return (
        <>
        {isLoading ? <div className="h-screen flex items-center justify-center"><Loader/></div> : children}
        </>
    )
}