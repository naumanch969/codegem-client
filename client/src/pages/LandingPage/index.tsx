import React from 'react'
import HowItWork from './HowItWork'
import About from './About'
import Header from './Header'
import Contact from './Contact'

const LandingPage = () => {


    return (
        <div className="flex flex-col items-center w-full bg-inherit max-w-6xl ">
            <Header />
            <About />
            <HowItWork />
            <Contact />
        </div>
    )
}

export default LandingPage