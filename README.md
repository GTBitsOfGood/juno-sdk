<div align="center">
  
  <a href="">![E2E Tests](https://img.shields.io/github/actions/workflow/status/GTBitsOfGood/juno-sdk/unit-tests.yml?style=for-the-badge)</a> 
  <a href="">![GitHub Releases](https://img.shields.io/github/v/release/GTBitsOfGood/juno?include_prereleases&style=for-the-badge)</a>
  <a href="">![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)</a>
  
</div>
  
<h3 align="center">
  Juno SDK
</h3>

<div align="center">
  
[Bits of Good](https://bitsofgood.org/)'s central infrastructure API, integrating several in-house services to simplify and streamline project development.

</div>

> 📖 Juno's docs live at [juno.bitsofgood.org/docs](https://juno.bitsofgood.org/docs) (still being filled in, see [juno#267](https://github.com/GTBitsOfGood/juno/issues/267)). The dashboard is at [juno.bitsofgood.org](https://juno.bitsofgood.org).

# Juno SDK

**Juno SDK** is a development toolkit for interacting with [Juno](https://github.com/GTBitsOfGood/juno)'s central infrastructure. This SDK provides comprehensive API bindings to simplify common tasks such as authentication, email management, user management, and project-related operations. The following guide outlines the core structure of the SDK and provides basic usage examples to help new developers get started.

## SDK Structure

### Models

The SDK uses several models to structure the data exchanged between the client and Juno's services. These models represent the input data for API requests and the output data returned by the server.

#### Key Models:

- **CreateProjectModel**: Defines the structure for creating a new project.
- **CreateUserModel**: Contains the necessary fields to create a new user (email, name, password).
- **IssueApiKeyRequest**: Defines the request data for issuing an API key for a project.
- **IssueApiKeyResponse**: Contains the API key returned when a new API key is issued.
- **EmailContent**: Represents the content of an email, including its MIME type and body.
- **EmailRecipient**: Specifies the email and name of the recipient.
- **EmailSender**: Specifies the email and name of the sender.
- **GetSendersResponse**: Lists a project's verified senders (`VerifiedSenderResponse`, including `verified` and `locked`).
- **GetDomainsResponse**: Lists a project's authenticated domains (`AuthenticatedDomainResponse`, including a boolean `valid`).
- **ProjectResponse**: Represents the response received when querying project details.

### API Endpoints

The SDK includes API methods for interacting with Juno services. These methods abstract the complexities of making HTTP requests and ensure that data is structured according to Juno's requirements.

#### Core clients:

Call `juno.init({ apiKey, baseURL })` once, then use the client for each service off the `juno` object:

- **AuthClient** (`juno.auth`): Handles authentication tasks, such as issuing API keys and generating JWT tokens.
- **EmailClient** (`juno.email`): Manages email operations like sending emails, registering and verifying domains, registering senders, and listing a project's senders and domains.
- **ProjectClient** (`juno.project`): Manages project-related tasks, including creating projects and linking users.
- **UserClient** (`juno.user`): Handles user operations, including creating users and managing user roles.
- **FileClient** (`juno.file`), **AnalyticsClient** (`juno.analytics`) and **AnalyticsConfigClient** (`juno.analyticsConfig`) cover file storage and analytics.

The `*Client` classes wrap the OpenAPI-generated `*Api` classes in `src/internal` (for example `EmailClient` wraps `EmailApi`) and add validation and auth headers. Earlier versions named the wrappers `*API` (`EmailAPI`, `AuthAPI`, ...). Those names are still exported as deprecated aliases of the `*Client` classes and will be removed in a future release.

## Usage

The Juno SDK provides a set of APIs for managing various services. Each API is built to simplify interactions with specific Juno infrastructure components. Below is an overview of how to use the main APIs.

### Authentication

The **AuthClient** (`juno.auth`) is used to handle authentication-related tasks, including issuing API keys and generating JWT tokens for secure access to Juno services.

- **Issue API Key**: Create a new API key for project access. This is necessary for authenticating requests to other services.
- **Generate JWT**: Once you have an API key, use it to generate a JWT, which is required to authenticate further API requests.

### Project Management

The **ProjectClient** (`juno.project`) is responsible for managing projects within Juno’s infrastructure:

- **Create Project**: Define and create a new project using the provided model.
- **Link User to Project**: Associate a user with a project, allowing them to access or contribute to the project.

### User Management

The **UserClient** (`juno.user`) is designed for creating and managing users:

- **Create User**: Create a new user by providing necessary details like email, name, and password.
- **Set User Role**: Update a user's role to control access levels (e.g., ADMIN, SUPERADMIN).

### Email Management

The **EmailClient** (`juno.email`) allows you to manage email-related operations, such as registering domains and sending emails. It includes the following functionality:

- **Register Domain**: Register a domain to use as the sender of emails.
- **Verify Domain**: Re-check a registered domain's DNS records.
- **Send Email**: Send an email through Juno’s email service by specifying the sender, recipient, and content.
- **List Senders**: `getSenders(credentials)` returns the verified senders registered for a project.
- **List Domains**: `getDomains(credentials)` returns the authenticated domains registered for a project, each with a boolean `valid` flag.

Pass `{ userJwt, projectId }` as the `credentials` argument to act on a specific project. The gateway only checks that the user has access to that project when a user JWT is sent.

### General Workflow

1. **Authentication**: Start by using the **AuthClient** to issue an API key and generate a JWT token.
2. **Project and User Management**: Set up projects and link users using **ProjectClient** and **UserClient**.
3. **Email Operations**: If your project involves email management, use **EmailClient** to register sender domains and send emails.

## Releasing

Releases are published to npm by the **Publish to npm** GitHub Action whenever a `v*` tag is pushed. It uses [npm trusted publishing](https://docs.npmjs.com/trusted-publishers), so there's no npm token to manage: npm accepts the publish because it comes from this repo's `publish.yml` over GitHub OIDC, and attaches a provenance attestation.

One-time setup, done by an owner of the `juno-sdk` package on npmjs.com: **juno-sdk > Settings > Trusted Publisher > GitHub Actions**, with organization `GTBitsOfGood`, repository `juno-sdk`, workflow filename `publish.yml`, no environment, and **`npm publish` allowed** (new configurations only allow `npm stage publish` unless you tick it). The first publish has to happen within 2 days of creating the configuration, or it expires. Once a release has gone out this way, set **Publishing access** to "Require two-factor authentication and disallow tokens" and revoke any old automation tokens.

1. **Sync generated code (only if juno changed its API).** In GitHub, go to Actions, select **Juno SDK Sync OpenAPI**, and click Run workflow. Leave the tag blank to use the newest juno release. Review and merge the PR it opens, and update the hand-written wrappers in `src/lib` if endpoints changed.
2. **Bump the version.** Branch off an up-to-date `main`, then run:
   ```bash
   pnpm install
   pnpm exec standard-version --skip.tag
   ```
   This bumps `package.json`, updates `CHANGELOG.md` and commits. Add `--release-as 0.0.12` to force a specific version, since on 0.x `standard-version` may otherwise pick a minor bump. Open a PR and merge it.
3. **Tag the merged commit.** After the PR is merged:
   ```bash
   git checkout main && git pull
   git tag v0.0.12
   git push origin v0.0.12
   ```
   The tag must match the `package.json` version, or the action fails.
4. **Check the run.** The action tests, builds, publishes to npm and creates a GitHub release. It fails if that version is already on npm. Confirm with `npm view juno-sdk version`.
5. **Update consumers**, such as `juno-dashboard`, to the new version.

Don't run `npm version` or `pnpm version`: the `version` script in `package.json` runs `standard-version`.
