import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { motion, MotionProps } from 'framer-motion';
import NextImage, { ImageProps } from 'next/image';
import { FC } from 'react';
export interface AtomNextImageTypes {
  src: string;
  alt: string;
}

const NewNextImage = NextImage as unknown as FC<
  ImageProps & {
    layout: 'fill';
  }
>;

export interface AtomImageTypes extends MotionProps {
  width?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
  objectFit?: `fill` | `contain` | `cover` | `none` | `scale-down`;
  margin?: string;
  position?:
    | `absolute`
    | `relative`
    | `static`
    | `sticky`
    | `fixed`
    | `initial`;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  objectPosition?: string;
  zIndex?: string;
  customCSS?: SerializedStyles;
  borderRadius?: string;
}

export interface AtomImageProps extends AtomNextImageTypes, AtomImageTypes {
  isNextImage?: boolean;
}

const AtomImageStyled = styled(motion.div)<AtomImageTypes>`
  width: ${({ width }) => width || `100%`};
  max-width: ${({ maxWidth }) => maxWidth || `initial`};
  height: ${({ height }) => height || `100%`};
  max-height: ${({ maxHeight }) => maxHeight || `initial`};
  margin: ${({ margin }) => margin || `0`};
  position: ${({ position }) => position || `initial`};
  left: ${({ left }) => left || `initial`};
  top: ${({ top }) => top || `initial`};
  right: ${({ right }) => right || `initial`};
  bottom: ${({ bottom }) => bottom || `initial`};
  img {
    object-fit: ${({ objectFit }) => objectFit || `cover`};
    object-position: ${({ objectPosition }) =>
      objectPosition || `center center`};
    border-radius: ${({ borderRadius }) => borderRadius ?? '0px'};
  }
  z-index: ${({ zIndex }) => zIndex || `initial`};

  ${({ customCSS }) => customCSS};
`;

const AtomImageWrapperStyled = styled.div<AtomImageTypes>`
  width: 100%;
  height: 100%;
  position: relative;
`;

const AtomImageImgStyled = styled.img<AtomImageTypes>`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DEFAULTIMG =
  'https://res.cloudinary.com/whil/image/upload/v1661401537/gallery-slash2_dwpvpx.jpg';

const AtomImage: FC<AtomImageProps> = (props) => {
  const { src, alt, isNextImage } = props;
  return (
    <AtomImageStyled {...{ ...props, src: undefined }}>
      {isNextImage ? (
        <AtomImageWrapperStyled>
          <NewNextImage
            src={src ?? DEFAULTIMG}
            alt={`${alt}image`}
            layout="fill"
            placeholder="blur"
            blurDataURL={src}
          />
        </AtomImageWrapperStyled>
      ) : (
        <AtomImageImgStyled src={src ?? DEFAULTIMG} alt={alt} />
      )}
    </AtomImageStyled>
  );
};

export default AtomImage;
