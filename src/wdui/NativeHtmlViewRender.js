import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import HTMLView from 'react-native-htmlview';
const deviceWidth = Dimensions.get('window').width;

import normalize from './helpers/normalizeText';

// TODO: add syntax-highlighter support
// eslint-disable-next-line consistent-return,no-unused-vars
function renderNode(node, index, siblings, parent, defaultRenderer) {
  if (node.name === 'img') {
    return (
      <Image
        key={index}
        style={{flex: 1, width: deviceWidth, height: deviceWidth * 0.6, resizeMode: 'cover'}}
        source={{
          uri: node.attribs.src
        }}
      />
    );
  }
}

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
          renderNode={renderNode}
          addLineBreaks={false}
        />
    );
  }
}

const styles = StyleSheet.create({
  pre: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    fontSize: normalize(12)
  },
  code: {
    color: '#444',
    borderRadius: 5
  },
  htmlView: {
    padding: 10,
    backgroundColor: '#fff'
  },
  a: {
    color: '#1abc9c',
    fontSize: normalize(14)
  },
  li: {
    color: '#384452',
    fontSize: normalize(14)
  },
  p: {
    color: '#384452',
    marginTop: 0,
    marginBottom: 0,
    fontSize: normalize(14)
  },
  h1: {fontWeight: '500', fontSize: normalize(24), color: '#384452'},
  h2: {fontWeight: '500', fontSize: normalize(22), color: '#384452'},
  h3: {fontWeight: '500', fontSize: normalize(20), color: '#384452'},
  h4: {fontWeight: '500', fontSize: normalize(18), color: '#384452'},
  h5: {fontWeight: '500', fontSize: normalize(16), color: '#384452'},
  h6: {fontWeight: '500', fontSize: normalize(14), color: '#384452'}
});

export default NativeHtmlViewRender;
