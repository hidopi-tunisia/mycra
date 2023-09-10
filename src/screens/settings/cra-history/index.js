import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { Layout, Text, Spinner, Icon } from '@ui-kitten/components';
import { M } from '@components';
import styles from './index.styles';
import { getAllCRAs, getCRAHistory } from '@domain/cra';
import CRAHistoryItem from '@components/cra-history-item';
import { getStatusType } from './index.helpers';
import Colors from '@constants/colors';

const CRAHistoryScreen = ({ navigation }) => {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorLoadingMore, setErrorLoadingMore] = useState(null);
  const retrieveData = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await getAllCRAs({ page, limit });
      setHistory([...history, ...data]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Error happened');
    }
  };
  useEffect(() => {
    retrieveData();
  }, []);
  const handlePressLoadMore = () => {
    const fn = async () => {
      try {
        setLoadingMore(true);
        setErrorLoadingMore(null);
        setPage(page + 1);
        const { data } = await getAllCRAs({ page, limit });
        setHistory([...history, ...data]);
        setLoadingMore(false);
      } catch (error) {
        setLoadingMore(false);
        console.log(error);
        setErrorLoadingMore('Error happened');
      }
    };
    fn();
  };
  const handlePress = id => {
    navigation.navigate('CRA History Details', { id });
  };
  const handePressRetry = () => {
    retrieveData();
  };
  const handlePressBack = () => {
    navigation.goBack();
  };
  return (
    <Layout style={styles.root}>
      <View style={styles.top}>
        <View style={styles.containerHeader}>
          <TouchableOpacity
            onPress={handlePressBack}
            style={styles.containerBack}>
            <Icon
              width={36}
              height={36}
              name="chevron-left-outline"
              fill={Colors.WHITE}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader} category="h1">
            CRA History
          </Text>
        </View>
        <M v2 />
      </View>
      <View style={styles.bottom}>
        {!loading && !error && history.length > 0 && (
          <FlatList
            style={styles.card}
            showsVerticalScrollIndicator={false}
            data={history}
            ItemSeparatorComponent={<M v1 />}
            ListFooterComponent={
              <>
                {loadingMore ? (
                  <View
                    onPress={handlePressLoadMore}
                    style={styles.containerLoadMore}>
                    <Spinner status="basic" size="small" />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={handlePressLoadMore}
                    style={styles.containerLoadMore}>
                    <Text style={styles.textLoadMore}>Load more...</Text>
                  </TouchableOpacity>
                )}
              </>
            }
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
                <View style={styles.containerLegends}>
                  {typeof item.nbJoursTravailles === 'number' &&
                    item.nbJoursTravailles > 0 && (
                      <>
                        <View style={styles.containerLegend}>
                          <View
                            style={{
                              ...styles.shapeLegend,
                              backgroundColor: Colors.BLUE_PRIMARY,
                              borderColor: Colors.BLUE_PRIMARY,
                            }}
                          />
                          <M h1 />
                          <Text>{item.nbJoursTravailles} Worked</Text>
                        </View>
                      </>
                    )}
                  {true && (
                    <>
                      <M h2 />
                      <View style={styles.containerLegend}>
                        <View
                          style={{
                            ...styles.shapeLegend,
                            backgroundColor: Colors.WHITE,
                            borderColor: Colors.BLUE_PRIMARY,
                          }}
                        />
                        <M h1 />
                        <Text>3 Half day(s)</Text>
                      </View>
                    </>
                  )}
                  {true && (
                    <>
                      <M h2 />
                      <View style={styles.containerLegend}>
                        <View
                          style={{
                            ...styles.shapeLegend,
                            backgroundColor: Colors.PURPLE_PRIMARY,
                            borderColor: Colors.PURPLE_PRIMARY,
                          }}
                        />
                        <M h1 />
                        <Text>2 Remote</Text>
                      </View>
                    </>
                  )}
                  {typeof item.nbJoursNonTravailles === 'number' &&
                    item.nbJoursNonTravailles >= 0 && (
                      <>
                        <M h2 />
                        <View style={styles.containerLegend}>
                          <View
                            style={{
                              ...styles.shapeLegend,
                              backgroundColor: Colors.WHITE,
                              borderColor: Colors.RED_PRIMARY,
                            }}
                          />
                          <M h1 />
                          <Text>3 Off</Text>
                        </View>
                      </>
                    )}
                </View>
              </CRAHistoryItem>
            )}
          />
        )}
        {!loading && !error && history.length === 0 && (
          <View style={styles.cardEmpty}>
            <Text>No history</Text>
          </View>
        )}
        {loading && (
          <View style={styles.cardEmpty}>
            <Spinner status="basic" size="small" />
          </View>
        )}
        {error && (
          <View style={styles.cardEmpty}>
            <View style={styles.containerError}>
              <Text style={styles.textError}>{error}</Text>
            </View>
            <M v1 />
            <TouchableOpacity onPress={handePressRetry}>
              <Text style={styles.textRetry}>Try again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Layout>
  );
};

export default CRAHistoryScreen;
