import { M } from '@components';
import CRAHistoryItem from '@components/cra-history-item';
import Colors from '@constants/colors';
import { getCRAs } from '@domain/me';
import { Icon, Layout, Spinner, Text } from '@ui-kitten/components';
import { i18n } from '@utils/translations';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { getStatusType } from './index.helpers';
import styles from './index.styles';

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
      const { data } = await getCRAs({ page, limit, populate: 'project' });
      setHistory(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(i18n.t('CRA History.errors.Error happened'));
      console.info(error, error?.response?.data);
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
        const { data } = await getCRAs({ page, limit, populate: 'project' });
        setHistory(
          [...history, ...data].filter(
            (v, i, a) => a.findIndex(({ _id }) => v._id === _id) === i,
          ),
        );
        setLoadingMore(false);
      } catch (error) {
        setLoadingMore(false);
        console.info(error);
        setErrorLoadingMore(i18n.t('CRA History.errors.Error happened'));
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
  const getLastAction = (history, status) => {
    let a;
    if (status === 'pending') {
      a = 'submitted';
    } else if (status === 'approved') {
      a = 'approved';
    } else if (status === 'rejected') {
      a = 'rejected';
    }
    const filtered = history.filter(({ action }) => action === a);
    const sorted = filtered.sort(
      (a, b) => new Date(b.meta.at).getTime() - new Date(a.meta.at).getTime(),
    );
    return sorted[0];
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
            {i18n.t('CRA History.title')}
          </Text>
        </View>
        <M v2 />
      </View>
      <View style={styles.middle}>
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
                    <Text style={styles.textLoadMore}>
                      {i18n.t('CRA History.load-more')}
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            }
            renderItem={({ item }) => (
              <CRAHistoryItem
                key={item._id}
                title={`${
                  item.date?.month
                    ? moment(item.date?.month + 1, 'M').format('MMMM')
                    : ' - '
                } ${!isNaN(item.date?.year) ? item.date?.year : ' - '} ${
                  item.type ? ' - ' + item.type : ''
                }`}
                subtitle={
                  item.status +
                  ' - ' +
                  getLastAction(item.history, item.status)
                    .meta.at.substring(0, 16)
                    .replaceAll('T', ' at ')
                }
                type={getStatusType(item.status)}
                onPress={() => handlePress(item._id)}>
                <View>
                  <Text>
                    {item.project.name} - {item?.project?.category}
                  </Text>
                </View>
                <M v1 />
                <View style={styles.containerLegends}>
                  {Array.isArray(item.working) && item.working.length > 0 && (
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
                        <Text>
                          {item.working.length} {i18n.t('CRA History.working')}
                        </Text>
                      </View>
                      <M h2 />
                    </>
                  )}
                  {Array.isArray(item.half) && item.half.length > 0 && (
                    <>
                      <View style={styles.containerLegend}>
                        <View
                          style={{
                            ...styles.shapeLegend,
                            backgroundColor: Colors.WHITE,
                            borderColor: Colors.BLUE_PRIMARY,
                          }}
                        />
                        <M h1 />
                        <Text>
                          {item.half.length} {i18n.t('CRA History.half')}
                        </Text>
                      </View>
                      <M h2 />
                    </>
                  )}
                  {Array.isArray(item.remote) && item.remote.length > 0 && (
                    <>
                      <View style={styles.containerLegend}>
                        <View
                          style={{
                            ...styles.shapeLegend,
                            backgroundColor: Colors.PURPLE_PRIMARY,
                            borderColor: Colors.PURPLE_PRIMARY,
                          }}
                        />
                        <M h1 />
                        <Text>
                          {item.remote.length} {i18n.t('CRA History.remote')}
                        </Text>
                      </View>
                      <M h2 />
                    </>
                  )}
                  {Array.isArray(item.off) && item.off.length > 0 && (
                    <>
                      <View style={styles.containerLegend}>
                        <View
                          style={{
                            ...styles.shapeLegend,
                            backgroundColor: Colors.WHITE,
                            borderColor: Colors.RED_PRIMARY,
                          }}
                        />
                        <M h1 />
                        <Text>
                          {item.off.length} {i18n.t('CRA History.off')}
                        </Text>
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
            <Text>{i18n.t('CRA History.no-history')}</Text>
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
              <Text style={styles.textRetry}>
                {i18n.t('CRA History.retry')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.bottom} />
    </Layout>
  );
};

export default CRAHistoryScreen;
