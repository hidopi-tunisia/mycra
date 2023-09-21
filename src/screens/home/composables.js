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
      await subscribeToTopic(`${Topics.CONSULTANT}~${u.uid}`);
    }
  } catch (error) {
    console.info(error);
  }
};

export { getProjects, subscribeToConsultantTopic };
