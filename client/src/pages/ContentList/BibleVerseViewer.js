import React, { useEffect, useState } from 'react';
import { bibleVerse } from './bibleVerse';
import { Button } from './Button';

import { getBibleVerse } from '../axiosRequest';

export default function BibleVerseViewer(props) {
  const { verse } = props;
  const [isClicked, setClicked] = useState(false);
  const [isHover, setHover] = useState(false);
  const [bibleContent, setBibleContent] = useState([]);

  useEffect(() => {
    if (verse) {
      let bookName = getFirstVerse(verse);
      let result = []
      bookName[1].split('-').map((item) => {
        item.split(':').forEach(element => result.push(Number(element)));
      });

      // getBibleVerse(book, chapterA, verseA, chapterB, verseB, callback)
      getBibleVerse (
        bibleVerse[bookName[0]],     
        result[0], 
        result[1],
        result.length === 4 ? result[2] : result[0], 
        result[result.length - 1], 
        (result) => setBibleContent(result)
      )
    }
  }, [verse])
 
  // 성경구절을 클릭하거나 마우스를 올리면 텍스트가 나온다.
  // 모바일 환경에서는 클릭
  // 닫기 버튼을 추가시킨다.


  return (
    <>
      {
        verse.length !== 0 &&
        <>
          <div 
            className={`bibleVerse ${isClicked ? 'clickedVerse' : ''}`} 
            onClick={(e) => clickViewer(e, isClicked, setClicked)}
          >
            <div>{verse}</div>
          </div>
          {
            isClicked ? (
              <>
                <div className='viewerBackground' onClick={() => setClicked(!isClicked)}></div>
                <BibleViewer bibleContent={bibleContent} />
                <Button className='closeVerse' onClick={() => setClicked(!isClicked)}>닫기</Button>
              </>
            ) : <></>
          }
        </>
      }
    </>
  )
}

const getFirstVerse = (str) => {
  for (let i in str) {
    if (Number(str[i])) {
      return [str.slice(0, i), str.slice(i)];
    }
  }
}

const clickViewer = (e, isClicked, setClicked) => {
  e.persist();
  if (window.innerWidth < 640 && !isClicked) {
    let scroll, prevPos;

    scroll = async() => {
      let targetPos = await e.target.getBoundingClientRect().top;

      if (140 < targetPos && targetPos < 150) return;  // 종료조건 1
      else if (prevPos === targetPos) return;          // 종료조건 2

      window.scrollTo({top: targetPos > 145 ? window.scrollY + 10 : window.scrollY - 10});
      prevPos = targetPos;  // 이전위치저장

      setTimeout(() => scroll(), 20);
    };

    scroll();
  }
  setClicked(!isClicked);
}

const BibleViewer = (props) => {
  const { bibleContent } = props;

  return (
    <div className='bibleViewer'>
      {
        bibleContent.map((item, i) => {
          return <p key={i}>{`${item.chapter}:${item.verse} ${item.content}`}</p>
        })
      }
    </div>
  )
}