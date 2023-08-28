import React, { useEffect, useState } from "react";
import Topbar from "./Topbar";
import { useStateContext } from "../../contexts/ContextProvider";
import Code from "./Code";
import Rightbar from "./Rightbar";
import Create from "./Create";
import { codeCodes } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { getCodes } from "../../redux/actions/code";


const Codes = () => {

  /////////////////////////////////////// VARIABLES //////////////////////////////////////////
  const dispatch = useDispatch()
  const { filteredCodes, codes, isFetching, error } = useSelector(state => state.code)
  console.log(codes)

  /////////////////////////////////////// STATES //////////////////////////////////////////
  const [filters, setFilters] = useState({ codes: 'all', language: 'all' })

  /////////////////////////////////////// USE EFFECTS ///////////////////////////////////////
  useEffect(() => {
    dispatch(getCodes())
  }, [])

  /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////


  return (
    <div className="flex w-full ">
      <div className={`w-[75%] h-full flex flex-col p-[1rem] `}>
        <Topbar filters={filters} setFilters={setFilters} />
        <Create />
        <div className="w-full flex flex-col justify-between items-start gap-[2rem] mt-[1rem] " >
          {
            isFetching
              ?
              <CircularProgress />
              :
              <>
                {
                  codes?.map((code, index) => (
                    <Code key={index} code={code} />
                  ))
                }
              </>
          }
        </div>
      </div>
      <div className="hidden lg:block w-[25%] bg-cool-gray-light p-4 rounded shadow">
        <Rightbar />
      </div>
    </div>
  );
};

export default Codes