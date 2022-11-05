/* eslint-disable no-unused-vars */
import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { FormikValues } from 'formik';
import { motion } from 'framer-motion';
import lodash from 'lodash';
import { ChangeEvent, Ref } from 'react';
import { AtomText } from '../AtomText';
import AtomWrapper from '../Atomwrapper';

type Props = {
  id: string;
  label?: string;
  placeholder?: string;
  onClick?: (args: any) => void;
  min?: string;
  max?: string | number;
  type?:
    | 'text'
    | 'number'
    | 'password'
    | 'email'
    | 'tel'
    | 'search'
    | 'url'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'color'
    | 'range'
    | 'checkbox'
    | 'radio'
    | 'select'
    | 'file'
    | 'hidden'
    | 'image'
    | 'button'
    | 'reset'
    | 'submit'
    | 'textarea';
  value?: string | number;
  onBlur?: (e: any) => void;
  onChange?: (e: ChangeEvent<any>) => void;
  formik?: FormikValues;
  disabled?: boolean;
  options?: {
    value: string;
    label: string;
    id: string;
  }[];
  defaultText?: string;
  customCSS?: SerializedStyles;
  customLabelCSS?: SerializedStyles;
  ref?: Ref<any>;
};

const StyledInput = styled(motion.input)<Props>`
  font-size: 12px;
  font-weight: 600;
  margin: 0px 0px 0px 0px;
  padding: 0px;
  color: #1a1a1a;
  ::placeholder {
    color: #202124;
    opacity: 0.5;
  }
  background-color: #ffffff;
  height: 35px;
  width: 100%;
  max-width: 100%;
  border-radius: 4px;
  border: 1px solid #f2f2f2;

  ${(props) => props?.customCSS}
`;

const AtomInput = (props: Props) => {
  return (
    <>
      <AtomWrapper
        flexDirection="column"
        customCSS={css`
          display: flex;
        `}
      >
        {props.label && (
          <AtomText
            as="label"
            htmlFor={props.id}
            customCSS={css`
              font-weight: 600;
              margin: 0px 0px 0px 0px;
              padding: 0px 0px 0px 5px;
              ${props?.customLabelCSS}
            `}
          >
            {props.label}
          </AtomText>
        )}
        <StyledInput
          {...props}
          value={lodash.get(props.formik?.values, props.id) ?? props.value}
          onChange={props.onChange ?? props.formik?.handleChange}
          onClick={props.onClick}
          onBlur={(e) => {
            props.formik?.handleBlur(e);
            props.onBlur?.(e);
          }}
        />
        {props.formik &&
          (lodash.get(props.formik?.values, props.id) !== `` ||
            lodash.get(props.formik?.touched, props.id)) &&
          lodash.get(props.formik?.errors, props.id) && (
            <AtomText
              as="p"
              customCSS={css`
                color: red;
                font-size: 12px;
              `}
            >
              {lodash.get(props.formik?.errors, props.id)}
            </AtomText>
          )}
      </AtomWrapper>
    </>
  );
};

export default AtomInput;
