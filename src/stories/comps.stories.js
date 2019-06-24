import React from 'react';
import { storiesOf } from '@storybook/react';
import EnglishInput from '../comps/EnglishInput';
import TamilInput from '../comps/TamilInput';

storiesOf('Components', module)
  .add('English Keyboard', () => <EnglishInput />)
  .add('Tamil Keyboard', () => <TamilInput />)