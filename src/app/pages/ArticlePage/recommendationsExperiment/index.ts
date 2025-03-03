import { MostReadData } from '#app/components/MostRead/types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { singleTextBlock } from '#app/models/blocks';
import { OptimoBlock, Recommendation } from '#app/models/types/optimo';
import { useContext } from 'react';

export type OptimizelyVariation =
  | 'wsoj'
  | 'wsoj_most_read'
  | 'wsoj_related_content'
  | 'wsoj_off'
  | 'off';

type GetWsojTitleProps = {
  variation?: OptimizelyVariation;
};

export const useWsojTitle = ({ variation }: GetWsojTitleProps = {}) => {
  const {
    translations: {
      relatedContent = 'Related content',
      recommendationTitle = 'Recommended stories',
    } = {},
    mostRead: { header: mostReadTitle = 'Most read' } = {},
  } = useContext(ServiceContext);

  switch (variation) {
    case 'wsoj':
      return recommendationTitle;
    case 'wsoj_most_read':
      return mostReadTitle;
    case 'wsoj_related_content':
      return relatedContent;
    default:
      return recommendationTitle;
  }
};

type TransformRecsDataProps = {
  wsojRecs: Recommendation[];
  mostRead: MostReadData;
  pageBlocks: OptimoBlock[];
  variation?: OptimizelyVariation;
};

export const transformRecsData = ({
  wsojRecs,
  mostRead,
  pageBlocks,
  variation,
}: TransformRecsDataProps) => {
  // Optimizely will return null initially and then 'off' for users who are not in the experiment
  if (!variation || variation === 'off') return wsojRecs || [];

  if (variation === 'wsoj_off') return [];

  if (variation === 'wsoj') return wsojRecs || [];

  if (variation === 'wsoj_related_content') {
    const relatedContentBlock = pageBlocks.find(
      block => block.type === 'relatedContent',
    );

    if (!relatedContentBlock) return [];

    // @ts-expect-error - nested block structure
    const relatedContentItems = relatedContentBlock?.model?.blocks?.slice(0, 4);

    const transformedRelatedContentItems = relatedContentItems?.map(
      (item: OptimoBlock) => {
        // @ts-expect-error - nested block structure
        const itemBlocks = item?.model?.blocks;

        const imageBlock = itemBlocks?.find(
          (block: OptimoBlock) => block.type === 'image',
        );
        const textBlock = itemBlocks?.find(
          (block: OptimoBlock) => block.type === 'text',
        );
        const canonicalUrl =
          textBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.locator;

        return {
          headlines: {
            promoHeadline: {
              blocks: textBlock?.model?.blocks,
            },
          },
          images: {
            defaultPromoImage: {
              blocks: imageBlock?.model?.blocks,
            },
          },
          locators: { canonicalUrl },
        };
      },
    );

    return transformedRelatedContentItems || [];
  }

  if (variation === 'wsoj_most_read') {
    const mostReadItems = mostRead?.items?.slice(0, 4);

    const transformedMostReadItems = mostReadItems?.map(item => {
      return {
        headlines: {
          promoHeadline: {
            blocks: [singleTextBlock(item.title)],
          },
        },
        images: item?.images,
        locators: { canonicalUrl: item?.href },
      };
    });

    return transformedMostReadItems || [];
  }

  return [];
};
