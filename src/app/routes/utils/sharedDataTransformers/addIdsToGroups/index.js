import path from 'ramda/src/path.js';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft.js';

import addIdsToItems from '../addIdsToItems';

export default json => {
  const groups = path(['content', 'groups'], json);

  if (groups) {
    const newGroups = groups.map(({ items, ...group }) => ({
      ...group,
      items: addIdsToItems({
        pathToItems: [],
      })(items),
    }));

    return mergeDeepLeft(
      {
        content: {
          groups: newGroups,
        },
      },
      json,
    );
  }

  return json;
};
