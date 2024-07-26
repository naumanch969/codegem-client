import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CodeCard from '../../Codes/Code';
import { RootState } from '../../../redux/store';
import { Code, User } from '../../../interfaces';
import { getUserCodes } from '../../../redux/actions/code';

const Codes = () => {

  const dispatch = useDispatch()
  const { codes, isFetching }: { codes: Code[], isFetching: boolean } = useSelector((state: RootState) => state.code)
  const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch<any>(getUserCodes(codes.length == 0, loggedUser?._id! as string))
  }, [])

  return (
    <div className="w-full flex flex-col gap-3 ">

      {/* Heading */}
      <h3 className="text-3xl font-bold text-blackish">Codes</h3>

      {
        <div className="flex flex-col gap-6 ">
          {
            isFetching
              ?
              Array(6).fill('').map((_, index) => (
                <CodeCard.Skeleton key={index} />
              ))
              :
              <>
                {
                  codes.length == 0
                    ?
                    <div className="flex justify-center items-center min-h-[16rem]">
                      <p className='font-medium text-2xl text-center mb-16 ' >No codes to show.</p>
                    </div>
                    :
                    codes.map((code, index) => (
                      <CodeCard code={code} key={index} />
                    ))
                }
              </>
          }
        </div>
      }
    </div>
  );
};

export default Codes;