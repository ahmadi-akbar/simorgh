import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { BILLBOARD } = COMPONENTS;

export const assertBillboardComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
}) => {
  it('should send a view event for the Billboard component', () => {
    cy.url().then(url => {
      interceptATIAnalyticsBeacons();
      cy.visit(url);

      cy.get('[data-testid="billboard-1"]').scrollIntoView({
        duration: 1000,
      });

      assertATIComponentViewEvent({
        component: BILLBOARD,
        pageIdentifier,
        contentType,
        useReverb,
      });
    });
  });
};

export const assertBillboardComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
}) => {
  it('should send a click event for the Billboard component', () => {
    cy.url().then(url => {
      interceptATIAnalyticsBeacons();
      cy.visit(url);

      cy.get('[data-testid="billboard-1"]').scrollIntoView({
        duration: 1000,
      });

      // Click on first item
      cy.get('[data-testid="billboard-1"]').find('a').first().click();

      assertATIComponentClickEvent({
        component: BILLBOARD,
        pageIdentifier,
        contentType,
        useReverb,
      });

      // return to previous page
      cy.visit(url);
    });
  });
};
