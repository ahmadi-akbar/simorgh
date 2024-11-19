import React from 'react';
import pidginArticleFixtureWithJumpToBlock from './fixtureData';
import JumpTo, { JumpToProps } from '.';
import metadata from './metadata.json';
import readme from './README.md';

const Component = ({
  jumpToHeadings = [],
  showRelatedContentLink = false,
}: JumpToProps) => {
  return (
    <JumpTo
      jumpToHeadings={jumpToHeadings}
      showRelatedContentLink={showRelatedContentLink}
    />
  );
};

export default {
  title: 'Components/JumpTo',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const Example = () => {
  const jumpToBlock =
    pidginArticleFixtureWithJumpToBlock.data.article.content.model.blocks.find(
      block => block.type === 'jumpTo',
    );

  const jumpToHeadings = jumpToBlock?.model.jumpToHeadings ?? [];

  const showRelatedContentLink =
    !!pidginArticleFixtureWithJumpToBlock.data.article.content.model.blocks.find(
      block => block.type === 'relatedContent',
    );
  return (
    <Component
      jumpToHeadings={jumpToHeadings}
      showRelatedContentLink={showRelatedContentLink}
    />
  );
};
