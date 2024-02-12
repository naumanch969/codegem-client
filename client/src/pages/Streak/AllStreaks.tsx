import React, { useEffect, useState } from 'react'
import StreakComponent from './Streak'
import { filter } from '../../redux/reducers/streak'
import { useDispatch, useSelector } from 'react-redux'
import { Streak } from '../../interfaces'
import { RootState } from '../../redux/store'

const StreakStreaks = ({ filters }: { filters: any }) => {

  const { filteredStreaks: streaks, isFetching, error } = useSelector((state: RootState) => state.streak)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(filter(filters.streaks))
  }, [filters])

  return (
    <div className='w-full flex flex-col gap-[1rem] ' >

      {
        streaks.map((streak: Streak, index: number) => (
          <StreakComponent key={index} streak={streak} />
        ))
      }

    </div>
  )
}

export default StreakStreaks