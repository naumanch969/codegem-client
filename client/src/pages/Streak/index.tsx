import React, { useEffect, useState } from "react";
import Topbar from "./Topbar";
import { useStateContext } from "../../contexts/ContextProvider";
import Streak from "./Streak";
import Rightbar from "./Rightbar";
import Create from "./Create";
import { useDispatch, useSelector } from "react-redux";
import { getStreaks } from "../../redux/actions/streak";
import { RootState } from "../../redux/store";
import { Loader } from "../../utils/Components";
import UpdateModal from "../Codes/Update";
import CreateStreak from "./Create";
import { Pagination } from "@mui/material";
import { Streak as TStreak } from "@/interfaces";


const Streaks = () => {

  /////////////////////////////////////// VARIABLES //////////////////////////////////////////
  const dispatch = useDispatch()
  const { streaks, isFetching, count }: { streaks: TStreak[], isFetching: boolean, count: number } = useSelector((state: RootState) => state.streak)
  const pageSize = 20;
  const totalPages = Math.ceil(count / pageSize);

  /////////////////////////////////////// STATES //////////////////////////////////////////
  const [filters, setFilters] = useState({ streaks: 'all', language: 'all' })
  const [page, setPage] = useState<number>(1)

  /////////////////////////////////////// USE EFFECTS ///////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getStreaks(streaks.length == 0, `?page=${page}&pageSize=${pageSize}&count=${true}`))
  }, [])
  useEffect(() => {
    // TODO: if data of particular page is available then dont call api
    fetchMore()
  }, [page])

  /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////
  const fetchMore = async () => {
    dispatch<any>(getStreaks(true, `?page=${page}&pageSize=${pageSize}`))
  }

  return (
    <div className="flex w-full  ">

      <div className={`lg:w-[75%] w-full h-full p-[1rem] flex justify-center `}>
        <div className="w-full flex flex-col h-full">
          <Topbar filters={filters} setFilters={setFilters} />
          <div className="w-full flex flex-col justify-between items-start gap-[2rem] mt-[1rem] " >
            {
              isFetching
                ?
                Array(7).fill("")?.map((_, index) => (
                  <Streak.Skeleton key={index} />
                ))
                :
                streaks?.map((streak, index) => (
                  <Streak key={index} streak={streak} />
                ))
            }
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