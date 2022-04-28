import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';

// reducer에서 다른 데이터 다룰 때는 따로 만들 것
let alert초기값 = true;
function reducer2(state = alert초기값, 액션) {
  if (액션.type === 'alert닫기') {
    state = false;
    return state;
  } else {
    return state;
  }
}

// redux로 데이터 수정하기(주의할점 : 리스트 선언시, store순서랑 꼬이지않기)
let 초기값 = [
  {id : 0, name : '멋진신발', quan : 2},
  {id : 1, name : '멋진신발2', quan : 1} 
];

// 1. createStore안에 reducer 넣고(아무일 없으면 걍 return)
// 2. reducer 함수 안에 상황에 맞는 조건문 생성
// 3. cart.js에서 props.dispatch({액션 : '???'})
function reducer(state = 초기값, 액션) {
  // state = 기본state(default 파라미터문법, 초기값을 넣고 싶을 떄)
  if ( 액션.type === '항목추가' ) {
    let copy = [...state];
    copy.push(액션.payload);
    return copy
  }
  else if ( 액션.type === '수량증가' ) {
    let copy = [...state];
    copy[0].quan++;
    return copy; // 수정된state
  } else if ( 액션.type === '수량감소'){
    let copy = [...state];
    copy[0].quan--;
    if (copy[0].quan < 0 ) {
      copy[0].quan = 0;
      return copy;
    } 
    return copy;
  } else { // 아무런 일이 안일어날시
    return state;
  }
}

// state 초기값을 store에 저장, 복수로 할 때 combineReducers import 확인
// combine 하고나서 cart.js의 function 확인!
let store = createStore(combineReducers({reducer,reducer2}));


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
