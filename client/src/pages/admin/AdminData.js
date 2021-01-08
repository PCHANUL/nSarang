import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router';

import { getDataList, deleteData } from "../axiosRequest";
import { transDate } from '../Methods';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react-lite';

function AdminData(props) {
  const contentIdStore = useAppStore();
  const [ishover, setHover] = useState(false);
  const { 
    // value
    content, history,
    // method
    setContent,
  } = props;
  
  console.log('content: ', content);

  return useObserver (() => (
    <div className='dataBox' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className='textBox'>
        <div className='title'>
          <h3>{ content.title }</h3>
        </div>
        <div className='verse'>
          <h5>{ content.verse }</h5>
        </div>
        <p className='date'>{ content.createdAt.replaceAll('-', '. ') }</p>
      </div>
      {
        ishover &&
        <div className='buttonBox'>
          <button id='deleteBtn' className='dataButton' onClick={() => deleteDataBox(content.id, setContent)}>
            <img className='buttonIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/delete.png'></img>
          </button>
          <button id='updateBtn' className='dataButton' onClick={() => {
            contentIdStore.setEditState(true, content.id);
            history.push('/admin/edit');
          }}>
            <img className='buttonIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/edit.png'></img>
          </button>
        </div>
      }
    </div>
  ))
}

function deleteDataBox(id, setContent) {
  if (window.confirm('삭제하시겠습니까?')) {
    deleteData(id, (result) => {
      if (result) {
        getDataList(async(resultData) => {
          await setContent(resultData);
        })
      }
    })
  }
}

export default withRouter(AdminData);