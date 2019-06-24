import React from 'react';
import { storiesOf } from '@storybook/react';

import Crossword from '../showcase/Crossword';
import data from '../showcase/data/cwEngForm.json';

/*
submitShowcase: PropTypes.func.isRequired,
  content: PropTypes.object,
  userData: PropTypes.object,
  callInProg: PropTypes.bool,

  <Crossword>English</Crossword>
  */

console.log('data', data);
storiesOf('Crossword', module)
  .add('English', () => <div>Tamil</div> )
  .add('Tamil', () => <div>Tamil</div>)