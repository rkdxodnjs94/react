import React from 'react';
import { Table } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';

function Cart(props) {
  // redux 내의 모든 state 소환하는 함수 state.reducer만 추출 가능
  let state = useSelector((state)=> state);
  let dispatch = useDispatch();
  return (
    <div>

      <Table responsive="sm">
        <thead>
        <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
        </tr>
        </thead>
        <tbody>
        {
          // props.state.map((a,i) => {
          state.reducer.map((a,i) => {
            return (
              <tr key={i}>
                  <td>{ a.id }</td>
                  <td>{ a.name }</td>
                  <td>{ a.quan }</td>
                  <td><button onClick={() => {
                    // dispatch 안에 전송할 데이터를 추가할 수 있음.(액션 파라미터로 저장)
                    // props.dispatch({ type : '수량증가', payload : { name : 'kim'} })
                    dispatch({ type : '수량증가', payload : { name : 'kim'} })
                  }}>+</button></td>
                  <td><button onClick={() => {
                    // props.dispatch({type : '수량감소'})
                    dispatch({type : '수량감소'})
                  }}>-</button></td>
              </tr>
            )
          })
        }
        </tbody>
      </Table>
      {
        props.alert열렸니 === true
        ? <div className="my-alert2">
            <p>지금 구매하시면 신규할인 20%</p>
            <button onClick={() => {
              props.dispatch({type : 'alert닫기' })
            }}>닫기</button>
          </div>
        : null

      }

    </div>
  )
}

// function state를props화(state){
//   return {
//     // 상품명 : state.name
//     // store의 모든 데이터 가져오 기
//     state : state.reducer,
//     alert열렸니 : state.reducer2
//   }
// }

// export default connect(state를props화)(Cart)
export default Cart;