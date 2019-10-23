import { dispatch } from 'redux';

const SET_LIST = 'SET_LIST';

function setList(list) {
  return {
    type: SET_LIST,
    list
  }
}
export function getList() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([{
          id: 1,
          name: 'wang'
        }, {
          id: 2,
          name: 'feng'
        }])
      }, 3000)
    }).then((list) => {
      dispatch(setList(list))
    })
  }
}
const defaultState = {
  list: []
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_LIST: {
      return {
        ...state,
        list: action.list
      }
    }    
    default: return state
  }
} 