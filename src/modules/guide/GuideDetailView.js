import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PlayView from '../play/PlayView';
import { URL } from '../../constants';

class GuideDetailView extends Component {
  static displayName = 'GuideDetailView';

  static navigationOptions = {
    title: '指南',
    tabBarIcon: (props) => (
      <Icon name='explore' size={24} color={props.tintColor} />
    )
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    let navigation = this.props.navigation;
    const {params} = navigation.state;
    const slug = params.slug;
    const url = URL.PLAY + `?category=${slug}`;

    return (
      <PlayView navigation={navigation} url={url} />
    );
  }
}

export default GuideDetailView;
