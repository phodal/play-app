import React, {PropTypes, Component} from 'react';
import {
  StyleSheet
} from 'react-native';
import HTMLView from 'react-native-htmlview';

class NativeHtmlViewRender extends Component {
  static propTypes = {
    html: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {html} = this.props;

    return (
        <HTMLView
          value={html}
          style={styles.htmlView}
          stylesheet={styles}
          addLineBreaks={false}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  pre: {
    padding: 5,
    backgroundColor: '#f8f8f8'
  },
  code: {
    color: '#444',
    backgroundColor: '#f0f0f0',
    borderRadius: 5
  },
  htmlView: {
    padding: 10
  },
  a: {
    color: '#1abc9c'
  },
  li: {
    color: '#384452'
  },
  p: {
    color: '#384452',
    marginTop: 0,
    marginBottom: 0
  },
  h1: {fontWeight: '500', fontSize: 24, color: '#384452'},
  h2: {fontWeight: '500', fontSize: 20, color: '#384452'},
  h3: {fontWeight: '500', fontSize: 18, color: '#384452'},
  h4: {fontWeight: '500', fontSize: 16, color: '#384452'},
  h5: {fontWeight: '500', fontSize: 14, color: '#384452'},
  h6: {fontWeight: '500', fontSize: 12, color: '#384452'}
});

export default NativeHtmlViewRender;
