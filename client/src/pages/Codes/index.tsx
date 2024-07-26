import React, { useEffect, useState } from "react";
import Topbar from "./Topbar";
import Code from "./Code";
import Rightbar from "./Rightbar";
import { useDispatch, useSelector } from "react-redux";
import { getCodes } from "../../redux/actions/code";
import { RootState } from "../../redux/store";
import { Pagination } from "@mui/material";
import { Code as TCode } from "@/interfaces";
import qs from "query-string";
import { Empty } from "@/utils/Components/Empty";

const Codes = () => {

  /////////////////////////////////////// VARIABLES //////////////////////////////////////////
  const dispatch = useDispatch()
  const { codes, isFetching, count = 20 }: { codes: TCode[], isFetching: boolean, count: number } = useSelector((state: RootState) => state.code)
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
    dispatch<any>(getCodes(loading, query))
  }


  return (
    <div className="flex w-full  ">

      <div className={`lg:w-[75%] w-full h-full p-4 flex justify-center `}>
        <div className="lg:w-[48rem] pt-1 px-3 w-full flex flex-col h-full">
          <Topbar
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            languages={languages}
            setLanguages={setLanguages}
            searchedQuery={searchedQuery}
            setSearchedQuery={setSearchedQuery}
          />
          <div className="w-full flex flex-col justify-center items-start gap-6 mt-4 " >
            {
              isFetching
                ?
                Array(7).fill("")?.map((_, index) => (
                  <Code.Skeleton key={index} />
                ))
                :
                codes.length == 0
                  ?
                  <Empty />
                  :
                  codes?.map((code, index) => (
                    <Code key={index} code={code} />
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

export default Codes