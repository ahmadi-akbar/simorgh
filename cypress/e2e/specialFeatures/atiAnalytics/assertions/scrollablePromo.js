import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { SCROLLABLE_PROMO } = COMPONENTS;

export const assertScrollablePromoComponentView = ({
  pageIdentifier,
  contentType,
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
      });
    });
  });
};

export const assertScrollablePromoComponentClick = ({
  pageIdentifier,
  contentType,
}) => {
  it('should send a click event for the Scrollable Promo component', () => {
    cy.url().then(url => {
      interceptATIAnalyticsBeacons();
      cy.visit(url);

      cy.get('[data-e2e="scrollable-promos"]').first().scrollIntoView({
        duration: 1000,
      });

      // Click on first item
      cy.get('[data-e2e="scrollable-promos"]').first().find('a').click();

      assertATIComponentClickEvent({
        component: SCROLLABLE_PROMO,
        pageIdentifier,
        contentType,
      });

      // return to previous page
      cy.visit(url);
    });
  });
};
