import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getList } from '../store'
const List = ({ list }) => {
  const [value, setValue] = useState(1);
  return <div>
    List
    <span>{value}</span>
    <button onClick={() => setValue(value + 1)}>add</button>
    <ul>
      {list.map(({ id, name }) => <li key={id}>{name}</li>)}
    </ul>
  </div>
}
List.load = function (store) {
  return store.dispatch(getList())
}
export default connect((state) => {
  return { list: state.index.list }
}, { getList })(List);