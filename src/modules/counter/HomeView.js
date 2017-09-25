import React, {Component, PropTypes} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import FastImage from 'react-native-fast-image';

import Loading from '../../wdui/loading/Loading';
import Card from '../../wdui/Card';

class HomeView extends Component {
  static displayName = 'HomeView';

  static navigationOptions = {
    title: '首页推荐',
    tabBarIcon: (props) => (
        <Icon name='home' size={24} color={props.tintColor} />
      )
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
        console.log(response);
        this.setState({
          data: response.data,
          loading: false
        });
      });
  }

  keyExtractor = (item, index) => `key${index}`;

  renderList = ({item}) => {
    console.log('https://www.wandianshenme.com/static/media/' + item.featured_image);
    return (
      <TouchableHighlight
        key={this.keyExtractor}>
        <Card
          title={ item.title }>
          <View>
            { item.featured_image
              ? <FastImage
                style={{width: 200, height: 100}}
                resizeMode={FastImage.resizeMode.center}
                source={{
                  uri: 'https://www.wandianshenme.com/static/media/' + item.featured_image
                }}
              />
              : <Text>{ item.featured_image }</Text>
            }
          </View>

          <Text style={{marginBottom: 10}}>
            { item.description }
          </Text>
        </Card>
      </TouchableHighlight>
    );
  };

  render() {
    if (this.state.loading) {
      return <Loading text={'数据加载中'} />;
    }

    return (
      <View style={styles.container}>
        <View>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.data.results}
            renderItem={this.renderList}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});

export default HomeView;
