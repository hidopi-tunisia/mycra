import Colors from '@constants/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.BLUE_PRIMARY,
  },
  containerTop: {
    backgroundColor: Colors.BLUE_DARK_PRIMARY,
    height: "228@vs",
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: "28@msr",
    borderBottomRightRadius: "28@msr",
  },
  containerImage: {
    width: "72@s",
    height: "72@s",
    borderRadius: "36@s",
    borderWidth: "3.2@s",
    borderColor: Colors.WHITE,
  },
  avatar: {
    width: "66@s",
    height: "66@s",
    borderRadius: "33@s",
  },
  status: {
    width: "18@s",
    height: "18@s",
    borderRadius: "10@s",
    borderColor: Colors.WHITE,
    borderWidth: "1.6@s",
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.GRAY_SECONDARY_TEXT,
    right: 0,
  },
  textName: {
    fontWeight: '700',
    color: Colors.WHITE,
  },
  textCompany: {
    fontWeight: '400',
    color: Colors.WHITE,
    fontSize: "10@msr",
    marginTop: "4@msr",
  },
  bottom: {
    borderRadius: "24@msr",
    padding: "8@msr",
    justifyContent: 'center',
    marginTop: "-28@msr",
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: "24@msr",
    padding: "6@msr",
  },
  containerVersion: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textVersion: {
    color: Colors.GRAY_PRIMARY,
    fontSize: "10@msr",
  },
  containerError: {
    backgroundColor: `${Colors.RED_DARK_PRIMARY}66`,
    padding: "8@msr",
    paddingHorizontal: "20@msr",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: "20@msr"
  },
  textError: {
    color: Colors.WHITE,
  },
});
export default styles;
