import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class PlayDetailView extends Component {
  static displayName = 'PlayDetailView';

  static navigationOptions = ({navigation}) => ({
    title: `玩法: ${navigation.state.params.title}`
  });

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {params} = this.props.navigation.state;

    return (
      <View style={styles.container}>
        <Text>{ params.content }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default PlayDetailView;
