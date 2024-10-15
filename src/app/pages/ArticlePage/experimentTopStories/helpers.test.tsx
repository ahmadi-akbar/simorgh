import { getExperimentTopStoriesBlocks } from './helpers';
import { topStoriesList } from '../PagePromoSections/TopStoriesSection/fixture/index';

describe('AMP top stories experiment', () => {
  const mockTextBlock = {
    type: 'text',
    model: {
      blocks: [],
    },
  };
  const expectedExperimentTopStoriesBlock = {
    type: 'experimentTopStories',
    model: topStoriesList,
    id: 'experimentTopStories-1',
  };

  const blocksEvenLength = [mockTextBlock, mockTextBlock];
  const blocksOddLength = [mockTextBlock, mockTextBlock, mockTextBlock];

  describe('getExperimentTopStoriesBlocks()', () => {
    it('returns shouldEnableExperimentTopStories as true if props match conditions.', () => {
      const { shouldEnableExperimentTopStories } =
        getExperimentTopStoriesBlocks({
          blocks: blocksEvenLength,
          topStoriesContent: topStoriesList,
          isAmp: true,
          id: 'c6v11qzyv8po',
          service: 'news',
        });
      expect(shouldEnableExperimentTopStories).toBe(true);
    });

    it.each`
      testDescription                                | isAmp    | id                | service
      ${'all props are undefined'}                   | ${false} | ${undefined}      | ${undefined}
      ${'only isAmp is true'}                        | ${true}  | ${undefined}      | ${undefined}
      ${'only pathname is undefined'}                | ${true}  | ${undefined}      | ${'news'}
      ${'only pathname is defined and valid'}        | ${false} | ${'c6v11qzyv8po'} | ${undefined}
      ${'all props defined but pathname is invalid'} | ${false} | ${'c1231qzyv8po'} | ${undefined}
      ${'only service is undefined'}                 | ${true}  | ${'c6v11qzyv8po'} | ${undefined}
      ${'only service is defined and valid'}         | ${false} | ${undefined}      | ${'news'}
      ${'all props defined but service is invalid'}  | ${true}  | ${'c6v11qzyv8po'} | ${'igbo'}
    `(
      'returns shouldEnableExperimentTopStories as false because $testDescription.',
      ({ isAmp, id, service }) => {
        const { shouldEnableExperimentTopStories } =
          getExperimentTopStoriesBlocks({
            blocks: blocksEvenLength,
            topStoriesContent: topStoriesList,
            isAmp,
            id,
            service,
          });

        expect(shouldEnableExperimentTopStories).toBe(false);
      },
    );

    const expectedBlocksEvenLength = [
      mockTextBlock,
      expectedExperimentTopStoriesBlock,
      mockTextBlock,
    ];
    const expectedBlocksOddLength = [
      mockTextBlock,
      expectedExperimentTopStoriesBlock,
      mockTextBlock,
      mockTextBlock,
    ];

    it.each`
      testType  | inputBlocks         | expectedOutput
      ${'even'} | ${blocksEvenLength} | ${expectedBlocksEvenLength}
      ${'odd'}  | ${blocksOddLength}  | ${expectedBlocksOddLength}
    `(
      'should insert experimentTopStories block into blocks array in the correct position when blocks.length is $testType',
      ({ inputBlocks, expectedOutput }) => {
        const { transformedBlocks } = getExperimentTopStoriesBlocks({
          blocks: inputBlocks,
          topStoriesContent: topStoriesList,
          isAmp: true,
          id: 'c6v11qzyv8po',
          service: 'news',
        });
        expect(transformedBlocks).toEqual(expectedOutput);
      },
    );
  });
});
