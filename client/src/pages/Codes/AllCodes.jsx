import React, { useEffect, useState } from 'react'
import CodeCode from './CodeCode'
import { filter } from '../../redux/reducers/code'
import { useDispatch, useSelector } from 'react-redux'

const CodeCodes = ({ filters }) => {

  const { filteredCodes: codes, isFetching, error } = useSelector(state => state.code)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(filter(filters.codes))
  }, [filters])

  return (
    <div className='w-full flex flex-col gap-[1rem] ' >

      {
        codes.map((code, index) => (
          <CodeCode key={index} code={code} />
        ))
      }

    </div>
  )
}

export default CodeCodes