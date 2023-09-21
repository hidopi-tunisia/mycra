import { getCurrentCRAs } from '@domain/me';
import { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import NoCRAs from './components/no-cras';
import NoCurrentCRAs from './components/no-current-cras';
import NoProjects from './components/no-projects';
import { getProjects, subscribeToConsultantTopic } from './composables';

const HomeScreen = () => {
  const [displayNoProjects, setDisplayNoProjects] = useState(false);
  const [displayCurrentCRA, setDisplayCurrentCRA] = useState(false);
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
            setDisplayCurrentCRA(true);
          } else if (
            data &&
            Array.isArray(data.approved) &&
            data.approved.length > 0
          ) {
            setDisplayCurrentCRA(true);
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
      {displayNoProjects && <NoProjects />}
      {displayCurrentCRA && <NoCurrentCRAs projects={projects} />}
      {displayNoCRA && <NoCRAs projects={projects} />}
    </>
  );
};

export default HomeScreen;
