import React, {Component, PropTypes} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Loading from '../../wdui/loading/Loading';

class HomeView extends Component {
  static displayName = 'HomeView';

  static navigationOptions = {
    title: '首页推荐',
    tabBar: {
      icon: (props) => (
        <Icon name='home' size={24} color={props.tintColor} />
      )
    }
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      loading: true,
      data: []
    };
  }

  componentWillMount() {
    axios.get('https://www.wandianshenme.com/api/play/')
      .then(response => {
        this.setState({
          data: response.data,
          loading: false
        });
      });
  }

  render() {

    if (this.state.loading) {
      console.log(this.state.loading)
      return <Loading text={'数据加载中'} />;
    }

    return (
      <View style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});

export default HomeView;
