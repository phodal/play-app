import React, {Component, PropTypes} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Loading from '../../wdui/loading/Loading';

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
        <View style={{backgroundColor: 'white'}}>
          <Text>{ item.title }</Text>
          <Text>{ item.description }</Text>
          <Text>{ item.updated }</Text>
          <Text>{ item.id }</Text>
          <Text>{ 'https://www.wandianshenme.com/static/media/' + item.featured_image }</Text>
          { item.featured_image
            ? <Image source={{
              uri: 'https://www.wandianshenme.com/static/media/' + item.featured_image,
              cache: 'only-if-cached'
            }}
                     style={{width: 400, height: 200}}
            />
            : <Text>{ item.featured_image }</Text>
          }
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    if (this.state.loading) {
      return <Loading text={'数据加载中'} />;
    }

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.data.results}
          renderItem={this.renderList}
        />
      </View>
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
