import { getCurrentCRAs } from '@domain/me';
import { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import NoProjects from './components/no-projects';
import RejectedCRAs from './components/rejected-cras';
import { getProjects, subscribeToConsultantTopic } from './composables';
import ApprovedCRAs from './components/approved-cras';
import PendingCRAs from './components/pending-cras';
import NoCRAs from './components/no-cras';

const HomeScreen = ({ onFocus, onBlur }) => {
  const [displayNoProjects, setDisplayNoProjects] = useState(false);
  const [displayRejectedCRA, setDisplayRejectedCRA] = useState(false);
  const [displayApprovedCRA, setDisplayApprovedCRA] = useState(false);
  const [displayPendingCRA, setDisplayPendingCRA] = useState(false);
  const [displayNoCRA, setDisplayNoCRA] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    subscribeToConsultantTopic();
  }, []);
  useEffect(() => {
    const fn = async () => {
      try {
        const ps = await getProjects();
        setProjects(ps);
        if (ps.length > 0) {
          const { data } = await getCurrentCRAs();
          if (
            data &&
            Array.isArray(data.rejected) &&
            data.rejected.length > 0
          ) {
            setDisplayRejectedCRA(true);
          } else if (
            data &&
            Array.isArray(data.approved) &&
            data.approved.length > 0
          ) {
            setDisplayApprovedCRA(true);
          } else if (
            data &&
            Array.isArray(data.pending) &&
            data.pending.length > 0
          ) {
            setDisplayPendingCRA(true);
          } else {
            setDisplayNoCRA(true);
          }
        } else {
          setDisplayNoProjects(true);
        }
      } catch (error) {
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
      {displayRejectedCRA && (
        <RejectedCRAs projects={projects} onFocus={onFocus} onBlur={onBlur} />
      )}
      {displayApprovedCRA && (
        <ApprovedCRAs projects={projects} onFocus={onFocus} onBlur={onBlur} />
      )}
      {displayPendingCRA && (
        <PendingCRAs projects={projects} onFocus={onFocus} onBlur={onBlur} />
      )}
      {displayNoCRA && <NoCRAs projects={projects} onFocus={onFocus} onBlur={onBlur} />}
    </>
  );
};

export default HomeScreen;
