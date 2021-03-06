import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Button } from 'react-native';
import { emailChanged, passwordChanged, loginUser, listenToAuthStateChanged } from '../actions';
import { Card, CardSection, Input, Spinner } from '.';
import styles from './styles';

let firstMount = true;

class LoginForm extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  componentWillMount() {
    if (firstMount) {
      this.props.listenToAuthStateChanged();
      firstMount = false;
    }
  }

  renderError() {
    if (this.props.error) {
      return (
        <CardSection>
          <Text style={styles.errorText}>
            {this.props.error}
          </Text>
        </CardSection>
      );
    }
    return undefined;
  }

  renderButtonOrSpinner() {
    if (this.props.loading) {
      return (
        <Spinner size="small" />
      );
    }
    return (
      <Button
        title="Log in"
        onPress={() => this.props.loginUser({
          email: this.props.email,
          password: this.props.password
        })}
      />
    );
  }

  render() {
    if (this.props.user === 'unknown') {
      return (
        <Card>
          <CardSection>
            <Spinner />
          </CardSection>
        </Card>
      );
    }
    return (
      <Card>
        <CardSection>
          <Input
            label="E-mail"
            onChangeText={text => this.props.emailChanged(text)}
            value={this.props.email}
            autoCorrect={false}
            placeholder="your_email@server.com"
          />
        </CardSection>

        <CardSection>
          <Input
            label="Password"
            autoCorrect={false}
            placeholder="password"
            secureTextEntry
            onChangeText={text => this.props.passwordChanged(text)}
            value={this.props.password}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          {this.renderButtonOrSpinner()}
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = ({ auth }) => auth;

const connectLoginForm = connect(mapStateToProps, {
                            emailChanged,
                            passwordChanged,
                            loginUser,
                            listenToAuthStateChanged
                          })(LoginForm);
export { connectLoginForm as LoginForm };
