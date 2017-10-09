import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet
} from 'react-native';
import HTMLView from 'react-native-htmlview';

import normalize from './helpers/normalizeText';

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
  pre: {
    padding: 5,
    backgroundColor: '#f8f8f8',
    fontSize: normalize(14)
  },
  code: {
    color: '#444',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    fontSize: normalize(14)
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
