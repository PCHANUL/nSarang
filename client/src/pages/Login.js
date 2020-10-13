import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import './login.css';

function Login(props) {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');

  const handleChangeId = (e) => {
    setUserId(e.target.value)
  }
  const handleChangePw = (e) => {
    setUserPw(e.target.value)
  }
  const handleSubmit = (e) => {
    console.log(e)
  }


  return (
    <div id='login'>
      <h1>관리자 로그인</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">아이디:</label>
        <input type="text" id="fname" name="fname" value={userId} onChange={handleChangeId} />
        <br />
        <label htmlFor="lname">비밀번호:</label>
        <input type="password" id="lname" name="lname" value={userPw} onChange={handleChangePw}/>
        <br />
        <input type="submit" value="로그인" onClick={() => <Link to='/admin' />}>
        </input>
      </form>
      <Link to='/admin/signin'>
          관리자 가입
      </Link>
      <br />
      <Link to='/admin'>
          권한없이 둘러보기
      </Link>
      <br />
      <Link to='/'>
          나가기
      </Link>
    </div>
  )
}

export default (Login);