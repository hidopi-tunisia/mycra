export const getStatusType = status => {
  if (status === 'approved') {
    return 'success';
  } else if (status === 'rejected') {
    return 'danger';
  }
  return 'default';
};
