import React, { useEffect, useState } from 'react'
import ChallengeComponent from './Challenge'
import { filter } from '../../redux/reducers/challenge'
import { useDispatch, useSelector } from 'react-redux'
import { Challenge } from '../../interfaces'
import { RootState } from '../../redux/store'

const ChallengeChallenges = ({ filters }: { filters: any }) => {

  const { filteredChallenges: challenges, isFetching, error } = useSelector((state: RootState) => state.challenge)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(filter(filters.challenges))
  }, [filters])

  return (
    <div className='w-full flex flex-col gap-4 ' >

      {
        challenges.map((challenge: Challenge, index: number) => (
          <ChallengeComponent key={index} challenge={challenge} />
        ))
      }

    </div>
  )
}

export default ChallengeChallenges