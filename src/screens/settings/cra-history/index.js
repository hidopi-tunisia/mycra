import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { M } from '@components';
import styles from './index.styles';
import { Divider, Text, Spinner } from '@ui-kitten/components';
import { getCRAHistory, getCRAHistory_ } from '@domain/cra';
import CRAHistoryItem from '@components/notifications-item';
import Bullet from '@components/bullet';
import Colors from '@utils/colors';

const CRAHistoryScreen = () => {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true);
        const { data } = await getCRAHistory_();
        setHistory(data[0]);
        console.log(data[0]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Error happened');
      }
    };
    fn();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <M v3 />
      <CRAHistoryItem
        title="Juillet 2023 (5 semaines)"
        subtitle="Confirmé"
        type={'success'}>
        <Bullet text="4 travaillés" color={Colors.GREEN_PRIMARY} />
        <Bullet text="8 non travaillés" color={Colors.RED_PRIMARY} />
        <Bullet text="3 télétravail" color={Colors.BLUE_PRIMARY} />
        <Bullet text="1 fériés" />
      </CRAHistoryItem>
      {loading && !error && <Spinner status="basic" size="small" />}
      {!loading && (!history || error) && (
        <View style={styles.containerError}>
          {error && <Text style={styles.textError}>{error}</Text>}
        </View>
      )}
    </ScrollView>
  );
};

export default CRAHistoryScreen;
