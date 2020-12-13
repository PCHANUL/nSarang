import React from 'react';
import './imgBoard.css';
import '../responsibleCSS/mobileImgBoard.css';

export default function ImgBoard() {

  const moveLeft = () => {
    document.querySelector('#imgOuter').className = 'img_2';
  }
  const moveRight = () => {
    document.querySelector('#imgOuter').className = 'img_1';
  }


  return (
    <div id='imgBoard'>
      <div id='imgOuter' className='img_1'>
        <div id="mainImg">
          <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/mainPage/main.jpg' alt="..." ></img>
        </div>

        <div id="mainImg">
          <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/mainPage/main.jpg' alt="..." ></img>
        </div>
      </div>
      <div id='btnOuter'>
        <button className='boardBtn boardLeft' onClick={moveLeft}>{'<'}</button>
        <button className='boardBtn boardRight' onClick={moveRight}>{'>'}</button>
      </div>
    </div>
  )
}