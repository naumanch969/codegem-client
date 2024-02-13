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


const Streaks = () => {

  /////////////////////////////////////// VARIABLES //////////////////////////////////////////
  const dispatch = useDispatch()
  const { streaks, isFetching } = useSelector((state: RootState) => state.streak)

  /////////////////////////////////////// STATES //////////////////////////////////////////
  const [filters, setFilters] = useState({ streaks: 'all', language: 'all' })

  /////////////////////////////////////// USE EFFECTS ///////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getStreaks())
  }, [])

  /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////


  return (
    <div className="flex w-full  ">

      <CreateStreak />
      <UpdateModal />


      <div className={`lg:w-[75%] w-full h-full p-[1rem] flex justify-center `}>
        <div className="w-[48rem] flex flex-col h-full">
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