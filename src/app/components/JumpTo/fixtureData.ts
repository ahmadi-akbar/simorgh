const pidginArticleFixtureWithJumpToBlock = {
  data: {
    article: {
      metadata: {
        atiAnalytics: {
          categoryName: 'US+election+2024',
          contentId: 'urn:bbc:optimo:asset:cn03je8kwpko',
          contentType: 'article',
          language: 'pcm',
          pageTitle: 'Kamala Harris Fox News interview in four short points',
          timePublished: '2024-10-17T09:27:26.770Z',
          timeUpdated: '2024-10-17T09:41:25.801Z',
        },
        id: 'urn:bbc:ares::article:cn03je8kwpko',
        type: 'article',
        language: 'pcm',
      },
      content: {
        model: {
          blocks: [
            {
              id: 'headline',
              type: 'headline',
              model: {
                text: 'Kamala Harris Fox interview in four short points',
              },
            },
            {
              id: 'timestamp',
              type: 'timestamp',
              model: {
                firstPublished: 1729157246770,
                lastPublished: 1729158085801,
              },
            },
            {
              id: 'text-intro',
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'paragraph',
                    model: {
                      text: 'Kamala Harris discusses her views in a Fox interview.',
                    },
                  },
                ],
              },
            },
            {
              id: 'jumpTo',
              type: 'jumpTo',
              model: {
                jumpToHeadings: [
                  { heading: 'Harris separates from Biden' },
                  { heading: 'Prison gender surgery debate' },
                  { heading: 'Apology challenge' },
                  { heading: "Biden's mental state questioned" },
                ],
              },
            },
            {
              id: 'text-main',
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'paragraph',
                    model: {
                      text: "Harris touched on several critical issues in the interview, including Biden's policy and her stance on prison reforms.",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
  contentType: 'application/json; charset=utf-8',
};

export default pidginArticleFixtureWithJumpToBlock;
