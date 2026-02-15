import React from 'react'
import LeftSection from './LeftSection'
import RightSection from './RightSection'

function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
           <LeftSection />
           <RightSection />
        </div>
    </main>
  )
}

export default Home