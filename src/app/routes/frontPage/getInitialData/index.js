import pipe from 'ramda/src/pipe';
import path from 'ramda/src/path';
import filterUnknownContentTypes from '#app/routes/utils/sharedDataTransformers/filterUnknownContentTypes';
import filterEmptyGroupItems from '#app/routes/utils/sharedDataTransformers/filterEmptyGroupItems';
import squashTopStories from '#app/routes/utils/sharedDataTransformers/squashTopStories';
import addIdsToGroups from '#app/routes/utils/sharedDataTransformers/addIdsToGroups';
import filterGroupsWithoutStraplines from '#app/routes/utils/sharedDataTransformers/filterGroupsWithoutStraplines';
import handleError from '#app/routes/utils/handleError';
import fetchDataFromBFF from '#app/routes/utils/fetchDataFromBFF';
import getErrorStatusCode from '#app/routes/utils/fetchPageData/utils/getErrorStatusCode';
import { CPS_ASSET } from '#app/routes/utils/pageTypes';
import nodeLogger from '#app/lib/logger.node';
import { BFF_FETCH_ERROR } from '#app/lib/logger.const';

const logger = nodeLogger(__filename);

const transformJson = pipe(
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToGroups,
  squashTopStories,
  filterGroupsWithoutStraplines,
);

const getRadioSchedulePosition = path(['frontPageRadioSchedule', 'value']);

export default async ({
  path: pathname,
  service,
  variant,
  toggles,
  getAgent,
}) => {
  try {
    const pageDataPromise = fetchDataFromBFF({
      pathname,
      pageType: CPS_ASSET, // Legacy Front Pages are curated in CPS and fetched from the BFF using pageType = CPS_ASSET and id = service/front_page
      service,
      variant,
      getAgent,
    });

    const radioSchedulePosition = getRadioSchedulePosition(toggles);

    const { json, status } = await pageDataPromise;

    if (!json?.data?.article) {
      throw handleError('Front page data is malformed', 500);
    }

    return {
      status,
      pageData: {
        ...transformJson(json?.data?.article),
        radioScheduleData: json?.radioScheduleData,
        radioSchedulePosition,
        mostRead: json?.data?.secondaryData?.mostRead,
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });

    return { error: message, status };
  }
};
