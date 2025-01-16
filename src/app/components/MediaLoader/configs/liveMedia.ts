import filterForBlockType from '#lib/utilities/blockHandlers';
import moment from 'moment';
import { ConfigBuilderProps, ConfigBuilderReturnProps } from '../types';

export default ({
  blocks,
  basePlayerConfig,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const { model: liveMediaBlock } = filterForBlockType(blocks, 'liveMedia');
  let warning = null;

  const {
    imageUrlTemplate: holdingImageURL,
    version: video,
    title,
    synopses: { short },
  } = liveMediaBlock;

  const { warnings } = video;

  if (warnings) {
    warning = warnings.warning_text;
  }

  const rawDuration = moment.duration(video?.duration).asSeconds();

  return {
    playerConfig: {
      ...basePlayerConfig,
      autoplay: false,
      statsObject: {
        ...basePlayerConfig.statsObject,
        episodePID: liveMediaBlock.id,
      },
      playlistObject: {
        title,
        holdingImageURL,
        items: [
          {
            versionID: video?.vpid,
            kind: 'programme',
            duration: rawDuration,
            live: video.status === 'LIVE',
          },
        ],
        summary: short,
        ...(warning && { warning }),
      },
    },
    mediaType: 'video',
    showAds: false,
  };
};
