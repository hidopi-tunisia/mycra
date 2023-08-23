import Colors from "@utils/colors";

export const getStatusBackground = status => {
  if (status === 'active') {
    return Colors.GREEN_PRIMARY;
  } else if (status === 'inactive') {
    return Colors.RED_PRIMARY;
  }
  return Colors.GRAY_SECONDARY_TEXT;
};
