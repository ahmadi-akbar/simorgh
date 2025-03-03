import { LITE_ATI_TRACKING } from '#app/hooks/useClickTrackerHandler';
import liteATIClickTracking from '.';

const createAnchor = ({
  href = '/gahuza',
  isLite = true,
}: {
  href?: string;
  isLite?: boolean;
}) => {
  const anchorElement = document.createElement('a');
  anchorElement.href = href;
  if (isLite) {
    anchorElement.setAttribute(
      LITE_ATI_TRACKING,
      'https://logws1363.ati-host.net/?',
    );
  }
  return anchorElement;
};

const dispatchClick = (targetElement: HTMLElement) => {
  document.body.appendChild(targetElement);
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  targetElement.dispatchEvent(event);
};

const testSystemTime = new Date('2024-11-13T16:30:02.000Z');
const testHour = testSystemTime.getHours();
const testMinute = testSystemTime.getMinutes();
const testSecond = testSystemTime.getSeconds();

describe('Click tracking script', () => {
  const originalWindowLocation = window.location;

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(testSystemTime);
    let mockCookie = '';
    Object.defineProperty(document, 'cookie', {
      get() {
        return mockCookie;
      },
      set(cookieValue) {
        mockCookie = cookieValue;
      },
    });
    Object.defineProperty(window, 'location', {
      value: {
        assign: jest.fn(),
      },
    });
    liteATIClickTracking();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    document.cookie = '';
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    window.sendBeaconLite = jest.fn();
    window.dispatchEvent(new Event('load'));
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      value: {
        ...originalWindowLocation,
      },
    });
  });

  it('Does not call sendBeacon if the event has no data-ati-tracking parameter, but still redirects', () => {
    const anchorElement = createAnchor({
      href: '/gahuza',
      isLite: false,
    });

    dispatchClick(anchorElement);

    expect(window.sendBeaconLite).toHaveBeenCalledTimes(0);
    const nextPageUrl = (window.location.assign as jest.Mock).mock.calls[0][0];
    expect(nextPageUrl).toContain('/gahuza');
  });

  it('Does not add userId cookie if crypto is unsupported, but still calls sendBeacon', () => {
    const anchorElement = createAnchor({});

    // @ts-expect-error Some browsers may not have crypto.
    // eslint-disable-next-line no-global-assign
    crypto = undefined;
    dispatchClick(anchorElement);

    const callParam = (window.sendBeaconLite as jest.Mock).mock.calls[0][0];
    const parsedATIParams = Object.fromEntries(new URLSearchParams(callParam));
    expect(parsedATIParams.idclient).toBeUndefined();
  });

  it('Sets a new cookie if there is no atuserid cookie on the user browser', () => {
    const anchorElement = createAnchor({});

    (crypto.randomUUID as jest.Mock).mockReturnValueOnce('randomUniqueId');
    dispatchClick(anchorElement);

    const callParam = (window.sendBeaconLite as jest.Mock).mock.calls[0][0];
    expect(document.cookie).toBe(
      'atuserid=%7B%22val%22%3A%22randomUniqueId%22%7D; path=/; max-age=397; Secure;',
    );
    expect(callParam).toContain('idclient=randomUniqueId');
  });

  it('Does not overwrite content in atuserid cookie if it already exists', () => {
    const anchorElement = createAnchor({});

    const oldCookieId = 'oldCookieId';
    document.cookie = `atuserid=%7B%22name%22%3A%22atuserid%22%2C%22val%22%3A%22${oldCookieId}%22%2C%22options%22%3A%7B%22end%22%3A%222026-03-11T10%3A23%3A55.442Z%22%2C%22path%22%3A%22%2F%22%7D%7D; path=/; max-age=397; Secure;`;
    (crypto.randomUUID as jest.Mock).mockReturnValueOnce('newCookieId');
    dispatchClick(anchorElement);

    const callParam = (window.sendBeaconLite as jest.Mock).mock.calls[0][0];
    expect(document.cookie).toBe(
      `atuserid=%7B%22name%22%3A%22atuserid%22%2C%22val%22%3A%22${oldCookieId}%22%2C%22options%22%3A%7B%22end%22%3A%222026-03-11T10%3A23%3A55.442Z%22%2C%22path%22%3A%22%2F%22%7D%7D; path=/; max-age=397; Secure;`,
    );
    expect(callParam).toContain('idclient=oldCookieId');
  });

  it('Reuses the atuserid cookie if there is a atuserid cookie on the user browser', () => {
    const anchorElement = createAnchor({});

    document.cookie =
      'atuserid={"val":"oldCookieId"}; path=/; max-age=397; Secure;';
    (crypto.randomUUID as jest.Mock).mockReturnValueOnce('newCookieId');
    dispatchClick(anchorElement);

    const callParam = (window.sendBeaconLite as jest.Mock).mock.calls[0][0];
    expect(callParam).toContain('idclient=oldCookieId');
  });

  it('Calls sendBeaconLite() with the correct url', () => {
    const anchorElement = createAnchor({});

    document.cookie =
      'atuserid={"val":"userCookieId"}; path=/; max-age=397; Secure;';

    Object.defineProperty(document, 'referrer', {
      value: 'https://www.bbc.com',
    });
    window.screen = {
      width: 100,
      height: 400,
      colorDepth: 24,
      pixelDepth: 24,
      availWidth: 400,
      availHeight: 100,
      orientation: 'landscape' as unknown as ScreenOrientation,
    };
    window.innerWidth = 4060;
    window.innerHeight = 1080;
    Object.defineProperty(navigator, 'language', {
      get() {
        return 'en-GB';
      },
    });

    dispatchClick(anchorElement);

    const callParam = (window.sendBeaconLite as jest.Mock).mock.calls[0][0];
    const parsedATIParams = Object.fromEntries(new URLSearchParams(callParam));
    expect(parsedATIParams).toMatchObject({
      idclient: 'userCookieId',
      hl: `${testHour}x${testMinute}x${testSecond}`,
      lng: 'en-GB',
      r: '0x0x24x24',
      re: '4060x1080',
      app_type: 'lite',
      ref: 'https://www.bbc.com',
    });
  });
});
