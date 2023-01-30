import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

function Result() {
  const router=useRouter();

useEffect(()=>{
setTimeout(()=>{
  router.push('/')
},2000)
},[])

  return (
    <div className='p-5'>
      <h3 className='font-bold text-4xl'>Ordered Successfully</h3>
    </div>
  )
}

export default Result