
import { IThumbnails } from '@/pages/api/shoes'
import Image from 'next/image'
import React from 'react'


interface IProps{
  thumbnails:IThumbnails[]
}



export const ShoeThumbnails = ({thumbnails}:IProps) => {
  return (
    <div className="col-span-2 ">
<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
{thumbnails.map(({id,img})=>
      <div key={id} className="w-full h-[300px] relative">
        <Image
        src={img}
        fill
        alt='shoe thumbnail'
        className='object-cover'
        loading='lazy'
        />
      </div>
  )}
</div>
    </div>
  )
}
