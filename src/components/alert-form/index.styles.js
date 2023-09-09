import Colors from '@constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
    justifyContent: 'space-around',
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    textAlignVertical: 'top',
    padding: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.GRAY_PRIMARY,
    height: 128,
    backgroundColor: Colors.WHITE,
    color: Colors.GRAY_PRIMARY_TEXT,
  },
  containerImages: {
    flexDirection: 'row',
    height: 42,
    width: "50%",
    alignSelf: 'center',
    justifyContent: "space-between"
  },
  image: {
    borderRadius: 24,
    backgroundColor: 'blue',
    height: 42,
    width: 42

  },
  buttonSubmit: {
    height: 48,
    borderRadius: 24,
  },
});
export default styles;
