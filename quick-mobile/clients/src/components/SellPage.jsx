import React from 'react'
import MainComponents from './MainComponents'
import Slider from './Slider'
import Header from './Header'
import Slider2 from './Slider2'

const SellPage = () => {
  return (
    <div><Header/>
        <Slider/>
        <MainComponents/>
        <div className='py-2'>
        <Slider2/>
        </div>
    </div>
  )
}

export default SellPage