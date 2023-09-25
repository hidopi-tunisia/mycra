import Colors from '@constants/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.GRAY_PRIMARY,
    paddingBottom: '36@vs',
  },
  top: {
    backgroundColor: Colors.GRAY_DARK_PRIMARY,
    height: '40%',
    borderBottomLeftRadius: '48@s',
    borderBottomRightRadius: '48@s',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDescription: {
    width: '80%',
    alignSelf: 'center',
  },
  containerHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerLegends: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  containerLegend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shapeLegend: {
    width: '12@s',
    height: '12@vs',
    borderRadius: '6@msr',
    borderWidth: '2@msr',
  },
  containerButton: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonSubmit: {
    borderRadius: '24@s',
  },
  textHeading: {
    fontSize: '24@s',
    fontWeight: '900',
    color: Colors.WHITE,
  },
  textDescription: {
    color: Colors.WHITE,
  },
  textWarning: {
    color: Colors.YELLOW_DARK_PRIMARY,
    textAlign: 'center',
    borderColor: Colors.YELLOW_DARK_PRIMARY,
    borderWidth: '2@msr',
    padding: '6@msr',
    borderRadius: '16@msr',
  },
  middle: {
    backgroundColor: Colors.WHITE,
    height: '60%',
    borderRadius: '48@msr',
    alignSelf: 'center',
    width: '90%',
    bottom: '48@vs',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '128@s',
    height: '128@s',
  },
  containerTexts: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    textAlign: 'center',
  },
  textTitle: {
    fontSize: '18@s',
    fontWeight: '900',
  },
  textInfo: {
    textAlign: 'center',
  },
  button: {
    borderRadius: '24@s',
    width: "100@s"
  },
  calendarDayWorking: {
    container: {
      backgroundColor: Colors.BLUE_PRIMARY,
      borderWidth: '2@msr',
      borderColor: Colors.BLUE_PRIMARY,
      justifyContent: 'center',
    },
    text: {
      color: Colors.WHITE,
    },
  },
  calendarHalfDay: {
    container: {
      backgroundColor: Colors.WHITE,
      borderWidth: '2@msr',
      borderColor: Colors.BLUE_PRIMARY,
      justifyContent: 'center',
    },
    text: {
      color: Colors.BLUE_PRIMARY,
    },
  },
  calendarDayRemote: {
    container: {
      backgroundColor: Colors.PURPLE_PRIMARY,
      justifyContent: 'center',
    },
    text: {
      color: Colors.WHITE,
    },
  },
  calendarDayOff: {
    container: {
      backgroundColor: Colors.WHITE,
      justifyContent: 'center',
      borderWidth: '2@msr',
      borderColor: Colors.RED_PRIMARY,
    },
    text: {
      color: Colors.RED_PRIMARY,
    },
  },
  calendarDayWeekend: {
    container: {
      backgroundColor: Colors.WHITE,
      borderWidth: '2@msr',
      borderColor: Colors.GREEN_PRIMARY,
      justifyContent: 'center',
    },
    text: {
      color: Colors.GREEN_PRIMARY,
    },
  },
  calendarDayHoliday: {
    container: {
      backgroundColor: Colors.GREEN_PRIMARY,
      justifyContent: 'center',
    },
    text: {
      color: Colors.WHITE,
    },
  },
});

export default styles;
