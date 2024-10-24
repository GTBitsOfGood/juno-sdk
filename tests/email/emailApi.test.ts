import { EmailAPI } from "../../src/lib/email";
import { JunoError } from "../../src/lib/errors";

describe("Email validation tests", () => {
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
  }
  );
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

  it("does throw an validation error with no recipient, cc, or bcc", async () => {
    let emailApi = new EmailAPI();

    await expect(async () => {
      await emailApi.sendEmail({
        recipients: [],
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
    }).rejects.toThrow(JunoError); // TypeError from lack of apiKey
  });

  it("does not throw a validation error with only cc", async () => {
    let emailApi = new EmailAPI();

    await expect(async () => {
      await emailApi.sendEmail({
        recipients: [],
        cc: [{
          "email": "somerecipientemail"
        }],
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

  it("does not throw a validation error with only bcc", async () => {
    let emailApi = new EmailAPI();

    await expect(async () => {
      await emailApi.sendEmail({
        recipients: [],
        cc: [],
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
