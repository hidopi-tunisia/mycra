import { subscribeToTopic } from '@domain/messaging';
import { currentUser } from '@domain/auth';
import { Topics } from '@constants';
import { getProfile } from '@domain/me';

const ProjectStatuses = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

const getProjects = async () => {
  const { data } = await getProfile({ populate: 'projects' });
  if (
    data &&
    Array.isArray(data.projects) &&
    data.projects.length > 0 &&
    data.projects.filter(p => p.status === ProjectStatuses.ACTIVE).length > 0
  ) {
    return data.projects.filter(p => p.status === ProjectStatuses.ACTIVE);
  }
  return [];
};

const subscribeToConsultantTopic = async () => {
  try {
    const u = await currentUser();
    if (u !== null && u.uid) {
      await subscribeToTopic(`${Topics.CONSULTANTS}~${u.uid}`);
      subscribeToTopic(`${Topics.CONSULTANTS_ALL}`)
    }
  } catch (error) {
    console.info(error);
  }
};

const getHistoryItem = (history, a) => {
  const dates = history.filter(({ action }) => action === a);
  const sorted = dates.sort(
    (a, b) => new Date(b?.meta?.at).getTime() - new Date(a.meta?.at).getTime(),
  );
  return sorted[0]?.meta;
};
export { getProjects, subscribeToConsultantTopic, getHistoryItem };
