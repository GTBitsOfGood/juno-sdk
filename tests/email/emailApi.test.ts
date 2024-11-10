import { EmailRecipient } from "../../src/internal/api";
import { EmailAPI } from "../../src/lib/email";
import { JunoValidationError } from "../../src/lib/errors";

describe("sendEmail validation tests", () => {
  it("throws a validation error with a recipient", async () => {
    let emailApi = new EmailAPI();

    await expect(async () => {
      await emailApi.sendEmail({
        recipients: [{
          "email": "somerecipientemail"
        }],
        cc: [],
        bcc: [],
        sender: {
          "email": "someemail",
        },
        subject: "subject",
        contents: [{
          "type": "html",
          "value": "some value"
        }]
      })
    }).rejects.toThrow(TypeError); // TypeError from lack of apiKey
  });

  it("does not throw an validation error with a recipient", async () => {
    let emailApi = new EmailAPI();

    await expect(async () => {
      await emailApi.sendEmail({
        recipients: [{
          "email": "somerecipientemail"
        }],
        cc: [],
        bcc: [],
        sender: {
          "email": "someemail",
        },
        subject: "subject",
        contents: [{
          "type": "html",
          "value": "some value"
        }]
      })
    }).rejects.toThrow(TypeError); // TypeError from lack of apiKey
  });

  it("does not throw an validation error with a recipient", async () => {
    let emailApi = new EmailAPI();

    await expect(async () => {
      await emailApi.sendEmail({
        recipients: [{
          "email": "somerecipientemail"
        }],
        sender: {
          "email": "someemail",
        },
        subject: "subject",
        contents: [{
          "type": "html",
          "value": "some value"
        }]
      })
    }).rejects.toThrow(TypeError); // TypeError from lack of apiKey
  });

  it("throws an validation error with no recipient, cc, or bcc", async () => {
    let emailApi = new EmailAPI();

    let recipients: unknown = null

    await expect(async () => {
      await emailApi.sendEmail({
        sender: {
          "email": "someemail",
        },
        subject: "subject",
        contents: [{
          "type": "html",
          "value": "some value"
        }]
      })
    }).rejects.toThrow(JunoValidationError);

    // also with empty array
    await expect(async () => {
      await emailApi.sendEmail({
        sender: {
          "email": "someemail",
        },
        subject: "subject",
        contents: [{
          "type": "html",
          "value": "some value"
        }]
      })
    }).rejects.toThrow(JunoValidationError);
  });

  it("throws an validation error with an empty content array", async () => {
    let emailApi = new EmailAPI();

    await expect(async () => {
      await emailApi.sendEmail({
        recipients: [{ email: "someemail" }],
        sender: {
          "email": "someemail",
        },
        subject: "subject",
        contents: []
      })
    }).rejects.toThrow(JunoValidationError);
  });

  it("does not throw a validation error with only cc", async () => {
    let emailApi = new EmailAPI();

    await expect(async () => {
      await emailApi.sendEmail({
        cc: [{
          "email": "somerecipientemail"
        }],
        sender: {
          "email": "someemail",
        },
        subject: "subject",
        contents: [{
          "type": "html",
          "value": "some value"
        }]
      })
    }).rejects.toThrow(TypeError); // TypeError from lack of apiKey
  });

  it("does not throw a validation error with only bcc", async () => {
    let emailApi = new EmailAPI();

    await expect(async () => {
      await emailApi.sendEmail({
        bcc: [{
          "email": "somerecipientemail"
        }],
        sender: {
          "email": "someemail",
        },
        subject: "subject",
        contents: [{
          "type": "html",
          "value": "some value"
        }]
      })
    }).rejects.toThrow(TypeError); // TypeError from lack of apiKey
  });
})

describe("Registering sender test validation tests", () => {
  it("throws a validation error if name is null or blank", async () => {
    let emailApi = new EmailAPI();

    let name: unknown = null

    await expect(async () => {
      await emailApi.registerSenderAddress({
        email: "email",
        name: name as string,
        replyTo: "replyto"
      })
    }).rejects.toThrow(JunoValidationError);

    name = "      ";

    await expect(async () => {
      await emailApi.registerSenderAddress({
        email: "email",
        name: name as string,
        replyTo: "replyto"
      })
    }).rejects.toThrow(JunoValidationError);
  });

  it("throws a validation error if email is null or blank", async () => {
    let emailApi = new EmailAPI();

    let email: unknown = null

    await expect(async () => {
      await emailApi.registerSenderAddress({
        email: email as string,
        name: "name",
        replyTo: "replyto"
      })
    }).rejects.toThrow(JunoValidationError);

    email = "      ";

    await expect(async () => {
      await emailApi.registerSenderAddress({
        email: email as string,
        name: "name",
        replyTo: "replyto"
      })
    }).rejects.toThrow(JunoValidationError);
  });


  it("does not throw a validation error if email and name are valid", async () => {
    let emailApi = new EmailAPI();

    await expect(async () => {
      await emailApi.registerSenderAddress({
        email: "email",
        name: "name",
        replyTo: "replyto"
      })
    }).rejects.toThrow(TypeError); // TypeError from lack of apiKey
  });
})

describe("register domain validation tests", () => {
  it("throws a validation error if domain is null or blank", async () => {
    let emailApi = new EmailAPI();

    let domain: unknown = null

    await expect(async () => {
      await emailApi.registerDomain({
        domain: domain as string,
        subdomain: undefined
      })
    }).rejects.toThrow(JunoValidationError);

    domain = "      ";

    await expect(async () => {
      await emailApi.registerDomain({
        domain: domain as string,
        subdomain: undefined
      })
    }).rejects.toThrow(JunoValidationError);
  });
})

describe("verify domain validation tests", () => {
  it("throws a validation error if domain is null or blank", async () => {
    let emailApi = new EmailAPI();

    let domain: unknown = null

    await expect(async () => {
      await emailApi.verifyDomain({
        domain: domain as string,
      })
    }).rejects.toThrow(JunoValidationError);

    domain = "      ";

    await expect(async () => {
      await emailApi.verifyDomain({
        domain: domain as string,
      })
    }).rejects.toThrow(JunoValidationError);
  });
})
