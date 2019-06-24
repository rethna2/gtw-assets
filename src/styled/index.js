import React from 'react';

export { default as InputWrap } from './InputWrap';
export { default as Input } from './Input';
export { default as InputNumber } from './InputNumber';
export { default as TextArea } from './TextArea';

export { default as Checkbox } from './Checkbox';
export { default as Button } from './Button';
export { default as ButtonBar } from './ButtonBar';

export { default as Menu } from './Menu';
export { default as DropDown } from './DropDown';
export { default as DropDownMini } from './DropDownMini';
export { default as FuzzyDropDown } from './FuzzyDropDown';

export { default as Overlay } from './Overlay';
export { default as ErrorOverlay } from './ErrorOverlay';
export { default as Section } from './Section';
export { default as LinkButton } from './LinkButton';


export const Loader = () => (
  <div style={{ padding: 30, fontSize: '1.3em', fontFamily: 'var(--font1)' }}>
    Loading
  </div>
);

