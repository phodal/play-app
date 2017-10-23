/* eslint-disable max-nested-callbacks */
import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import * as FormValidation from 'tcomb-form-native';
const Form = FormValidation.form.Form;

const window = Dimensions.get('window');

const User = FormValidation.struct({
  email: FormValidation.String,
  password: FormValidation.String
});

const options = {
  fields: {
    email: {
      label: '用户名',
      error: '请输入有效的用户名',
      autoCapitalize: 'none',
      clearButtonMode: 'while-editing'
    },
    password: {
      label: '密码',
      error: '密码应该太于六位',
      clearButtonMode: 'while-editing',
      secureTextEntry: true
    }
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Form
            ref={(form) => { this.form = form; }}
            type={User}
            options={options}
          />
          <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>登录</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: window.width,
    height: window.height
  },
  formContainer: {
    margin: 20
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
