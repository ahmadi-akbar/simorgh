import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { SCROLLABLE_PROMO } = COMPONENTS;

export const assertScrollablePromoComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
}) => {
  it('should send a view event for the Scrollable Promo component', () => {
    cy.url().then(url => {
      interceptATIAnalyticsBeacons();
      cy.visit(url);

      cy.get('[data-e2e="scrollable-promos"]').first().scrollIntoView({
        duration: 1000,
      });

      assertATIComponentViewEvent({
        component: SCROLLABLE_PROMO,
        pageIdentifier,
        contentType,
        useReverb,
      });
    });
  });
};

export const assertScrollablePromoComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
}) => {
  it('should send a click event for the Scrollable Promo component', () => {
    cy.url().then(url => {
      interceptATIAnalyticsBeacons();
      cy.visit(url);

      cy.get('[data-e2e="scrollable-promos"]').first().scrollIntoView({
        duration: 1000,
      });

      // Click on first item
      cy.get('[data-e2e="scrollable-promos"]').find('a').first().click();

      assertATIComponentClickEvent({
        component: SCROLLABLE_PROMO,
        pageIdentifier,
        contentType,
        useReverb,
      });

      // return to previous page
      cy.visit(url);
    });
  });
};
