import {
  HOME_PAGE,
  STORY_PAGE,
  MEDIA_ASSET_PAGE,
  CORRESPONDENT_STORY_PAGE,
  ARTICLE_PAGE,
  FRONT_PAGE,
  TOPIC_PAGE,
  MEDIA_ARTICLE_PAGE,
  FEATURE_INDEX_PAGE,
  MOST_READ_PAGE,
  PHOTO_GALLERY_PAGE,
  ERROR_PAGE,
  LIVE_PAGE,
  CPS_ASSET,
  STATIC_PAGE,
  UGC_PAGE,
  AV_EMBEDS,
  DOWNLOADS_PAGE,
  LIVE_RADIO_PAGE,
  AUDIO_PAGE,
  TV_PAGE,
} from '../../../routes/utils/pageTypes';
import {
  buildPageATIUrl,
  buildPageATIParams,
  buildPageReverbParams,
} from './buildParams';
import {
  buildIndexPageATIParams,
  buildIndexPageATIUrl,
} from './frontPage/buildParams';
import { RequestContextProps } from '../../../contexts/RequestContext';
import { ServiceConfig } from '../../../models/types/serviceConfig';
import {
  PageData,
  ATIPageTrackingProps,
  ATIConfigurationDetailsProviders,
  ReverbDetailsProviders,
} from '../types';
import { PageTypes } from '../../../models/types/global';

const MIGRATED_PAGE_TYPES: PageTypes[] = [
  HOME_PAGE,
  ARTICLE_PAGE,
  MEDIA_ARTICLE_PAGE,
  TOPIC_PAGE,
  MOST_READ_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
  MEDIA_ASSET_PAGE,
  CORRESPONDENT_STORY_PAGE,
  FEATURE_INDEX_PAGE,
  LIVE_PAGE,
  STATIC_PAGE,
  DOWNLOADS_PAGE,
  LIVE_RADIO_PAGE,
  AUDIO_PAGE,
  TV_PAGE,
];

const noOp = () => {
  return {};
};

const pageTypeUrlBuilders = {
  [ARTICLE_PAGE]: noOp,
  [MEDIA_ARTICLE_PAGE]: noOp,
  [STORY_PAGE]: noOp,
  [FRONT_PAGE]: buildIndexPageATIUrl,
  [MOST_READ_PAGE]: noOp,
  [FEATURE_INDEX_PAGE]: noOp,
  [TOPIC_PAGE]: noOp,
  [MEDIA_ASSET_PAGE]: noOp,
  [PHOTO_GALLERY_PAGE]: noOp,
  [CORRESPONDENT_STORY_PAGE]: noOp,
  [HOME_PAGE]: noOp,
  [ERROR_PAGE]: noOp,
  [LIVE_PAGE]: noOp,
  [CPS_ASSET]: noOp,
  [STATIC_PAGE]: noOp,
  [UGC_PAGE]: noOp,
  [AV_EMBEDS]: noOp,
  [DOWNLOADS_PAGE]: noOp,
  [LIVE_RADIO_PAGE]: noOp,
  [AUDIO_PAGE]: noOp,
  [TV_PAGE]: noOp,
};

const pageTypeParamBuilders = {
  [ARTICLE_PAGE]: noOp,
  [MEDIA_ARTICLE_PAGE]: noOp,
  [FRONT_PAGE]: buildIndexPageATIParams,
  [MOST_READ_PAGE]: noOp,
  [FEATURE_INDEX_PAGE]: noOp,
  [TOPIC_PAGE]: noOp,
  [MEDIA_ASSET_PAGE]: noOp,
  [PHOTO_GALLERY_PAGE]: noOp,
  [CORRESPONDENT_STORY_PAGE]: noOp,
  [STORY_PAGE]: noOp,
  [HOME_PAGE]: noOp,
  [ERROR_PAGE]: noOp,
  [LIVE_PAGE]: noOp,
  [CPS_ASSET]: noOp,
  [STATIC_PAGE]: noOp,
  [UGC_PAGE]: noOp,
  [AV_EMBEDS]: noOp,
  [DOWNLOADS_PAGE]: noOp,
  [LIVE_RADIO_PAGE]: noOp,
  [AUDIO_PAGE]: noOp,
  [TV_PAGE]: noOp,
};

type BuilderFunction = {
  (
    data: PageData,
    requestContext: RequestContextProps,
    serviceContext: ServiceConfig,
    contentType?: string,
  ): string | ATIPageTrackingProps | null;
};

type PageTypeHandlers = {
  [_key in PageTypes]: BuilderFunction;
};

const isMigrated = (pageType: PageTypes) =>
  MIGRATED_PAGE_TYPES.includes(pageType);

const createBuilderFactory = (
  requestContext: RequestContextProps,
  pageTypeHandlers: PageTypeHandlers,
) => {
  const { pageType } = requestContext;

  return pageTypeHandlers[pageType] || noOp;
};

export const buildATIUrl = ({
  requestContext,
  serviceContext,
  data,
  atiData,
}: ATIConfigurationDetailsProviders) => {
  const { pageType } = requestContext;

  if (atiData && isMigrated(pageType)) {
    return buildPageATIUrl({ atiData, requestContext, serviceContext });
  }

  if (data) {
    return createBuilderFactory(requestContext, pageTypeUrlBuilders)(
      data,
      requestContext,
      serviceContext,
    );
  }

  return null;
};

export const buildReverbParams = ({
  requestContext,
  serviceContext,
  atiData,
}: ReverbDetailsProviders) => {
  return buildPageReverbParams({ atiData, requestContext, serviceContext });
};

export const buildATIEventTrackingParams = ({
  requestContext,
  serviceContext,
  data,
  atiData,
}: ATIConfigurationDetailsProviders) => {
  const { pageType } = requestContext;
  if (atiData && isMigrated(pageType)) {
    return buildPageATIParams({
      atiData,
      requestContext,
      serviceContext,
    });
  }

  const buildParams = createBuilderFactory(
    requestContext,
    pageTypeParamBuilders,
  );

  return buildParams(data as PageData, requestContext, serviceContext);
};
