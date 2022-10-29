import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { motion, MotionProps } from 'framer-motion';
import { PointerEventHandler, RefObject, UIEventHandler } from 'react';
export interface AtomWrapperTypes extends MotionProps {
  id?: string;
  onClick?: PointerEventHandler<any>;
  children?: React.ReactNode;
  gap?: string;
  backgroundImage?: string;
  maxHeight?: string;
  className?: string;
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  flexDirection?: 'column' | 'row' | 'row-reverse' | 'column-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  flexWrap?: 'nowrap' | 'wrap';
  mixBlendMode?:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity';
  shadow?: boolean;
  onScroll?: UIEventHandler<HTMLDivElement | HTMLFormElement | HTMLLIElement>;
  maxWidth?: string;
  minHeight?: string;
  backgroundColor?: string;
  backgroundSize?: string;
  borderRadius?: string;
  margin?: string;
  padding?: string;
  border?: string;
  outline?: string;
  width?: string;
  height?: string;
  zIndex?: string;
  overflowX?: string;
  onSubmit?: () => void;
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky';
  cursor?:
    | 'pointer'
    | 'default'
    | 'text'
    | 'wait'
    | 'move'
    | 'not-allowed'
    | 'help'
    | 'zoom-in'
    | 'zoom-out'
    | 'context-menu'
    | 'cell'
    | 'crosshair'
    | 'vertical-text'
    | 'alias'
    | 'progress'
    | 'no-drop'
    | 'copy'
    | 'grab'
    | 'grabbing'
    | 'all-scroll'
    | 'col-resize'
    | 'row-resize'
    | 'n-resize'
    | 'e-resize'
    | 's-resize'
    | 'w-resize'
    | 'ne-resize'
    | 'nw-resize'
    | 'se-resize'
    | 'sw-resize'
    | 'ew-resize'
    | 'ns-resize'
    | 'nesw-resize'
    | 'nwse-resize'
    | 'zoom-in'
    | 'zoom-out'
    | 'grab'
    | 'grabbing'
    | 'custom';
  asWrapper?: string;
  as?: 'div' | 'form' | 'section' | 'li';
  refObject?: RefObject<any>;
  customCSS?: SerializedStyles;
  onPointerDown?: PointerEventHandler<any>;
  dangerouslySetInnerHTML?: { __html: string };
}

export const AtomWrapper = styled(motion.div)<AtomWrapperTypes>`
  display: flex;
  height: ${(props) => props.height ?? 'auto'};
  width: ${(props) => props.width ?? 'auto'};
  gap: ${(props) => props.gap ?? '0px'};
  margin: ${(props) => props.margin ?? '0px'};
  max-width: ${(props) => props.maxWidth ?? 'none'};
  background-color: ${(props) => props.backgroundColor ?? 'transparent'};
  flex-wrap: ${(props) => props.flexWrap ?? 'wrap'};
  flex-direction: ${(props) => props.flexDirection ?? 'column'};
  align-items: ${(props) => props.alignItems ?? 'none'};
  justify-content: ${(props) => props.justifyContent ?? 'none'};
  padding: ${(props) => props.padding ?? '0px'};
  ${(props) => props?.customCSS};
`;
export default AtomWrapper;
