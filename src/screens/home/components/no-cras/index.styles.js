import Colors from '@constants/colors';
import { ScaledSheet } from 'react-native-size-matters';
import { Dimensions } from 'react-native';
const { height } = Dimensions.get('window');
const styles = ScaledSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.BLUE_PRIMARY,
    paddingBottom: '36@vs',
  },
  top: {
    backgroundColor: Colors.BLUE_DARK_PRIMARY,
    height: height / 2 - 182,
    borderBottomLeftRadius: '48@s',
    borderBottomRightRadius: '48@s',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  containerDescription: {
    bottom: "68@vs",
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
  containerProjects: {
    flexDirection: 'row',
    alignItems: 'center',
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
    height: 460,
    borderRadius: '48@msr',
    alignSelf: 'center',
    width: '90%',
    position: 'absolute',
    top: height / 2 - 230,
    bottom: '48@msr',
  },
  containerCalendar: {
    backgroundColor: 'transparent',
    padding: '16@msr',
  },
  containerCalendarHeader: {
    paddingHorizontal: '12@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerCalendarTitle: {
textTransform: "capitalize",
    color: Colors.BLUE_DARK_PRIMARY,
    fontSize: '18@s',
    fontWeight: '900',
    textTransform: "capitalize"
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
  calendarDayUnavailable: {
    container: {
      backgroundColor: Colors.GRAY_DARK_PRIMARY,
      justifyContent: 'center',
      borderWidth: '2@msr',
      borderColor: Colors.GRAY_DARK_PRIMARY,
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
