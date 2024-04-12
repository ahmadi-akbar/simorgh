import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  clickAreaContainer: () =>
    css({
      cursor: 'pointer',
    }),
  headerContainer: ({ mq }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      [mq.HIGH_CONTRAST]: {
        borderBottom: `solid ${pixelsToRem(1)}rem transparent`,
      },
    }),
  backgroundContainer: () =>
    css({
      position: 'absolute',
      top: '0',
      bottom: '0',
      width: '100%',
      overflow: 'hidden',
    }),
  backgroundColor: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.GREY_10,
      width: '100%',
      top: 0,
      bottom: 0,
      position: 'absolute',
    }),
  contentContainer: ({ mq, gridWidths }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
        margin: '0 auto',
        position: 'relative',
        width: '100%',
      },
    }),
  heading: ({ palette }: Theme) =>
    css({
      paddingTop: '1.5rem',
      paddingBottom: '0.5rem',
      color: palette.WHITE,
    }),
  textContainerWithImage: ({ mq, spacings }: Theme) =>
    css({
      position: 'relative',
      padding: `${spacings.FULL}rem ${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.FULL}rem ${spacings.DOUBLE}rem ${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE}rem`,
        minHeight: `${pixelsToRem(440)}rem`, // calculation includes padding
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '50%', // determines width of text overlay.
      },
    }),
  titleWithImage: ({ palette }: Theme) =>
    css({
      display: 'block',
      color: palette.GREY_1,
      width: '100%',
    }),

  description: ({ palette, spacings }: Theme) =>
    css({
      color: palette.GREY_2,
      margin: 0,
      marginTop: `${spacings.DOUBLE}rem`,
    }),
};
