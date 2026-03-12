'use client'

import type { ReactElement } from 'react'

const Home = ((): ReactElement => {
  return (
    <>
      <div className=" text-black">
        <h1>Kek</h1>
      </div>
    </>
  )
}) as React.FC

Home.displayName = 'Home'
export default Home
