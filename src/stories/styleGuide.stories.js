import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Button,
  ButtonBar,
  Checkbox
} from '../styled';

storiesOf('Style Guide', module)
  .add('general',() => <div>
      <div>Hello</div>
      <ButtonBar> <Button primary>One</Button><Button>Two</Button></ButtonBar>
    </div>)