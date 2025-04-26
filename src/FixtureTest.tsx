import React from 'react'

export default function FixtureTest(props) {
  const { bool } = props

  return (
    <>
      {props.bool ?'true' :'false'}
    </>
  )
}
