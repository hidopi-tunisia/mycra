import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import styles from './index.styles';
import { Divider, Text, Spinner } from '@ui-kitten/components';
import { getCRAHistory, getCRAHistory_ } from '@domain/cra';
import CRAHistoryItem from '@components/notifications-item';
import Bullet from '@components/bullet';
import Colors from '@constants/colors';
import { getStatusType } from './index.helpers';

const CRAHistoryScreen = () => {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true);
        const { data } = await getCRAHistory_();
        setHistory(data);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        setError('Error happened');
      }
    };
    fn();
  }, []);
  const handlePress = id => {
    alert('Pressed ' + id);
  };
  return (
    <>
      {!loading && history && history.length > 0 && (
        <FlatList
          ItemSeparatorComponent={<Divider />}
          data={history}
          renderItem={({ item }) => (
            <CRAHistoryItem
              key={item._id}
              title={`${item.mois ? item.mois : ' - '} ${
                !isNaN(item.annee) ? item.annee : ' - '
              } ${
                !isNaN(item.nbSemaines)
                  ? '(' + item.nbSemaines + ' semaines)'
                  : ''
              }`}
              subtitle={item.status}
              type={getStatusType(item.status)}
              onPress={() => handlePress(item._id)}>
              {!isNaN(item.nbJoursTravailles) && (
                <Bullet
                  text={`${item.nbJoursTravailles} travaillés`}
                  color={Colors.GREEN_PRIMARY}
                />
              )}
              {!isNaN(item.nbJoursNonTravailles) && (
                <Bullet
                  text={`${item.nbJoursNonTravailles} non travaillés`}
                  color={Colors.RED_PRIMARY}
                />
              )}
              {!isNaN(item.nb_tt_du_mois) && (
                <Bullet
                  text={`${item.nb_tt_du_mois} télétravail`}
                  color={Colors.BLUE_PRIMARY}
                />
              )}
              {!isNaN(item.nbJoursFeries) && (
                <Bullet text={`${item.nbJoursFeries} fériés`} />
              )}
            </CRAHistoryItem>
          )}
        />
      )}
      {!loading && history && history.length === 0 && (
        <View style={styles.containerFull}>
          <Text>No past history</Text>
        </View>
      )}
      {loading && !error && (
        <View style={styles.containerFull}>
          <Spinner status="basic" size="small" />
        </View>
      )}
      {!loading && (!history || error) && (
        <View style={styles.containerError}>
          {error && <Text style={styles.textError}>{error}</Text>}
        </View>
      )}
    </>
  );
};

export default CRAHistoryScreen;
