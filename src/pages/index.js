import Fetcher from "@/components/Fetcher";
import { getUniqueTag } from "@/functions";
import { useStore } from "@/store";
import Link from "next/link";

export default function () {
  const {
    lits,
    notes
  } = useStore(state=>state)
  return (
    <Fetcher>
      <div className="w-full h-screen flex justify-center bg-gray-100">
        <div className="w-full md:w-1/2 items-center flex flex-col px-6">
          <div className="mt-20 font-bold text-xl md:text-3xl text-center">Welcome to Literature Review App</div>
          <div className="mt-8 md:w-1/2 w-full">
            <MenuCard link="/lits" title="Literatures" badge={lits.length} />
          </div>
          <div className="mt-4 md:w-1/2 w-full">
            <MenuCard link="/notes" title="Notes" badge={notes.length} />
          </div>
          <div className="mt-4 md:w-1/2 w-full">
            <MenuCard link="/tags" title="Tags" badge={getUniqueTag(notes).length} />
          </div>
        </div>

      </div>
    </Fetcher>
  )
}

const MenuCard = (props) => {
  return (
    <Link href={props.link} className="cursor-pointer rounded-lg w-full py-8 bg-white shadow-lg flex items-center justify-center font-bold text-xl">
      <div>
        {props.title}
      </div>
      <div className="ml-4 rounded-lg py-1 px-2 text-white text-sm" style={{ background: "rgb(80, 104, 169)" }}>
        {props.badge}
      </div>
    </Link>

  )
}