import axios from 'axios';

export const signup = async(id, pw) => {
  const result = await axios({
    url: 'http://localhost:4000/graphql',
    method: 'POST',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
      mutation {
        signup (
          nickname: ${id}
          password: ${pw}
        )
      }
      `
    }
  })
}

export const signin = async(id, pw) => {
  console.log('id, pw: ', id, pw);
  const result = await axios({
    url: 'http://localhost:4000/graphql',
    method: 'POST',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
      query {
        signin (
        nickname: "${id}"
        password: "${pw}"
        )
      }
      `
    }
  })
  return result.data.data.signin;
}

export const isSignin = async() => {
  const result = await axios({
    url: 'http://localhost:4000/graphql',
    method: 'POST',
    withCredentials: true,
    data: {
      query: `
      query {
        isSignin
      }
      `
    }
  })
  return result.data.data.isSignin;
}

export const signout = async() => {
  const result = await axios({
    url: 'http://localhost:4000/graphql',
    method: 'POST',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
      query {
        signout
      }
      `
    }
  })
  return result.data.data.signout;
}

export const addData = async(category, title, content, dateNow, verse, thumbnail) => {
  const result = await axios({
    url: 'http://localhost:4000/graphql',
    method: 'POST',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
      mutation {
        addContent(
          category: "${category}"
          title: "${title}"
          content: ${JSON.stringify(content)}
          datetime: "${dateNow}"
          verse: "${verse}"
          thumbnail: "${thumbnail}"
        ) 
      }
      `
    }
  })
  return result
}

export const updateData = async(id, category, title, content, dateNow, verse, thumbnail) => {
  console.log('id, category, title, content: ', id, category, title, verse);
  return await axios({
    url: 'http://localhost:4000/graphql',
    method: 'POST',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
      mutation {
        updateContent (
          id: ${id}
          category: "${category}"
          title: "${title}"
          content: ${JSON.stringify(content)}
          datetime: "${dateNow}"
          verse: "${verse}"
          thumbnail: "${thumbnail}"
        ) 
      }
      `
    }
  })
}

export const deleteData = async(id, callback) => {
  const result = await axios({
    url: 'http://localhost:4000/graphql',
    method: 'DELETE',
    withCredentials : true,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
        mutation {
          deleteContent(id: ${id})
        }
      `
    }
  })

  if (result.data.data.deleteContent) {
    alert('삭제되었습니다.');
    callback(true);
  }
}

export const getContent = async( id, callback ) => {
  const content = await axios({
    url: 'http://localhost:4000/graphql',
    method: 'GET',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      query: `
      {
        getContent(id: ${id}) {
          title
          detailId
          createdAt
          verse
          thumbnail
          content {
            content
          }
        }
      }
      `
    }
  });
  console.log(content.data.data.getContent);
  callback(content.data.data.getContent);
}

export const getDataList = async(category, detail, callback) => {
  try {
    const data = await axios({
      url: 'http://localhost:4000/graphql',
      method: 'GET',
      withCredentials : true,
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        query: `
        {
          getCategory (
            category: ${++category}
            detail: ${++detail}
          ) {
            id
            createdAt
            title
            verse
            thumbnail
          }
        }
        `
      }
    });
    callback(data.data.data.getCategory);
  } catch (err) {
    alert(err);
  }
}

export const uploadImage = async(file, callback) => {
  let formData = new FormData();
  await formData.append("img", file);

  const imgUrl = await axios.post('http://localhost:4000/post/img', formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  })

  callback(imgUrl)
}

export const readImage = async(files, targetId) => {
  for (let file of files) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async(event) => {
      let preview = document.createElement('div');
      preview.style.textAlign = 'center';
      preview.innerHTML = `<img class='loading' src="${event.target.result}">`;
      await document.getElementById(targetId).appendChild(preview);
      let previews = document.getElementsByClassName('loading');
      let targetPreview = previews[previews.length -1];
      let pos = targetPreview.getBoundingClientRect();
      let top = pos.top + pos.height / 2 - 25 + window.scrollY;
      let left = pos.left + pos.width / 2 - 25;
  
      let loadingIcon = `
        <img class='loadingIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/loading.gif' 
        style='top: ${top}px; left: ${left}px;' />
      `;
      targetPreview.insertAdjacentHTML('afterend', loadingIcon);
    }
  }

  for (let file of files) {
    uploadImage(file, (result) => {
      let loadings = document.getElementsByClassName('loading');
      let img = document.createElement('img');
      img.className = 'image';
      img.src = result.data;
      img.style.width = '20vw';
      let wrapperDiv = document.createElement('div');
      wrapperDiv.style.textAlign = 'center';
      wrapperDiv.appendChild(img)

      loadings[0].parentElement.replaceChild(wrapperDiv, loadings[0]);
      document.getElementsByClassName('loadingIcon')[0].remove();
    }); 
  }
}

export const getLiveUrl = async(callback) => {
  const resultUrl = await axios.get('http://localhost:4000/live');
  callback(resultUrl);
}

export const postLiveUrl = async(url, callback) => {
  const resultMsg = await axios({
    url: 'http://localhost:4000/live',
    method: 'post',
    withCredentials : true,
    headers: {
      'Content-Type': 'application/json',
    },
    params: { url }
  })

  console.log('resultMsg: ', resultMsg);
}

export const getBibleVerse = async(book, chapterA, verseA, chapterB, verseB, callback) => {
  try {
    const data = await axios({
      url: 'http://localhost:4000/graphql',
      method: 'GET',
      withCredentials : true,
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        query: `
        {
          getBible (
            book: ${book}
            chapterA: ${chapterA}
            chapterB: ${chapterB}
            ${
              verseA ? (
              `verseA: ${verseA}
               verseB: ${verseB}`
              ) : ''
            }
          ) {
            book
            chapter
            verse
            content
          }
        }
        `
      }
    });
    callback(data.data.data.getBible)
  } catch (err) {
    console.log(err);
  }
}
