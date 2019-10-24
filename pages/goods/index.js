import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import withStyles from 'isomorphic-style-loader/withStyles'
import { getList } from '../../store';
import styles from './index.scss';

const Goods = ({ match, list, route, dispatch }) => {

  const [value, setValue] = useState(1);
  useEffect(() => {
    console.log(window._serverRouter, match.path)
    if (window._serverRouter !== match.path) {
      console.log('load data ajax')
      dispatch(getList())
    } else {
      window._serverRouter = undefined
    }
  }, [])
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
Goods.getInitialProps = function (store) {
  return store.dispatch(getList())
}
const Styled = withStyles(styles)(Goods)
export default connect(
  (state) => {
    return { list: state.index.list }
  },
  (dispatch) => ({ getList, dispatch })
)(Styled);