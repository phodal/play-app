import {Map} from 'immutable';

export const RESET_STATE = 'LoginState/RESET';
export const INITIALIZE_STATE = 'LoginState/INITIALIZE';

const initialState = Map({
  isLogin: false,
  token: ''
});

export default function AccountStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case INITIALIZE_STATE:
    case RESET_STATE:
      return state.set('isLogin', true);
    default:
      return state;
  }
}
