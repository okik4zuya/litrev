import Fetcher from "@/components/Fetcher";
import Layout from "@/components/Layout";
import { getUniqueTag } from "@/functions";
import { useStore } from "@/store";
import Lits from "./lits";
import Notes from "./notes";
import Tags from "./tags";

export default function () {
  const {
    tab,
    setTab,
    lits,
    notes
  } = useStore(state => state)
  return (
    <>
      {tab === "" &&
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
      }
      {tab !== "" &&
        <Layout>
          {tab === "Literatures" && <Lits />}
          {tab === "Notes" && <Notes />}
          {tab === "Tags" && <Tags />}
        </Layout>
      }

    </>
  )
}

const MenuCard = (props) => {
  const {
    tab, setTab
  } = useStore(state => state)
  return (
    <div className="cursor-pointer rounded-lg w-full py-8 bg-white shadow-lg flex items-center justify-center font-bold text-xl"
      onClick={() => setTab(props.title)}
    >
      <div>
        {props.title}
      </div>
      <div className="ml-4 rounded-lg py-1 px-2 text-white text-sm" style={{ background: "rgb(80, 104, 169)" }}>
        {props.badge}
      </div>
    </div>

  )
}