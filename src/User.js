import React from 'react'

export default function User({details}) {
  // const { details } = props

  if (!details) {
    return <h3>Working on fetching your Team Member&apos;s details...</h3>
  }

  return (
    <div className='user-container'>
      <h2>{details.first_name}</h2>
      <p>Email: {details.email}</p>
      <p>Password: {details.password}</p>
    </div>
  )
}