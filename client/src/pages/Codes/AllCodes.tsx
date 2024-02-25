import React, { useEffect, useState } from 'react'
import CodeComponent from './Code'
import { filter } from '../../redux/reducers/code'
import { useDispatch, useSelector } from 'react-redux'
import { Code } from '../../interfaces'
import { RootState } from '../../redux/store'

const CodeCodes = ({ filters }: { filters: any }) => {

  const { filteredCodes: codes, isFetching, error } = useSelector((state:RootState) => state.code)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(filter(filters.codes))
  }, [filters])

  return (
    <div className='w-full flex flex-col gap-4 ' >

      {
        codes.map((code:Code, index:number) => (
          <CodeComponent key={index} code={code} />
        ))
      }

    </div>
  )
}

export default CodeCodes