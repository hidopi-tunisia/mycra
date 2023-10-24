import { getCurrentCRAs } from '@domain/me';
import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import ApprovedCRAs from './components/approved-cras';
import HomeLoading from './components/loading';
import NoCRAs from './components/no-cras';
import NoProjects from './components/no-projects';
import PendingCRAs from './components/pending-cras';
import RejectedCRAs from './components/rejected-cras';
import { getProjects, subscribeToConsultantTopic } from './composables';

const HomeScreen = ({ onFocus, onBlur }) => {
  const [loading, setLoading] = useState(false);
  const [loadingTryAgain, setLoadingTryAgain] = useState(false);
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
  const fn = async () => {
    try {
      setLoading(true);
      setLoadingTryAgain(true);
      setDisplayNoProjects(false);
      setDisplayApprovedCRA(false);
      setDisplayRejectedCRA(false);
      setDisplayPendingCRA(false);
      setDisplayNoCRA(false);
      const ps = await getProjects();
      setProjects(ps);
      if (ps.length > 0) {
        setLoading(false);
        setLoadingTryAgain(false);
        const { data } = await getCurrentCRAs();
        if (data && Array.isArray(data.rejected) && data.rejected.length > 0) {
          setCRA(data.rejected[0]);
          setDisplayRejectedCRA(true);
        } else if (
          data &&
          Array.isArray(data.approved) &&
          data.approved.length > 0
        ) {
          setCRA(data.approved[0]);
          setDisplayApprovedCRA(true);
        } else if (
          data &&
          Array.isArray(data.pending) &&
          data.pending.length > 0
        ) {
          setCRA(data.pending[0]);
          setDisplayPendingCRA(true);
        } else {
          setDisplayNoCRA(true);
        }
      } else {
        setLoading(false);
        setLoadingTryAgain(false);
        setDisplayNoProjects(true);
      }
    } catch (error) {
      console.log(error);
      setLoadingTryAgain(false);
      setLoading(false);
      if (error?.response?.data?.name === 'NoCurrentProjects') {
        setDisplayNoProjects(true);
      }
      console.info(error, error?.response?.data);
    }
  };
  useEffect(() => {
    fn();
  }, []);
  const handleTryAgain = () => {
    fn();
  };
  const handleRefresh = () => {
    fn();
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  }, []);
  return (
    <>
      {loading ? (
        <HomeLoading onFocus={onFocus} onBlur={onBlur} />
      ) : (
        <>
          {displayRejectedCRA && cra && (
            <RejectedCRAs
              cra={cra}
              projects={projects}
              onFocus={onFocus}
              onBlur={onBlur}
              onRefresh={handleRefresh}
            />
          )}
          {displayApprovedCRA && cra && (
            <ApprovedCRAs
              cra={cra}
              projects={projects}
              onFocus={onFocus}
              onBlur={onBlur}
              onRefresh={handleRefresh}
            />
          )}
          {displayPendingCRA && cra && (
            <PendingCRAs
              cra={cra}
              projects={projects}
              onFocus={onFocus}
              onBlur={onBlur}
              onRefresh={handleRefresh}
            />
          )}
          {displayNoCRA && (
            <NoCRAs
              projects={projects}
              onFocus={onFocus}
              onBlur={onBlur}
              onRefresh={handleRefresh}
            />
          )}
          {displayNoProjects && (
            <NoProjects
              loading={loadingTryAgain}
              onFocus={onFocus}
              onBlur={onBlur}
              onPress={handleTryAgain}
              onRefresh={handleRefresh}
            />
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
