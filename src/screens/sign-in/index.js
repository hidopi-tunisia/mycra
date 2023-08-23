import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Button,
  Layout,
  Input,
  Card,
  Spinner,
  Text,
} from '@ui-kitten/components';
import { M } from '@components';
import styles from './index.styles';

const SignInScreen = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = () => {
    const fn = async () => {
      setError(null);
      setLoading(true);
      setTimeout(async () => {
        if (email === 'a@a.com' && password === '000000') {
          setLoading(false);
          onSignIn(email);
        } else {
          setError('Incorrect email or password');
        }
        setLoading(false);
      }, 2000);
    };
    fn();
  };
  const handleForgotPassword = () => {
    alert('Forgot password?');
  };
  return (
    <Layout style={styles.root}>
      <Text style={styles.textTitle} category="h1">
        Welcome
      </Text>
      <Text style={styles.textSubtitle} category="h2">
        Please sign in using your account
      </Text>
      <M v2 />
      <Card>
        <Text style={styles.labelEmail} category="label">
          Email
        </Text>
        <M v1 />
        <Input
          placeholder="john.doe@company.com"
          value={email}
          onChangeText={nextValue => setEmail(nextValue)}
        />
        <M v3 />
        <Text style={styles.labelEmail} category="label">
          Password
        </Text>
        <M v1 />
        <Input
          secureTextEntry
          placeholder="************"
          value={password}
          onChangeText={nextValue => setPassword(nextValue)}
        />
        <M v1 />
        <View style={styles.containerForgotPasswordText}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.textForgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <M v3 />
        <Button
          style={styles.buttonSignIn}
          status="primary"
          disabled={loading}
          onPress={handleSubmit}>
          {loading ? <Spinner status="basic" size="small" /> : 'Sign in'}
        </Button>
        <M v1 />
        {error && (
          <View style={styles.containerError}>
            <Text style={styles.textError}>{error}</Text>
          </View>
        )}
      </Card>
    </Layout>
  );
};

export default SignInScreen;
