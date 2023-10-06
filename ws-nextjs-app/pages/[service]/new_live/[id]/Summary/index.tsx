/** @jsx jsx */

import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import LegacyText from '#app/legacy/containers/Text';
import LegacyParagraph from '#app/legacy/containers/Paragraph';
import Blocks from '#app/legacy/containers/Blocks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Summary = ({ summaryBlocks }: any) => {
  if (!summaryBlocks) return null;
  const listItems = summaryBlocks[0].model.blocks[0].model.blocks;
  const hasSingleKeyPoint = listItems.length === 1;
  const componentsToRender = { text: LegacyText };
  const singleKeyPointComponentsToRender = { paragraph: LegacyParagraph };

  return (
    // Requires translations
    <section role="region" aria-label="Summary">
      <Heading level={2}>Summary</Heading>
      {hasSingleKeyPoint ? (
        <Blocks
          blocks={listItems[0].model.blocks}
          componentsToRender={singleKeyPointComponentsToRender}
        />
      ) : (
        <Blocks
          blocks={summaryBlocks}
          componentsToRender={componentsToRender}
        />
      )}
    </section>
  );
};

export default Summary;
