import * as React from "react"
import Svg, {
  Defs,
  Image,
  Mask,
  G,
  Use,
  ClipPath,
  Path
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      {...props}
    >
      <Defs>
        <Image
          id="b"
          width={20}
          height={20}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABWklEQVQ4ja3UTUsCURQG4HfmokFIS1fBLAxrdoVt+w2KfbiN/kAQURQU2WBUVgt/g4i0kGoXtAjaTsuxzD5cSdvQjc2tt4Vk1IxZzhw4cOFyHu65nHsBl6BlBNmqpSjDBdpHt5TRJmW02V6HC2y9zNEygm61TkyGpynXHigFf8+Ne0ot2R06FoJ28aA39CPtUpZbhuoE+8E66MWeS5t9Yp2MJQBAoWUEMfpaBnYif7rkrrH0hMrQmMJWLQURKXrDOjGnQkwkfMIADMdVcDnmm8fFSYVSbwB3IX/EaNM5P55i4F0F5+u+eVyoq1AOr30DlZyp4q164huI51OFpghgfLMMbI94w1YeURnUAQCUWtL705uKf/Npl7L9fw5Xu5/O19hkrFXwLPvvTnm+j8zlevd9GUtQpqu9T5auOtrsipoiQClmKbU87dwNpd6g1BvttZanDM3QFAG32g9CPacp7c4CQAAAAABJRU5ErkJggg=="
        />
        <Mask id="e">
          <G filter="url(#a)">
            <Use xlinkHref="#b" />
          </G>
        </Mask>
        <ClipPath id="c">
          <Path d="M0 0H20V20H0z" />
        </ClipPath>
        <G id="d" clipPath="url(#c)">
          <Path
            d="M6.523 0h6.954l1.011 9.855L13.477 20H6.523L5.36 10.102zm0 0"
            stroke="none"
            fillRule="nonzero"
            fill="#eee"
            fillOpacity={1}
          />
          <Path
            d="M0 0h6.523v20H0zm0 0"
            stroke="none"
            fillRule="nonzero"
            fill="#0052b4"
            fillOpacity={1}
          />
          <Path
            d="M13.477 0H20v20h-6.523zm0 0"
            stroke="none"
            fillRule="nonzero"
            fill="#d80027"
            fillOpacity={1}
          />
        </G>
      </Defs>
      <Use xlinkHref="#d" mask="url(#e)" />
    </Svg>
  )
}

export default SvgComponent
