import React from 'react';

import { configure } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
/*
storiesOf('Welcome2', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
*/
function loadStories() {
  require('./styleGuide.stories');
  require('./crossword.stories');
  require('./wordSearch.stories');
  require('./quiz.stories');
  require('./comps.stories');
  // You can require as many stories as you need.
}
  


configure(loadStories, module);
