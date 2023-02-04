import { useStore } from "@/store";
import { db } from "firebase-config";
import { collection, onSnapshot, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import Loader from "./Loader";

export default function Fetcher(props){
    const {children} = props;
    const {
        setLits,
        lits
    } = useStore(state=>state)

    const [isLoading, setIsLoading] = useState(true);
    const getLits = () => {
        onSnapshot(collection(db, 'posts'), where("type", "==", "literature"), docs => {
            setLits(docs.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            setIsLoading(false);
            //setLits(docs.docs.map(doc => ({...doc.data(), id: doc.id, timestamp: doc.timestamp})))
        })
    }

    useEffect(()=>{
        getLits()
    },[lits])


    return (
        <>
        {isLoading ? <div className="h-screen flex items-center justify-center"><Loader/></div> : children}
        </>
    )
}