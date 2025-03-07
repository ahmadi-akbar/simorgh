import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  outerContainer: ({ palette, mq, spacings }: Theme) =>
    css({
      margin: `0 ${spacings.FULL}rem`,
      backgroundColor: `${palette.WHITE}`,
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_3}`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 ${spacings.DOUBLE}rem`,
      },
    }),
  container: ({ spacings, mq }: Theme) =>
    css({
      padding: `${spacings.DOUBLE}rem 0 0 0`,
      maxWidth: '63.4rem',
      position: 'relative',
      [mq.GROUP_1_MIN_WIDTH]: {
        padding: `${spacings.TRIPLE}rem 0 ${spacings.FULL}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `0 auto`,
      },
    }),
  message: ({ spacings, mq }: Theme) =>
    css({
      marginBottom: `${spacings.HALF}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        marginBottom: `${spacings.FULL}rem`,
      },
    }),
  chevron: ({ palette, spacings, mq }: Theme) =>
    css({
      color: palette.GREY_10,
      fill: 'currentColor',
      marginInlineStart: `${spacings.FULL}rem`,
      verticalAlign: 'middle',
      width: `${pixelsToRem(14)}rem`,
      height: `${pixelsToRem(14)}rem`,
      'a:visited &': {
        color: palette.METAL,
      },
      'a:focus &, a:hover &': {
        color: palette.POSTBOX,
      },
      [mq.FORCED_COLOURS]: {
        fill: 'linkText',
        'a:visited &': {
          fill: 'visitedText',
        },
        'a:active &': {
          fill: 'activeText',
        },
      },
    }),
  link: () =>
    css({
      display: 'inline-block',
      textDecoration: 'none',
    }),
  bottomLinkSpacing: ({ spacings, mq }: Theme) =>
    css({
      padding: `${spacings.HALF}rem 0 ${spacings.DOUBLE}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        padding: `${spacings.FULL}rem 0 ${spacings.DOUBLE}rem`,
      },
    }),
  topLinkSpacing: ({ spacings }: Theme) =>
    css({
      padding: `${spacings.FULL + spacings.HALF}rem 0 ${spacings.FULL + spacings.HALF}rem`,
    }),
  linkText: ({ palette }: Theme) =>
    css({
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_10}`,
      textDecoration: 'none',
      'a:visited &': {
        color: palette.METAL,
        borderBottom: `${pixelsToRem(1)}rem solid ${palette.METAL}`,
      },
      'a:focus &, a:hover &': {
        borderBottom: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`,
        color: palette.POSTBOX,
      },
    }),
};
