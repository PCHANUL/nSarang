import React, { useState, useEffect, useContext } from 'react';

import addIcon from '../images/add-file.png';

import './admin.css';
import DataList from './DataList'

import { getDataList } from './axiosRequest';

import { observer } from 'mobx-react';
import { storeContext } from '../state/appStore';



const Admin = observer((props) => {
  const contentIdStore = useContext(storeContext);
  const [tab, setTab] = useState([0, 0]);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  
  
  useEffect(() => {
    window.scroll(0,0);
    getDataList(async (getData) => {
      await setData(getData);
      setTimeout(setLoading(true), 2000);
    })
  }, [tab])


  return (
    <div id='admin'>
      <div id='addBox'>
        <h2 style={{fontSize: '2vw'}}>관리자 페이지</h2> 
      </div>

      <Tab tab={tab} setTab={setTab} />

      <button id='addBtn' onClick={() => {
        contentIdStore.setEditState(false);
        props.history.push('/admin/edit');
      }}>
        <img id='addFileIcon' src={addIcon} />
      </button> 
      <DataList data={data} loading={loading} tab={tab}/>
    </div>
  )
})

// Components
function Tab({ tab, setTab }) {
  return (
    <div id='tabContainer'>
      <div id='adminTabBox'>
        {
          ['말씀', '소식'].map((ele, idx) => {
            return idx === tab[0]
          ? <div key={`tab_${idx}`} className='adminTab selected' onClick={() => setTab([idx, tab[1]])}>{ele}</div>
          : <div key={`tab_${idx}`} className='adminTab' onClick={() => {
              if (idx === 1) setTab([idx, 0])
              else setTab([idx, tab[1]])
            }}>{ele}</div>
          })
        }
      </div>
      { tab[0] === 0 ? (
        <div id='subTabBox'>
          {
            ['주일', '수요', '금요', '새벽', '기도수첩'].map((ele, idx) => {
              return idx === tab[1] 
              ? <div key={`subTab_${idx}`} className='subTab selected' onClick={() => setTab([tab[0], idx])}>{ele}</div>
              : <div key={`subTab_${idx}`} className='subTab' onClick={() => setTab([tab[0], idx])}>{ele}</div>
            })
          }
        </div>
        ) : (
          ['교회 사진'].map((ele, idx) => {
            return idx === tab[1] 
            ? <div key={`subTab_${idx}`} className='subTab selected' onClick={() => setTab([tab[0], idx])}>{ele}</div>
            : <div key={`subTab_${idx}`} className='subTab' onClick={() => setTab([tab[0], idx])}>{ele}</div>
          })
        )
      }
      <div className='extraDiv left'/>
      <div className='extraDiv right'/>
    </div>
  )
}

export default Admin;