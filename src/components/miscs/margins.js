import { View } from 'react-native';
import { s, vs } from 'react-native-size-matters';

const M = props => {
  const keys = Object.keys(props);
  let v = 0;
  let h = 0;
  keys.forEach(k => {
    if (k[0] === 'v') {
      v = parseInt(k.substr(1));
    } else if (k[0] === 'h') {
      h = parseInt(k.substr(1));
    }
  });
  return (
    <View
      style={{
        marginTop: vs(3) * v,
        marginBottom: vs(3) * v,
        marginLeft: s(3) * h,
        marginRight: s(3) * v,
      }}
    />
  );
};
export { M };

