import { View, ScrollView } from 'react-native';
import { Text } from '@ui-kitten/components';
import styles from './index.styles';
import Item from './item';
import { M } from '@components';

const WorkdaysCollection = ({ items, workday, onPress }) => (
  <ScrollView style={{ ...styles.container }}>
    {workday && <Text style={styles.title}>Describe {workday.dateString}</Text>}
    {!workday && <Text style={styles.title}>Describe all working days</Text>}
    <M v2 />
    <Text style={styles.subtitle}>Worked day{!workday && 's'}</Text>
    <M v1 />
    <View style={styles.containerCollection}>
      {items.worked.map(i => (
        <Item
          key={i.text}
          text={i.text}
          color={i.color}
          backgroundColor={i.backgroundColor}
          borderColor={i.borderColor}
          selected={workday && workday.type === i.type}
          onPress={() => onPress(i)}
        />
      ))}
    </View>
    <M v2 />
    <Text style={styles.subtitle}>Day{!workday && 's'} off?</Text>
    <M v1 />
    <View style={styles.containerCollection}>
      {items.off.map(i => (
        <Item
          key={i.text}
          text={i.text}
          color={i.color}
          backgroundColor={i.backgroundColor}
          borderColor={i.borderColor}
          selected={
            workday &&
            workday.type === i.type &&
            workday.payload?.value === i.value
          }
          onPress={() => onPress(i)}
        />
      ))}
    </View>
    <M v4 />
  </ScrollView>
);

export const WorkdaysTypes = {
  WORKED: 'worked',
  HALF: 'half',
  REMOTE: 'remote',
  OFF: 'off',
  WEEKEND: 'weekend',
  HOLIDAY: 'holiday',
};
export default WorkdaysCollection;
