import NO_JS_CLASSNAME from '#app/lib/noJs.const';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

export default {
  componentContainer: ({ spacings }: Theme) =>
    css({
      width: '100%',
      marginTop: `${spacings.DOUBLE}rem`,
      [`.${NO_JS_CLASSNAME} &`]: {
        display: 'none',
      },
    }),
  nojs: ({ palette, spacings, fontSizes, fontVariants, mq }: Theme) =>
    css({
      ...fontSizes.pica,
      ...fontVariants.sansRegular,
      color: palette.WHITE,
      div: {
        marginTop: `${spacings.DOUBLE}rem`,
      },
      strong: {
        display: 'block',
        marginTop: `${spacings.DOUBLE}rem`,
        fontWeight: 'normal',
      },
      [mq.FORCED_COLOURS]: {
        color: 'canvasText',
      },
    }),
  mediaButton: () =>
    css({
      position: 'relative',
      padding: 0,
    }),
  openButton: () =>
    css({
      cursor: 'pointer',
      backgroundColor: 'unset',
      border: 'unset',
      textAlign: 'start',
    }),
  watchLiveCTAText: ({ spacings, palette, mq }: Theme) =>
    css({
      color: palette.WHITE,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      svg: {
        height: `${spacings.DOUBLE}rem`,
        width: `${spacings.DOUBLE}rem`,
        verticalAlign: 'middle',
        fill: 'currentcolor',
        color: palette.WHITE,
        marginInlineEnd: `${spacings.FULL}rem`,
        [mq.FORCED_COLOURS]: {
          color: 'canvasText',
        },
      },
      'button:hover &, button:focus-visible &': {
        textDecoration: 'underline',
      },
      [mq.FORCED_COLOURS]: {
        color: 'canvasText',
      },
    }),
  guidanceMessage: ({ palette, spacings, mq }: Theme) =>
    css({
      display: 'block',
      marginTop: `${spacings.DOUBLE}rem`,
      color: palette.GREY_2,
      textAlign: 'start',
      [mq.FORCED_COLOURS]: {
        color: 'canvasText',
      },
    }),
  watchLiveCTA: ({ palette, mq, spacings }: Theme) =>
    css({
      width: `${pixelsToRem(171)}rem`,
      border: 0,
      backgroundColor: palette.LIVE_MEDIUM,
      padding: `${pixelsToRem(11)}rem`,
      marginTop: `${spacings.DOUBLE}rem`,
      [mq.GROUP_2_MAX_WIDTH]: {
        width: '100%',
      },
      [mq.FORCED_COLOURS]: {
        border: `${pixelsToRem(2)}rem solid canvasText`,
      },
    }),
  closeButton: () =>
    css({
      display: 'flex',
      justifyContent: 'space-between',
      cursor: 'pointer',
      background: 'none',
      width: '100%',
      border: 0,
      lineHeight: 0,
      alignItems: 'center',
    }),
  closeContainer: ({ spacings, palette, mq }: Theme) =>
    css({
      verticalAlign: 'center',
      svg: {
        fill: 'currentcolor',
        color: palette.WHITE,
        height: `${spacings.DOUBLE}rem`,
        width: `${spacings.DOUBLE}rem`,
        margin: `${pixelsToRem(13)}rem`,
        [mq.FORCED_COLOURS]: {
          color: 'canvasText',
        },
      },
      backgroundColor: palette.BLACK,
      border: `${palette.WHITE} solid ${pixelsToRem(1)}rem`,
      'button:hover &, button:focus-visible &': {
        backgroundColor: palette.POSTBOX,
        outline: `${palette.WHITE} solid ${pixelsToRem(1)}rem`,
      },
      [mq.FORCED_COLOURS]: {
        color: 'canvasText',
      },
    }),
  mediaLoader: ({ spacings }: Theme) =>
    css({
      maxWidth: '100%',
      marginTop: `${spacings.DOUBLE}rem`,
    }),
  mediaDescription: () =>
    css({
      display: 'block',
      width: '100%',
      marginTop: 0,
      span: { margin: 0 },
    }),
  openMediaDescription: ({ palette, mq }: Theme) =>
    css({
      span: {
        color: palette.GREY_4,
        [mq.FORCED_COLOURS]: {
          color: 'canvasText',
        },
      },
    }),
  closeMediaDescription: ({ mq, palette }: Theme) =>
    css({
      textAlign: 'start',
      span: {
        color: palette.WHITE,
        [mq.FORCED_COLOURS]: {
          color: 'canvasText',
        },
      },
      'button:hover &, button:focus-visible &': {
        span: {
          textDecoration: 'underline',
          [mq.FORCED_COLOURS]: {
            textDecoration: 'underline',
          },
        },
      },
    }),

  hideComponent: () => css({ display: 'none' }),
};
