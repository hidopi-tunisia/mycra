const renderIcon = type => {
  switch (type) {
    case 'success':
      return 'checkmark-circle-2-outline';
    case 'info':
      return 'info-outline';
    case 'warning':
      return 'alert-triangle-outline';
    case 'danger':
      return 'close-circle-outline';
    case 'confirm':
      return 'question-mark-circle-outline';
    case 'default':
      return 'message-square-outline';
    default:
      return 'message-square-outline';
  }
};

const renderColor = type => {
  switch (type) {
    case 'success':
      return '#4CAF50cc';
    case 'info':
      return '#2196F3cc';
    case 'warning':
      return '#FF9800cc';
    case 'danger':
      return '#F44336cc';
    case 'default':
      return '#9E9E9Ecc';
    default:
      return '#9E9E9Ecc';
  }
};
export { renderIcon, renderColor };
