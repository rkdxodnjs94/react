// 컴포넌트 파일 생성식 import react 꼭 하기
import React, { useContext, useEffect, useState } from 'react';
// history, 파라미터 세팅
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './detail.scss';
// export한 값
import { 재고context } from './App.js';
import { Nav } from 'react-bootstrap';
// animation 추가
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

let 박스 = styled.div`
  padding: 20px;
`;
let 제목 = styled.h4`
  font-size : 25px;
  color : ${ props => props.색상 }
`;

function Detail(props){
    let [alert, alert변경] = useState(true);
    let [inputData, inputData변경] = useState(''); 
   // Detail 함수 실행하자마자 코드 실행해주세요
   // useEffect는 여러개 써도 상관없고, 맨위부터 실행된다.
    let 재고 = useContext(재고context);

    let [누른탭, 누른탭변경] = useState(0);
    let [스위치, 스위치변경] = useState(false);

    useEffect(() => {
      let 타이머 = setTimeout(()=>{
        alert변경(false)
      },3000);
      return ()=>{ clearTimeout(타이머) }
      // Detail함수 종료(다른페이지로 이동)하고나서 코드 실행해주세요
      // return function 함수(){}
      // []은 실행조건으로, state값을 넣었을때 실행해달라고 명령할 수 있음.
      // []만 넣으면 아무조건이 없으므로 Detail함수 1번 실행할때만 발동함.
    },[]);

    // /detail/:id에 있던 변수
    let { id } = useParams();
    // 메인에 가격순정렬했음에도 상세페이지에서 id:0인 데이터를 절대적으로 보여주고 싶을 때
    // find : arr 안에 원하는 자료 찾을 때 사용
    let 찾은상품 = props.shoes.find(function(상품){
      return 상품.id == id
    });
    // history 세팅, useHistory: 방문기록 등을 저장해놓는 obj
    let history = useHistory();

    return (
      <div className="container">
        {/* styled-component */}
        <박스>
          <제목 className="red">Detail</제목>
          <제목 색상="blue">Detail</제목>
        </박스>

        <input onChange={(e) => {
          inputData변경(e.target.value)
        }}/>

        {
          alert === true 
          ? <div className="my-alert">
             <p>재고가 얼마 남지 않았습니다.</p>
            </div>
          : null 
        }
        <div className="row">
          <div className="col-md-6">
            <img src={`https://codingapple1.github.io/shop/shoes${찾은상품.id+1}.jpg`} width="100%" />
          </div>
          
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{ 찾은상품.title }</h4>
            <p>{ 찾은상품.content }</p>
            <p>{ 찾은상품.price }원</p>
            {/* detail.js 안의 props중 재고데이터를 가져오기 */}
            <Info 재고={props.재고}/>
            {/* context API 결과물 */}
            {재고}

            <button className="btn btn-danger" onClick={() => {
              props.재고변경([9,10,11]);
              props.dispatch({ type : '항목추가', payload : {id:2, name:'새로운상품', quan:1} });
              // 개발환경에서 페이지이동시 강제새로고침 방지(주문눌렀던 arr가 사라짐)
              history.push('/cart');
            }}>주문하기</button> 
            <button className="btn btn-danger" onClick={(e)=>{
              e.stopPropagation();
              history.goBack(); // 자세한건 리액트 라우터 라이브러리 참조
            //history.push('/'); /라는 경로로 이동해주세요
            }}>뒤로가기</button> 
          </div>

        </div>
        {/* defaultkey : 기본으로 눌러진 버튼의 eventkey */}
        <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            {/* 유니크한 eventkey 부여 */}
            <Nav.Link eventKey="link-0" onClick={() => {
              스위치변경(false); 누른탭변경(0);
            }}>Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={() => {
              스위치변경(false); 누른탭변경(1);
            }}>Option 2</Nav.Link>
          </Nav.Item> 
        </Nav>
        {/* 감싸주기!, in(애니메이션 켜는 스위치, 보통 변수로 저장), 
        classNames(작명), 동작시간(ms), 구체적 디자인은 css가서 할 것 */}
        <CSSTransition in={스위치} classNames="wow" timeout={500}>
          <TabContent 누른탭={누른탭} 스위치변경={스위치변경}/>
        </CSSTransition>

      </div>
    )
}

function Info(props){
  return (
    // props.재고 : props.props.재고
    <p>재고 : {props.재고} </p>
  )
}
// if 경우수가 3개 이상일 때!
// animation 주기 귀찮아? npm install react-transition-group
function TabContent(props){

  useEffect(() => {
    props.스위치변경(true);
  })

  if (props.누른탭 === 0) {
    return <div>0번째 내용입니다.</div>
  } else if (props.누른탭 === 1) {
    return <div>1번째 내용입니다.</div>
  } else if (props.누른탭 === 2) {
    return <div>2번째 내용입니다.</div>
  }
}

function state를props화(state){
  return {
    state : state.reducer,
    alert열렸니 : state.reducer2
  }
}  
// 마지막으로 장식하기!(connect시 import 확인)
export default connect(state를props화)(Detail);
