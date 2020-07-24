import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import Cards from './cards/components/Cards/Cards';

import {
  isAuthenticatedSelector, refreshTokenSelector,
  userIdSelector, tokenSelector, isTokenValidSelector,
} from './auth/redux/selectors';

import { login, logout } from './auth/redux';

import { showSpinnerSelector } from './common/redux/selectors';

import { setSettings, reverseSettings } from './settings/redux';

import { fetchJSON } from './common/utils';

import Toast from './common/components/Toast/Toast';
import Login from './auth/components/Login';
import Signup from './auth/components/Signup';
import Menu from './layout/components/Menu/Menu';
import About from './layout/components/About/About';
import styles from './App.module.css';
import Promo from './layout/components/Promo/Promo';
import Main from './layout/components/Main/Main';
import Statistics from './statistics/components/Statistics/Statistics';
import Dictionary from './dictionary/components/Dictionary/Dictionary';
import Settings from './settings/components/Settings/Settings';
import GamesPage from './layout/components/GamesPage/GamesPage';
import Speakit from './games/speakit/components/Speakit';

const publicRoutes = [
  {
    title: 'Страница авторизации',
    path: '/login',
    component: <Login />,
  },
  {
    title: 'Страница регистрации',
    path: '/signup',
    component: <Signup />,
  },
  {
    title: 'О команде',
    path: '/about',
    component: <About />,
  },
  {
    title: 'Промо',
    path: '/',
    component: <Promo />,
  },
];

function createPublicRoutes({ title, path, component }) {
  return (
    <Route key={title} exact path={path}>
      {component}
    </Route>
  );
}

createPublicRoutes.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

const privateRoutes = [
  {
    title: 'Профиль',
    path: '/profile',
  },
  {
    title: 'Настройки',
    path: '/settings',
    component: <Settings />,
  },
  {
    title: 'Игры',
    path: '/games',
    component: <GamesPage />,
  },
  {
    title: 'Speakit',
    path: '/games/speakit',
    component: <Speakit />,
  },
  {
    title: 'Карточки',
    path: '/cards',
    component: <Cards />,
  },
  {
    title: 'Словарь',
    path: '/dictionary',
    component: <Dictionary />,
  },
  {
    title: 'Статистика',
    path: '/statistics',
    component: <Statistics />,
  },
  {
    title: 'Главная страница',
    path: '/main',
    component: <Main />,
  },
];

function createPrivateRoute({ title, path, component }, isLogged) {
  if (!isLogged) return <Redirect key={title} to="/login" />;
  return (
    <Route key={title} exact path={path}>
      {component || (
        <div className={styles.PageName}>
          <h1>{title}</h1>
        </div>
      )}
    </Route>
  );
}

createPrivateRoute.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

const App = () => {
  const dispatch = useDispatch();

  // показывать ли спиннер
  const showSpinner = useSelector(showSpinnerSelector);

  const token = useSelector(tokenSelector);
  // есть ли у нас данные о пользователе
  const isLogged = useSelector(isAuthenticatedSelector);
  const isTokenValid = useSelector(isTokenValidSelector);
  const refreshToken = useSelector(refreshTokenSelector);
  const userId = useSelector(userIdSelector);

  useEffect(() => {
    if (!isTokenValid) dispatch(logout());
  }, [isTokenValid, dispatch]);

  useEffect(() => {
    // если пользователь залогинен и токен помер - обновляем токен
    const intervalId = setInterval(() => {
      if (isLogged) {
        const fetchOptions = {
          method: 'GET',
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${refreshToken}`,
            'Accept': 'application/json',
          },
        };
        const endpoint = `users/${userId}/tokens`;
        fetchJSON(endpoint, fetchOptions)
          .then((data) => dispatch(login(data)))
          .catch(() => dispatch(logout()));
      }
    }, 600000);
    return () => clearInterval(intervalId);
  }, [isLogged, refreshToken, userId, dispatch]);

  // запрос настроек
  useEffect(() => {
    const endpoint = `users/${userId}/settings`;
    fetchJSON(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    })
      .then(({ id, ...data }) => dispatch(setSettings(data)))
      .catch(() => dispatch(reverseSettings()));
  }, [dispatch, token, userId]);

  return (
    <Router>
      <Toast />
      <Switch>
        {publicRoutes.map(createPublicRoutes)}
        <Route>
          <Menu />
          {showSpinner && (
            <div className={styles.SpinnerBackdrop}>
              <Spinner
                className={styles.Spinner}
                animation="border"
                variant="primary"
              />
            </div>
          )}
          <Switch>
            {privateRoutes.map((el) => createPrivateRoute(el, isLogged))}
          </Switch>
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
