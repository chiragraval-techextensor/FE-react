import * as actionType from '../actions/actionTypes';

const initialState = {
    user: 'Noor'
}

const reducer = (state = initialState, action) => {
  // switch (action.type){
  //   case actionType.UPDATE_CONDITION:
  //     return {
        
  //       ...state,
  //       addConditions: true,
  //       optionValue: action.evt
  //     }
  //   default:
  //     return {
  //       state
  //     }
  // }
  return state
}

export default reducer;