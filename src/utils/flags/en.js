import * as React from 'react';
import Svg, { ClipPath, Path, G } from 'react-native-svg';
const FlagEN = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" {...props}>
    <ClipPath id="a">
      <Path d="M0 0v30h60V0z" />
    </ClipPath>
    <ClipPath id="b">
      <Path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
    </ClipPath>
    <G clipPath="url(#a)">
      <Path fill="#012169" d="M0 0v30h60V0z" />
      <Path stroke="#fff" strokeWidth={6} d="m0 0 60 30m0-30L0 30" />
      <Path
        stroke="#C8102E"
        strokeWidth={4}
        d="m0 0 60 30m0-30L0 30"
        clipPath="url(#b)"
      />
      <Path stroke="#fff" strokeWidth={10} d="M30 0v30M0 15h60" />
      <Path stroke="#C8102E" strokeWidth={6} d="M30 0v30M0 15h60" />
    </G>
  </Svg>
);
export default FlagEN;
