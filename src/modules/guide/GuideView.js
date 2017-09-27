import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Dimensions, FlatList, StyleSheet, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Loading from '../../wdui/loading/Loading';
import {URL} from '../../constants';
import FastImage from 'react-native-fast-image';

const deviceWidth = Dimensions.get('window').width;

class GuideView extends Component {
  static displayName = 'GuideView';

  static navigationOptions = {
    title: '指南',
    tabBarIcon: (props) => (
      <Icon name='explore' size={24} color={props.tintColor} />
    )
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      loading: true,
      isRefreshing: false,
      loadingMore: false,
      data: []
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  onRefresh() {
    this.setState({
      isRefreshing: true
    });
    this.fetchData();
  }

  fetchData() {
    this.setState({
      loading: true
    });
    axios.get(URL.CATEGORY)
      .then(response => {
        this.setState({
          data: response.data,
          plays: response.data.results,
          isRefreshing: false,
          loading: false
        });
      });
  }

  keyExtractor = (item, index) => `key${index}`;

  renderList = ({item}) => {
    const {navigate} = this.props.navigation;
    return (
      <TouchableHighlight
        onPress={() => navigate('PlayDetailView', item)}
        key={this.keyExtractor}>
        <View style={{paddingBottom: 15}}>
          { item.make && item.make.featured_image
            ? <FastImage
              style={{width: deviceWidth, height: deviceWidth * 0.4}}
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: URL.IMAGE_BASE + item.make.featured_image
              }}
            />
            : <View />
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
        <ScrollView style={{paddingTop: 15}}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.plays}
            refreshing={this.state.isRefreshing}
            renderItem={this.renderList}
            onRefresh={this.onRefresh.bind(this)}
          />
        </ScrollView>
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

export default GuideView;
