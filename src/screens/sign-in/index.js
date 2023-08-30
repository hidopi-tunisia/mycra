import { useState } from 'react';
import { signIn } from '@domain/auth';
import { View, TouchableOpacity, Image } from 'react-native';
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
import { APP_VERSION } from '@constants';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = () => {
    const fn = async () => {
      try {
        setError(null);
        setLoading(true);
        await signIn({ email, password });
      } catch (error) {
        setLoading(false);
        if (error && error.code === 'auth/invalid-email') {
          setError('Invalid email');
        } else if (error && error.code === 'auth/missing-password') {
          setError('Missing password');
        } else if (error && error.code === 'auth/wrong-password') {
          setError('Wrong password');
        } else {
          setError('Error happened');
        }
      }
    };
    fn();
  };
  const handleForgotPassword = () => {
    alert('Forgot password?');
  };
  return (
    <Layout style={styles.root}>
      <View style={styles.top}>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={require('@assets/logo.jpg')} />
        </View>
        <M v3 />
        <Text style={styles.textTitle} category="h1">
          Welcome
        </Text>
        <Text style={styles.textSubtitle} category="h2">
          Please sign in using your account
        </Text>
        <M v7 />
      </View>
      <Card style={styles.card}>
        <Text style={styles.labelEmail} category="label">
          Email
        </Text>
        <M v1 />
        <Input
          style={styles.input}
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
          style={styles.input}
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
          disabled={!email || !password || loading}
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
      <M v4 />
      <Text style={styles.textVersion}>Version: {APP_VERSION}</Text>
    </Layout>
  );
};

export default SignInScreen;
