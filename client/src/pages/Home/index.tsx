import React, { useEffect, useRef, useState } from "react";
import Topbar from "./Topbar";
import Rightbar from "./Rightbar";
import { useDispatch, useSelector } from "react-redux";
import { getCodes } from "../../redux/actions/code";
import { RootState } from "../../redux/store";
import CodeComponent from "../Codes/Code";
import { getCodes as getCodesApi } from '../../redux/api'
import { getCodesReducer } from "@/redux/reducers/code";
import Pagination from '@mui/material/Pagination';


const Codes = () => {

  /////////////////////////////////////// VARIABLES //////////////////////////////////////////
  const dispatch = useDispatch()
  const { codes, isFetching } = useSelector((state: RootState) => state.code)
  const pageSize = 5;
  const maxLength = 50;
  const totalPages = Math.ceil(maxLength / pageSize);

  /////////////////////////////////////// STATES //////////////////////////////////////////
  const [filters, setFilters] = useState({ codes: 'all', language: 'all' })
  const [page, setPage] = useState<number>(1)

  /////////////////////////////////////// USE EFFECTS ///////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getCodes(codes.length == 0, `?page=${page}&pageSize=${pageSize}`))
  }, [])
  useEffect(() => {
    // TODO: if data of particular page is available then dont call api
    fetchMore()
  }, [page])

  /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////
  const fetchMore = async () => {
    dispatch<any>(getCodes(true, `?page=${page}&pageSize=${pageSize}`))
  }

  return (
    <div className="flex w-full h-full ">
      <div className={`lg:w-[75%] w-full h-full p-[1rem] flex justify-center `}>
        <div className="w-[48rem] flex flex-col h-full">
          <Topbar filters={filters} setFilters={setFilters} />
          <div className="w-full flex flex-col justify-between items-start gap-[2rem] mt-[1rem] " >
            {
              isFetching
                ?
                Array(7).fill("")?.map((_, index) => (
                  <CodeComponent.Skeleton key={index} />
                ))
                :
                <>
                  {
                    codes?.map((code, index) => (
                      <CodeComponent key={index} code={code} />
                    ))
                  }
                </>
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
      <div className="hidden lg:block w-[25%] bg-cool-gray-light p-4 rounded shadow h-full ">
        <Rightbar />
      </div>
    </div>
  );
};

export default Codes