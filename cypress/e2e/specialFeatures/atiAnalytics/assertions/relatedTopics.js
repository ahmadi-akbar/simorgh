import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { RELATED_TOPICS } = COMPONENTS;

export const assertRelatedTopicsComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
}) => {
  it('should send a view event for the Related Topics component', () => {
    cy.url().then(url => {
      interceptATIAnalyticsBeacons();
      cy.visit(url);

      cy.get('[data-testid="related-topics"]').scrollIntoView({
        duration: 1000,
      });

      assertATIComponentViewEvent({
        component: RELATED_TOPICS,
        pageIdentifier,
        contentType,
        useReverb,
      });
    });
  });
};

export const assertRelatedTopicsComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
}) => {
  it('should send a click event for the Related Topics component', () => {
    cy.url().then(url => {
      interceptATIAnalyticsBeacons();
      cy.visit(url);

      cy.get('[data-testid="related-topics"]').scrollIntoView({
        duration: 1000,
      });

      // Click on first item
      cy.get('[data-testid="related-topics"]').find('a').first().click();

      assertATIComponentClickEvent({
        component: RELATED_TOPICS,
        pageIdentifier,
        contentType,
        useReverb,
      });

      // return to previous page
      cy.visit(url);
    });
  });
};
