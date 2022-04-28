import logo from './logo.svg';
import { Navbar,Container,Nav,NavDropdown,Button } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import './App.css';
// import 작명 from '경로';
import Data from './data.js';
import Detail from './detail.js';
import Cart from './cart.js';
// router 세팅
import {Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
// 1. contextAPI 만들기(props값 공유), 다른파일 공유시 export 입력
export let 재고context = React.createContext();

function App() {

  let [shoes, shoes변경] = useState(Data);
  // Detail.js 안의 재고데이터를 바인딩하기!(props 2번 쓰기)
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">
      {/* 리액트부트스트랩 들어가서 복붙시, 위 import,export 기입! 
      중요한 데이터는 App 컴포넌트에 보관하는게 관리하기 편하다! */}
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand><Link to="/">React-Bootstrap</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* router 기능 중 하나 link to = href
            링크이동이 안되면 index.js를 리액트 17버전으로 변경하자. 
            또는 <Link>대신 as={Link}로 변경해주세요 */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>

      {/* 본격 뭉탱이 만들기, exact : 경로겹침방지 */}
      {/* Switch : 해당링크 이동시 그 페이지 중 가장 윗상단만 보여주세요 */}
      <Switch>
        <Route exact path="/">
          {/* html 추가 가능 
          메인페이지일 때 div영역을 추가해주세요 */}
          <div className="jumbotron">
            <h1>20% Season Off</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </div>
          <div className="container">
            {/* 2. 같은 값을 공유할 HTML을 범위로 싸매기 value={공유할 state값} */}
            <재고context.Provider value={재고}>

            <div className="row">
            {
              shoes.map((a,i)=>{
                return <상품 shoes={shoes[i]} i={i} key={i}/>
              })
            }
            </div>

            </재고context.Provider>

            {/* 1. npm install axios */}
            <button className="btn btn-primary" onClick={() => {
              // axios.post('서버URL', { id : 'codingapple', pw : 1234 })
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result) => {
                console.log(result.data);
                shoes변경( [...shoes, ...result.data] );
              })
              .catch(() => {
                console.log('실패했어요')
              })
            }}>더보기</button>
          </div>
        </Route>
        {/* /detail/:작명(파라미터) 페이지로 이동하면 html보여주기 */}
        <Route path="/detail/:id">
           {/* 컴포넌트 파일 생성(detail.js)
              import 해오는거 잊지 말기 ! 
              App.js 안의 Detail.js 재고데이터 넣기 */}
          <재고context.Provider value={재고}>
            <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
          </재고context.Provider>
        </Route>
        {/* <Route path="/어쩌구" component={Modal}></Route> component도 추가가능 */}
        
        {/* 1. npm install redux react-redux 
        2. index.js 가서 import 코드 짜기
        3. <Provider>로 <App>감싸기 
        4. createStore() 안에 state 저장 
        5. provider 태그 안에 store 넣기
        6. cart.js에서 function 만들기
        7. export default connect(함수명)(연결할JS파일명)
        8. store데이터를 props로 등록하기 */}
        <Route path="/cart">
          <Cart />
        </Route>


        <Route path="/:id">
          <div>아무거나적었을때 이거 보여주셈</div> {/* switch에 의해 안보여져야 함! */}
        </Route>
      </Switch>


      {/* 라우팅(페이지 나누기)
      1. npm install react-router-dom@5.2.0 설치
      2. index.js에 import { BrowserRouter } from 'react-router-dom';
      3. <BrowserRouter> or <HashBrowser>(#기호들어감, 안전하게 테스트 가능)태그로 감싸기 
      4. app.js 돌아가서 import 세팅하기 */}
    </div>
  );
}

function 상품(props){

  return (
    <div className="col-md-4">
      <img src={ `https://codingapple1.github.io/shop/shoes${props.i+1}.jpg` } width="100%"/>
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content } & { props.shoes.price } </p>
      <Test></Test>

    </div>
  )
}

function Test(){
  // 3. useContext(범위이름)로 공유된값 사용하기
  let 재고 = useContext(재고context);
  return <p>재고 : {재고}</p>
}


export default App;
