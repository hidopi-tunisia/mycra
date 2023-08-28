import { View, ScrollView } from 'react-native';
import { Text } from '@ui-kitten/components';
import styles from './index.styles';
import Item from './item';
import { M } from '@components';

const WorkdaysCollection = ({ items, workday, onPress }) => (
  <ScrollView style={{ ...styles.container }}>
    {console.log(workday)}
    <Text style={styles.title}>Describe {workday.dateString}</Text>
    <M v2 />
    <Text style={styles.subtitle}>Worked day?</Text>
    <M v1 />
    <View style={styles.containerCollection}>
      {items.worked.map(i => (
        <Item
          key={i.text}
          text={i.text}
          color={i.color}
          backgroundColor={i.backgroundColor}
          borderColor={i.borderColor}
          selected={workday.type === i.type}
          onPress={() => onPress(i)}
        />
      ))}
    </View>
    <M v2 />
    <Text style={styles.subtitle}>Day off?</Text>
    <M v1 />
    <View style={styles.containerCollection}>
      {items.off.map(i => (
        <Item
          key={i.text}
          text={i.text}
          color={i.color}
          backgroundColor={i.backgroundColor}
          borderColor={i.borderColor}
          selected={workday.type === i.type && workday.reason === i.reason}
          onPress={() => onPress(i)}
        />
      ))}
    </View>
  </ScrollView>
);
export default WorkdaysCollection;
