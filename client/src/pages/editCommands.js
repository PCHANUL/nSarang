export const commandPos = {
  B: 0,
  I: 1,
  U: 2,
  align: {
    left: 3,
    center: 4,
    right: 5,
  },
  UL: 6,
  OL: 7,
  H1: 0,
  H3: 0,
  H6: 0
}

export const paragraphCommands = {
  P: '본문',
  H1: '제목', 
  H3: '부제목', 
  BLOCKQUOTE: '인용구', 
}

export const fontCommands = {
  'NanumBarunGothic' : '기본서체',
  'Wemakeprice-Bold' : '위메프체',
  'Arita-dotum-Medium' : '아리따돋움',
  'Chosunilbo_myungjo' : '조선일보명조',
  'MapoGoldenPier' : '마포금빛나루',
}

export const commands = {
  font: [
    {
      cmd: 'bold',
      icon: '굵게',
      src: 'bold',
      style: 'B'
    },
    {
      cmd: 'italic',
      icon: '이텔릭체',
      src: 'italic',
      style: 'I'
    },
    {
      cmd: 'underline',
      icon: '밑줄',
      src: 'underline',
      style: 'U'
    },
  ],
  align: [
    {
      cmd: 'justifyLeft',
      icon: '좌측정렬',
      src: 'align-left',
      style: 'text-align: left;'
    },
    {
      cmd: 'justifycenter',
      icon: '가운데정렬',
      src: 'align-center',
      style: 'text-align: center;'
    },
    {
      cmd: 'justifyRight',
      icon: '우측정렬',
      src: 'align-right',
      style: 'text-align: right;'
    },
  ],
  list: [
    {
      cmd: 'insertUnorderedList',
      icon: '목록',
      src: 'dotList',
      style: 'UL'
    },
    {
      cmd: 'insertOrderedList',
      icon: '숫자목록',
      src: 'numList',
      style: 'OL'
    },
    {
      cmd: 'createLink',
      icon: '링크',
      src: 'link',
    },
  ],
}
