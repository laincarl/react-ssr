import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { getList } from '../../store';
import styles from './index.scss';
import withSSR from '../../utils/withSSR'
const Goods = ({ match, list, route, dispatch }) => {

  const [value, setValue] = useState(1);
  return <div className="goods">
    List2
    <Link to="/goods/detail/5">detail</Link>
    <span>{value}</span>
    <button onClick={() => setValue(value + 1)}>add</button>
    <ul>
      {list.map(({ id, name }) => <li key={id}>{name}</li>)}
    </ul>
    {renderRoutes(route.routes, { someProp: "these extra props are optional" })}
  </div>
}
Goods.getInitialProps = async function (store) {
  await store.dispatch(getList())
  return {}
}
const Connected = connect(
  (state) => {
    return { list: state.index.list }
  },
  (dispatch) => ({ getList, dispatch })
)(Goods);

export default withSSR(styles)(Connected);