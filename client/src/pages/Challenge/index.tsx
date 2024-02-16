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
import { Pagination } from "@mui/material";


const Challenges = () => {

  /////////////////////////////////////// VARIABLES //////////////////////////////////////////
  const dispatch = useDispatch()
  const { challenges, isFetching } = useSelector((state: RootState) => state.challenge)
  const pageSize = 5;
  const maxLength = 50;
  const totalPages = Math.ceil(maxLength / pageSize);

  /////////////////////////////////////// STATES //////////////////////////////////////////
  const [filters, setFilters] = useState({ challenges: 'all', language: 'all' })
  const [page, setPage] = useState<number>(1)

  /////////////////////////////////////// USE EFFECTS ///////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getChallenges(challenges.length == 0,`?page=${page}&pageSize=${pageSize}`))
  }, [])
  useEffect(() => {
    // TODO: if data of particular page is available then dont call api
    fetchMore()
  }, [page])

  /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////
  const fetchMore = async () => {
    dispatch<any>(getChallenges(true, `?page=${page}&pageSize=${pageSize}`))
  }

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

export default Challenges