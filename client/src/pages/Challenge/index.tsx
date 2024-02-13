import React, { useEffect, useState } from "react";
import Topbar from "./Topbar";
import { useStateContext } from "../../contexts/ContextProvider";
import Challenge from "./Challenge";
import Rightbar from "./Rightbar";
import Create from "./Create";
import { useDispatch, useSelector } from "react-redux";
import { getChallenges } from "../../redux/actions/challenge";
import { RootState } from "../../redux/store";
import { Loader } from "../../utils/Components";
import UpdateModal from "../Codes/Update";
import CreateChallenge from "./Create";


const Challenges = () => {

  /////////////////////////////////////// VARIABLES //////////////////////////////////////////
  const dispatch = useDispatch()
  const { challenges, isFetching } = useSelector((state: RootState) => state.challenge)

  /////////////////////////////////////// STATES //////////////////////////////////////////
  const [filters, setFilters] = useState({ challenges: 'all', language: 'all' })

  /////////////////////////////////////// USE EFFECTS ///////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getChallenges(challenges.length == 0))
  }, [])

  /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////


  return (
    <div className="flex w-full  ">

      <CreateChallenge />
      <UpdateModal />

      <div className={`lg:w-[75%] w-full h-full p-[1rem] flex justify-center `}>
        <div className="w-[48rem] flex flex-col h-full">
          <Topbar filters={filters} setFilters={setFilters} />
          <Create />
          <div className="w-full flex flex-col justify-between items-start gap-[2rem] mt-[1rem] " >
            {
              isFetching
                ?
                Array(7).fill("")?.map((_, index) => (
                  <Challenge.Skeleton key={index} />
                ))
                :
                challenges?.map((challenge, index) => (
                  <Challenge key={index} challenge={challenge} />
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

export default Challenges