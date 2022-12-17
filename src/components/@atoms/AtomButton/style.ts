import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { PointerEventHandler, RefObject } from 'react';

export interface AtomButtonTypes {
  color?: string;
  width?: string;
  height?: string;
  loading?: boolean;
  className?: string;
  type?: `button` | `submit` | `reset`;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (() => void) & React.MouseEventHandler<HTMLButtonElement>;
  onPointerDown?: PointerEventHandler<HTMLButtonElement>;
  onHoverStart?: (() => void) & React.MouseEventHandler<HTMLButtonElement>;
  onHoverEnd?: (() => void) & React.MouseEventHandler<HTMLButtonElement>;
  padding?: string;
  margin?: string;
  backgroundColor?: 'transparent' | string;
  backgroundImage?: string;
  fontSize?: string;
  font?: string;
  fontWeight?:
    | 'normal'
    | 'bold'
    | 'bolder'
    | 'lighter'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  textShadow?: string;
  border?: string;
  borderRadius?: string;
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
  customCSS?: SerializedStyles;
  form?: string;
  refObject?: RefObject<any>;
  flexDirection?: 'column' | 'row' | 'row-reverse' | 'column-reverse';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  flexWrap?: 'nowrap' | 'wrap';
  gap?: string;
}

const ButtonStyled = styled.button<AtomButtonTypes>`
  display: flex;
  width: ${({ width }) => width || `max-content`};
  gap: ${({ gap }) => gap || '0px'};
  height: ${({ height }) => height || `max-content`};
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
  flex-wrap: ${({ flexWrap }) => flexWrap || 'wrap'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  color: ${({ color }) => color || `#ffffff`};
  background-color: ${({ backgroundColor }) => backgroundColor || `#0072FF`};
  background-image: ${({ backgroundImage }) => backgroundImage || `none`};
  padding: ${({ padding }) => padding || `8px 30px`};
  margin: ${({ margin }) => margin || `0px 0px 0px 0px`};
  cursor: ${({ cursor }) => cursor || `pointer`};
  text-shadow: ${({ textShadow }) => textShadow || `none`};
  font-size: ${({ fontSize }) => fontSize || `12px`};
  font-family: ${({ font }) => font || `'Open Sans', sans-serif`};
  font-weight: ${({ fontWeight }) => fontWeight || '600'};
  border: ${({ border }) => border || `none`};
  border-radius: ${({ borderRadius }) => borderRadius || `4px`};
  line-height: 150%;
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #e7e7e7;
      color: #7e7e7e;
    `}

  ${({ customCSS }) => customCSS};
`;
export default ButtonStyled;
