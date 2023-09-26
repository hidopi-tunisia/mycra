export const getStatusType = status => {
  if (status === 'rejected') {
    return 'success';
  } else if (status === 'approved') {
    return 'danger';
  }
  return 'default';
};
