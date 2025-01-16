import React from 'react';
import pidginArticleFixtureWithJumpToBlock from './fixtureData';
import JumpTo, { JumpToProps } from '.';
import metadata from './metadata.json';
import readme from './README.md';

const Component = ({
  jumpToHeadings = [],
  showRelatedContentLink = false,
  variation,
}: JumpToProps) => {
  return (
    <JumpTo
      jumpToHeadings={jumpToHeadings}
      showRelatedContentLink={showRelatedContentLink}
      variation={variation}
    />
  );
};

const jumpToBlock =
  pidginArticleFixtureWithJumpToBlock.data.article.content.model.blocks.find(
    block => block.type === 'jumpTo',
  );

const jumpToHeadings = jumpToBlock?.model.jumpToHeadings ?? [];

export default {
  title: 'Components/JumpTo',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const Variation1 = () => {
  return (
    <Component
      jumpToHeadings={jumpToHeadings}
      showRelatedContentLink
      variation="variation_1"
    />
  );
};

export const Variation2 = () => {
  return <Component variation="variation_2" />;
};

export const Variation2withRelatedContent = () => {
  return <Component variation="variation_2" showRelatedContentLink />;
};

export const Variation3 = () => {
  return <Component variation="variation_3" />;
};

export const Variation3withRelatedContent = () => {
  return <Component variation="variation_3" showRelatedContentLink />;
};
