import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const TRANSPARENT_BORDER_SPACING = 0.1875;

export default {
  wrapper: ({ palette, spacings, mq }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      padding: `${spacings.FULL - TRANSPARENT_BORDER_SPACING}rem`,
      marginInline: `${spacings.FULL}rem`,
      marginBottom: `${spacings.DOUBLE}rem`,
      border: `${TRANSPARENT_BORDER_SPACING}rem solid transparent`,

      [mq.GROUP_1_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE - TRANSPARENT_BORDER_SPACING}rem`,
      },

      [mq.GROUP_2_MIN_WIDTH]: {
        marginInline: `${spacings.DOUBLE}rem`,
      },

      [mq.GROUP_3_MIN_WIDTH]: {
        marginBottom: `${spacings.QUADRUPLE}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        marginInline: 0,
      },
    }),
  title: ({ palette }: Theme) =>
    css({
      color: palette.GREY_10,
    }),
  list: ({ spacings, mq }: Theme) =>
    css({
      listStyle: 'none',
      padding: 0,
      margin: `${spacings.DOUBLE}rem 0 0 0`,

      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `${pixelsToRem(12)}rem 0 0 0`,
      },
    }),
  listItem: ({ spacings, mq }: Theme) =>
    css({
      marginBottom: `${spacings.FULL}rem`,

      '&:last-child': {
        marginBottom: 0,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        marginBottom: `${pixelsToRem(12)}rem`,
      },
    }),
  link: ({ fontSizes, fontVariants, palette, spacings }: Theme) =>
    css({
      ...fontSizes.pica,
      ...fontVariants.sansBold,
      padding: `${spacings.HALF}rem 0`,
      color: palette.GREY_10,
      display: 'inline-block',

      '&:visited': {
        color: palette.GREY_6,
      },
      '&:focus, &:hover': {
        color: palette.POSTBOX,

        span: {
          textDecorationThickness: `${pixelsToRem(2)}rem`,
        },
      },
    }),
  linkText: ({ spacings }: Theme) =>
    css({
      padding: `${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      display: 'inline-block',
      position: 'relative',
      textDecoration: 'underline',
      textUnderlineOffset: `${spacings.HALF}rem`,
    }),
  linkTextActive: ({ palette }: Theme) =>
    css({
      color: palette.POSTBOX,

      '&::before': {
        position: 'absolute',
        content: '""',
        top: 0,
        insetInlineStart: 0,
        height: '100%',
        border: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`,
      },
    }),
};
