/** @jsx jsx */
import { useContext, useState, useEffect } from 'react';
import { jsx } from '@emotion/react';
import { ServiceContext } from '#contexts/ServiceContext';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import Text from '#app/components/Text';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import { OptimizelyContext } from '@optimizely/react-sdk';
import idSanitiser from '../../lib/utilities/idSanitiser';
import styles from './index.styles';

export type Variation = 'variation_1' | 'variation_2' | 'variation_3';

export type JumpToProps = {
  jumpToHeadings?: Array<{ heading: string; id?: string }>;
  showRelatedContentLink?: boolean;
  variation: Variation;
};

type ItemsToRenderProps = JumpToProps & {
  headingTranslations: {
    featuresAnalysisTitle?: string;
    mostReadTitle?: string;
    relatedContent?: string;
    topStoriesTitle?: string;
  };
};

const getItemsToRender = ({
  jumpToHeadings,
  showRelatedContentLink,
  headingTranslations,
  variation,
}: ItemsToRenderProps) => {
  if (variation === 'variation_1') {
    return [
      ...(jumpToHeadings
        ? jumpToHeadings.map(({ heading }) => ({
            heading,
            id: idSanitiser(heading),
          }))
        : []),
      ...(showRelatedContentLink
        ? [
            {
              heading: headingTranslations?.relatedContent || 'Related content',
              id: 'section-label-heading-related-content-heading',
            },
          ]
        : []),
    ];
  }

  if (variation === 'variation_2' || variation === 'variation_3') {
    return [
      ...(showRelatedContentLink
        ? [
            {
              heading: headingTranslations?.relatedContent || 'Related content',
              id: 'section-label-heading-related-content-heading',
            },
          ]
        : []),
      {
        heading: headingTranslations?.topStoriesTitle || 'Top Stories',
        id: 'section-label-heading-top-stories-heading',
      },
      {
        heading:
          headingTranslations?.featuresAnalysisTitle || 'Features & Analysis',
        id: 'section-label-heading-features-analysis-heading',
      },
      {
        heading: headingTranslations?.mostReadTitle || 'Most Read',
        id: 'section-label-heading-Most-Read',
      },
    ];
  }

  return null;
};

const JumpTo = ({
  jumpToHeadings,
  showRelatedContentLink,
  variation,
}: JumpToProps) => {
  const { optimizely } = useContext(OptimizelyContext);
  const {
    translations: {
      articlePage,
      featuresAnalysisTitle,
      relatedContent,
      topStoriesTitle,
    },
    mostRead: { header: mostReadTitle },
  } = useContext(ServiceContext);

  const eventTrackingData: EventTrackingMetadata = {
    componentName: 'jumpto',
    optimizely,
  };

  const [hash, setHash] = useState('');

  const viewRef = useViewTracker(eventTrackingData);
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

  useEffect(() => {
    setHash(window.location.hash);
  }, []);

  const linkClickHandler = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    subheadingId: string,
  ) => {
    clickTrackerHandler(e);
    setHash(subheadingId);
  };

  const headingsToRender = getItemsToRender({
    jumpToHeadings,
    showRelatedContentLink,
    headingTranslations: {
      featuresAnalysisTitle,
      mostReadTitle,
      relatedContent,
      topStoriesTitle,
    },
    variation,
  });

  const titleId = 'jump-to-heading';

  const { jumpToTitle } = articlePage || {};

  const titleToRender = {
    variation_1: jumpToTitle?.variation_1 || 'Jump to',
    variation_2: jumpToTitle?.variation_2 || `Discover more from BBC News`,
    variation_3: jumpToTitle?.variation_3 || `More from BBC News`,
  }[variation];

  return (
    <nav
      ref={viewRef}
      role="navigation"
      aria-labelledby={titleId}
      data-testid="jump-to"
      css={styles.wrapper}
    >
      <Text
        as="strong"
        id={titleId}
        size="doublePica"
        fontVariant="sansBold"
        css={styles.title}
      >
        {titleToRender}
      </Text>
      <ol role="list" css={styles.list}>
        {headingsToRender?.map(({ heading, id }) => {
          const idWithHash = `#${id}`;
          const isActiveId = decodeURIComponent(hash) === idWithHash;
          return (
            <li key={idWithHash} css={styles.listItem}>
              <a
                href={idWithHash}
                onClick={e => linkClickHandler(e, idWithHash)}
                css={styles.link}
                data-testid={`jump-to-link-${id}`}
              >
                <span
                  css={[styles.linkText, isActiveId && styles.linkTextActive]}
                >
                  {heading}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default JumpTo;
