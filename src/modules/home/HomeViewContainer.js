import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HomeView from './HomeView';
import {NavigationActions} from 'react-navigation';
import * as CounterStateActions from '../home/CounterState';

export default connect(
  state => ({
    counter: state.getIn(['counter', 'value']),
    loading: state.getIn(['counter', 'loading'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      counterStateActions: bindActionCreators(CounterStateActions, dispatch)
    };
  }
)(HomeView);
