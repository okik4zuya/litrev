
import Layout from '@/components/Layout';
import { useStore } from '@/store';
import { Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Fuse from "fuse.js";
import { getUniqueTag, toExcerpt } from '@/functions';
import Link from 'next/link';

const Tags = () => {
    const {
        notes,
        fuseOptions,
        searchTag,
        setSearchNote
    } = useStore(state => state);


    const fuseTag = new Fuse(notes, fuseOptions);
    // Computed
    let tagsList;
    tagsList = searchTag.length !== 0 ? getUniqueTag(fuseTag.search(searchTag).map(item => ({ ...item.item }))) : getUniqueTag(notes);
    console.log(notes.filter(item => item.tag === "New tag"))


    return (
        <Layout>
            <div className='w-full mt-2 md:w-1/2'>
                <div className='text-lg font-bold text-left w-full'>Result: {tagsList.length}</div>
            </div>
            <div className='mt-2 md:w-1/2 w-full'>
                {tagsList.map((item, key) => (
                    <Link href={`/notes?search=${item.tag}`} key={key} className="cursor-pointer text-md font-semibold flex flex-col items-center bg-white rounded-lg shadow-md p-4 mb-2"
                    >
                        <div className='w-full text-lg font-bold'
                        >
                            {toExcerpt(item.tag, 100)}
                        </div>
                        <div className='flex justify-end w-full mt-2 items-center'>
                            <div className=' py-1 px-4 rounded-lg text-white font-bold' style={{ background: "rgb(80, 104, 169)" }}>
                                {notes.filter(i => i.tag == item.tag).length} Notes
                            </div>
                        </div>
                    </Link>
                ))}

            </div>

        </Layout>
    )

}
export default Tags;