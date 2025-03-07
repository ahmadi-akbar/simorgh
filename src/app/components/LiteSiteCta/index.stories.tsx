import React from 'react';
import LiteSiteCTA from '.';
import metadata from './metadata.json';
import readme from './README.md';

export const Component = () => <LiteSiteCTA />;

export default {
  title: 'Components/LiteSiteCTA',
  Component,
  parameters: {
    metadata,
    docs: { readme },
  },
};
