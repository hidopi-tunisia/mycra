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
            d="M0 0l.313.86L0 1.757v.898l1.25 2.11L0 6.875v1.25L1.25 10 0 11.875v1.25l1.25 2.11L0 17.343V20l.86-.313.898.313h.898l2.11-1.25L6.875 20h1.25L10 18.75 11.875 20h1.25l2.11-1.25L17.343 20H20l-.313-.86.313-.898v-.898l-1.25-2.11L20 13.125v-1.25L18.75 10 20 8.125v-1.25l-1.25-2.11L20 2.657V0l-.86.313L18.243 0h-.898l-2.11 1.25L13.125 0h-1.25L10 1.25 8.125 0h-1.25l-2.11 1.25L2.657 0zm0 0"
            stroke="none"
            fillRule="nonzero"
            fill="#eee"
            fillOpacity={1}
          />
          <Path
            d="M13.125 0v4.219L17.344 0zM20 2.656l-4.219 4.219H20zM0 6.875h4.219L0 2.656zM2.656 0l4.219 4.219V0zm4.219 20v-4.219L2.656 20zM0 17.344l4.219-4.219H0zm20-4.219h-4.219L20 17.344zM17.344 20l-4.219-4.219V20zm0 0"
            stroke="none"
            fillRule="nonzero"
            fill="#0052b4"
            fillOpacity={1}
          />
          <Path
            d="M0 0v1.758l5.117 5.117h1.758zm8.125 0v8.125H0v3.75h8.125V20h3.75v-8.125H20v-3.75h-8.125V0zm10.117 0l-5.117 5.117v1.758L20 0zM6.875 13.125L0 20h1.758l5.117-5.117zm6.25 0L20 20v-1.758l-5.117-5.117zm0 0"
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
