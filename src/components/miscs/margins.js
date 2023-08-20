import { View } from 'react-native';
const M = (props) => {
  const keys = Object.keys(props);
  let v = 0;
  let h = 0;
  keys.forEach((k) => {
    if (k[0] === 'v') {
      v = parseInt(k.substr(1));
    } else if (k[0] === 'h') {
      h = parseInt(k.substr(1));
    }
  });
  return (
    <View
      style={{
        marginTop: 4 * v,
        marginBottom: 4 * v,
        marginLeft: 4 * h,
        marginRight: 4 * v,
      }}
    />
  );
};
export { M };
