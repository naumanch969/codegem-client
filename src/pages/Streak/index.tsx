import React, { useEffect, useState } from "react";
import Topbar from "./Topbar";
import { useStateContext } from "../../contexts/ContextProvider";
import Streak from "./Streak";
import Rightbar from "./Rightbar";
import Create from "./Create";
import { useDispatch, useSelector } from "react-redux";
import { getStreaks } from "../../redux/actions/streak";
import { RootState } from "../../redux/store";
import { Pagination } from "@mui/material";
import { Streak as TStreak } from "@/interfaces";
import qs from "query-string";
import { empty } from "@/assets";

const Streaks = () => {

  /////////////////////////////////////// VARIABLES //////////////////////////////////////////
  const dispatch = useDispatch()
  const { streaks, isFetching, count }: { streaks: TStreak[], isFetching: boolean, count: number } = useSelector((state: RootState) => state.streak)
  const pageSize = 20;
  const totalPages = Math.ceil(count / pageSize);

  /////////////////////////////////////// STATES //////////////////////////////////////////
  const [activeMenu, setActiveMenu] = useState<'all' | 'latest' | 'famous' | 'trending' | 'recommended'>('all')
  const [languages, setLanguages] = useState<string[]>([])
  const [searchedQuery, setSearchedQuery] = useState<string>('')
  const [page, setPage] = useState<number>(1)

  /////////////////////////////////////// USE EFFECTS ///////////////////////////////////////
  useEffect(() => {
    // TODO: if data of particular page is available then dont call api
    fetch({ loading: true, count: true })
  }, [activeMenu, languages, searchedQuery, languages, page])

  /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////
  const fetch = ({ loading = false, count = false }: { loading?: boolean, count?: boolean }) => {
    const languagesString = languages.join(',')
    const query = qs.stringifyUrl(
      { url: '', query: { page, pageSize, query: searchedQuery, languages: languagesString, count, filter: activeMenu } },
      { skipEmptyString: true, skipNull: true }
    );
    dispatch<any>(getStreaks(loading, query))
  }

  return (
    <div className="flex w-full  ">

      <div className={`lg:w-[75%] w-full h-full p-4 flex justify-center `}>
        <div className="lg:w-full pt-1 px-3 w-full flex flex-col h-full">
          <Topbar
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            languages={languages}
            setLanguages={setLanguages}
            searchedQuery={searchedQuery}
            setSearchedQuery={setSearchedQuery}
          />
          <div className="w-full flex flex-col justify-between items-start gap-8 mt-[1rem] " >
            {
              isFetching
                ?
                Array(7).fill("")?.map((_, index) => (
                  <Streak.Skeleton key={index} />
                ))
                :
                streaks.length == 0
                  ?
                  <div className='w-full flex flex-col justify-center items-center grayscale '>
                    <img src={empty} alt='Empty' className='w-96 h-96 grayscale ' />
                    <span className='text-foreground text-center text-lg font-semibold ' >Nothing Found.</span>
                    <span className='text-muted-foreground text-center text-md ' >It's our fault not yours.</span>
                  </div>
                  :
                  streaks?.map((streak, index) => (
                    <Streak key={index} streak={streak} />
                  ))
            }

            {
              totalPages > 1 &&
              <div className="w-full flex justify-center">
                <Pagination
                  count={totalPages}
                  defaultPage={1}
                  page={page}
                  siblingCount={0}
                  onChange={(e: any, page: number) => setPage(page)}
                  size='large'
                />
              </div>
            }


          </div>
        </div>
      </div>
      <div className="hidden lg:block w-[25%] bg-cool-gray-light p-4 rounded shadow">
        <Rightbar />
      </div>
    </div>
  );
};

export default Streaks