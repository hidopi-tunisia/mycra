import Colors from '@constants/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    padding: "8@msr",
    flex: 1,
    justifyContent: 'space-around',
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: "15@msr",
    fontWeight: '900',
  },
  input: {
    textAlignVertical: 'top',
    padding: "11@msr",
    borderRadius: "22@msr",
    borderWidth: 1,
    borderColor: Colors.GRAY_PRIMARY,
    height: "106@vs",
    backgroundColor: Colors.WHITE,
    color: Colors.GRAY_PRIMARY_TEXT,
  },
  containerImages: {
    flexDirection: 'row',
    height: "36@vs",
    width: "50%",
    alignSelf: 'center',
    justifyContent: "space-between"
  },
  image: {
    borderRadius: "24@msr",
    height: "36@s",
    width: "36@s"
  },
  buttonSubmit: {
    height: "38@vs",
    borderRadius: "20@msr",
  },
});
export default styles;
