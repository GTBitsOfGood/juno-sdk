import { AnalyticsAPI, AnalyticsClient } from '../../src/lib/analytics';
import {
  AnalyticsConfigAPI,
  AnalyticsConfigClient,
} from '../../src/lib/analyticsConfig';
import { AuthAPI, AuthClient } from '../../src/lib/auth';
import { EmailAPI, EmailClient } from '../../src/lib/email';
import { FileAPI, FileClient } from '../../src/lib/file';
import { JunoAPI, JunoClient, juno } from '../../src/lib/juno';
import { ProjectAPI, ProjectClient } from '../../src/lib/project';
import { UserAPI, UserClient } from '../../src/lib/user';

describe('deprecated *API aliases', () => {
  it('point at the renamed *Client classes', () => {
    expect(AnalyticsAPI).toBe(AnalyticsClient);
    expect(AnalyticsConfigAPI).toBe(AnalyticsConfigClient);
    expect(AuthAPI).toBe(AuthClient);
    expect(EmailAPI).toBe(EmailClient);
    expect(FileAPI).toBe(FileClient);
    expect(ProjectAPI).toBe(ProjectClient);
    expect(UserAPI).toBe(UserClient);
  });

  it('still work as types and constructors', () => {
    const auth: AuthAPI = new AuthAPI(undefined, 'key');
    const email: EmailAPI = new EmailAPI(undefined, auth);
    expect(auth).toBeInstanceOf(AuthClient);
    expect(email).toBeInstanceOf(EmailClient);

    const client: JunoAPI = juno;
    expect(client).toBeInstanceOf(JunoClient);
  });
});
