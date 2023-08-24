export const getStatusType = status => {
  if (status === 'Validee') {
    return 'success';
  } else if (status === 'Refusee') {
    return 'danger';
  }
  return 'default';
};
