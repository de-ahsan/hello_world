// import { combineReducers } from 'redux';

// const rootReducer = (state={}, action)=>{
// switch (action.type){
//   default:
//   return state
// }
// }

// export default rootReducer;

import { combineReducers } from 'redux';
import testReducer from './testReducer';

const rootReducer = combineReducers({ testReducer });

export default rootReducer;
