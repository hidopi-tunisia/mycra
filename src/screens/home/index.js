import { getCurrentCRAs } from '@domain/me';
import { useEffect, useState } from 'react';
import { Image, PermissionsAndroid } from 'react-native';
import NoProjects from './components/no-projects';
import RejectedCRAs from './components/rejected-cras';
import { getProjects, subscribeToConsultantTopic } from './composables';
import ApprovedCRAs from './components/approved-cras';
import PendingCRAs from './components/pending-cras';
import NoCRAs from './components/no-cras';
import styles from './index.styles';
import { Layout } from '@ui-kitten/components';

const HomeScreen = ({ onFocus, onBlur }) => {
  const [loading, setLoading] = useState(false);
  const [displayNoProjects, setDisplayNoProjects] = useState(false);
  const [displayRejectedCRA, setDisplayRejectedCRA] = useState(false);
  const [displayApprovedCRA, setDisplayApprovedCRA] = useState(false);
  const [displayPendingCRA, setDisplayPendingCRA] = useState(false);
  const [displayNoCRA, setDisplayNoCRA] = useState(false);
  const [projects, setProjects] = useState([]);
  const [cra, setCRA] = useState([]);
  useEffect(() => {
    subscribeToConsultantTopic();
  }, []);
  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true);
        const ps = await getProjects();
        setProjects(ps);
        if (ps.length > 0) {
          setLoading(false);
          const { data } = await getCurrentCRAs();
          if (
            data &&
            Array.isArray(data.rejected) &&
            data.rejected.length > 0
          ) {
            setCRA(data.rejected[0])
            setDisplayRejectedCRA(true);
          } else if (
            data &&
            Array.isArray(data.approved) &&
            data.approved.length > 0
          ) {
            setCRA(data.approved[0])
            setDisplayApprovedCRA(true);
          } else if (
            data &&
            Array.isArray(data.pending) &&
            data.pending.length > 0
          ) {
            setCRA(data.pending[0])
            setDisplayPendingCRA(true);
          } else {
            setDisplayNoCRA(true);
          }
        } else {
          setLoading(false);
          setDisplayNoProjects(true);
        }
      } catch (error) {
        setLoading(false)
        console.info(error);
      }
    };
    fn();
  }, []);
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }, []);
  return (
    <>
      {displayNoProjects && <NoProjects onFocus={onFocus} onBlur={onBlur} />}
      {displayRejectedCRA && cra && (
        <RejectedCRAs cra={cra} projects={projects} onFocus={onFocus} onBlur={onBlur} />
      )}
      {displayApprovedCRA && cra  && (
        <ApprovedCRAs cra={cra} projects={projects} onFocus={onFocus} onBlur={onBlur} />
      )}
      {displayPendingCRA && cra  && (
        <PendingCRAs cra={cra} projects={projects} onFocus={onFocus} onBlur={onBlur} />
      )}
      {displayNoCRA && (
        <NoCRAs projects={projects} onFocus={onFocus} onBlur={onBlur} />
      )}
      {loading && <Layout style={styles.root}>
        <Image
          source={require('@assets/images/home/loader.gif')}
          style={styles.imageLoader}
        />
      </Layout>}
    </>
  );
};

export default HomeScreen;
