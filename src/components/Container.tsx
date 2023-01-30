import React, { ReactNode } from 'react'

interface IProps{
    children:ReactNode
}

function Container({children}:IProps) {


  return (
    <div className='max-w-[1300px] mx-auto p-3 md:p-3 '>{children}</div>
  )
}

export default Container