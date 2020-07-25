import React, { useState, useEffect, useCallback } from 'react';
import getData from './common/fetch';

import AppStyle from './AppStyle';

export default () => {
  const [mode, setMode] = useState('users');
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentAlbums, setCurrentAlbums] = useState();
  const [currentPhoto, setCurrentPhoto] = useState();
  const [modalWindow, setModalWindow] = useState(false);


  useEffect(() => {
    if (mode === 'users') {
      getData('users').then((req) => setData(req));
    }

    if (mode === 'userAlbums') {
      getData(`users/${currentUser}/albums`).then((req) => setData(req));
    }

    if (mode === 'album') {
      getData(`albums/${currentAlbums}/photos`).then((req) => setData(req));
    }
  }, [mode]);

  const userСhoice = useCallback((id) => {
    setCurrentUser(id);
    setMode('userAlbums');
  }, []);

  const toUsers = useCallback(() => {
    setData([]);
    setCurrentUser(null);
    setMode('users');
  }, []);

  const albumСhoice = useCallback((id) => {
    setCurrentAlbums(id);
    setMode('album');
  }, []);

  const toUsersAlbums = useCallback(() => {
    setData([]);
    setCurrentAlbums(null);
    setMode('userAlbums');
  }, []);

  const photoСhoice = useCallback((id) => {
    setCurrentPhoto(id);
    setModalWindow(true);
  }, []);

  const closeModalWindow = useCallback(() => {
    setCurrentPhoto(null);
    setModalWindow(false);
  }, []);

  const leftSlide = useCallback(() => {
    if (currentPhoto > 0) setCurrentPhoto(currentPhoto - 1);
  }, [currentPhoto]);

  const rightSlide = useCallback(() => {
    if (currentPhoto < data.length-1) setCurrentPhoto(currentPhoto + 1);
  }, [currentPhoto, data]);

  console.log(data);

  return (
    <AppStyle>
      {mode === 'users'
        ? (
          <ul>
            {data.length > 0 ? data.map((el) => {
              const { id, name, username, company } = el;
              return (
                <li key={id} onClick={() => userСhoice(id)}>
                  <h3><span>Author</span> - {id}</h3>
                  <p><span>Name</span> - {name}</p>
                  <p><span>Nickname</span> - {username}</p>
                  <p><span>Company</span> - {company.name}</p>
                </li>
              )
            }) : <li>no users</li>}
          </ul>
        )
        : mode === 'userAlbums'
          ? (
            <React.Fragment>
              <h2>Author - {currentUser}</h2>
              <ul>
                {data.length > 0 ? data.map((el) => {
                  const { id, title } = el;
                  return (
                    <li key={id} onClick={() => albumСhoice(id)}>
                      <h3><span>Title album</span> - {title}</h3>
                    </li>
                  )
                }) : <li>no albums</li>}
              </ul>
              <button onClick={toUsers}>Назад</button>
            </React.Fragment>
          )
          : mode === 'album'
            ? (
              <React.Fragment>
                <h2>Author - {currentUser}</h2>
                <h2>Album - {currentAlbums}</h2>
                <ul>
                  {data.length > 0 ? data.map((el, index) => {
                    const { id, url, title } = el;
                    return (
                      <li key={id} onClick={() => photoСhoice(index)}>
                        <img src={url}></img>
                        <p><span>Title</span> - {title}</p>
                      </li>
                    )
                  }) : <li>no images</li>}
                </ul>
                <button onClick={toUsersAlbums}>Назад</button>
              </React.Fragment>
            )
            : <p>Sorry, we have some problem</p>}
      {modalWindow
        ? (
          <div className='modal-window'>
            <button className='button-close-modal-window' onClick={closeModalWindow}>Закрыть</button>
            <div className='modal-window__container'>
              <div className='left-slid' onClick={leftSlide}><p>Влево</p></div>
              <img src={data[currentPhoto].url}></img>
              <div className='right-slid' onClick={rightSlide}><p>Вправо</p></div>
            </div>
          </div>
        )
        : null}
    </AppStyle>
  );
};
