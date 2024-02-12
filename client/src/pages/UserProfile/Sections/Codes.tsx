import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CodeCard from '../../Codes/Code';
import { RootState } from '../../../redux/store';
import { Code, User } from '../../../interfaces';
import { getCodes, getUserCodes } from '../../../redux/actions/code';
import { Loader } from '../../../utils/Components';

const Codes = () => {

  const dispatch = useDispatch()
  const { codes }: { codes: Code[] } = useSelector((state: RootState) => state.code)
  const { currentUser, isFetching }: { currentUser: User | null, isFetching: boolean } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch<any>(getUserCodes(currentUser?._id as string))
  }, [])

  return (

    <div className="w-full flex flex-col gap-[2rem] ">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold mb-6 text-dark-slate-blue">Your Codes</h2>
        {
          isFetching
            ?
            <div className='flex justify-center w-full ' >
              <Loader />
            </div>
            :
            <>
              {
                codes.length == 0
                  ?
                  <div className="flex justify-center items-center min-h-[16rem] ">
                    <p className='font-medium text-2xl text-center mb-16 ' >No codes to show.</p>
                  </div>
                  :
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {codes.map((code, index) => (
                      <CodeCard code={code} key={index} />
                    ))}
                  </div>
              }
            </>
        }
      </div>

    </div>
  );
};

export default Codes;