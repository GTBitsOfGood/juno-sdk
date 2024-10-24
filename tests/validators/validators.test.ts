import { EmailApi } from "../../src/internal/api";
import { EmailRecipient } from "../../src/internal/model/emailRecipient";
import JunoError from "../../src/lib/errors";
import { validateEmailRecipient, validateString } from "../../src/lib/validators";

describe("Email validation tests", () => {
  it("throws an error if a recipient is null", () => {
    let validEmailRecipient: unknown = null;

    expect(() => {
      validateEmailRecipient(validEmailRecipient as EmailRecipient);
    }).toThrow(JunoError);
  });

  it("throws an error if a recipient email is null", () => {
    let validEmailRecipient: unknown = {};

    expect(() => {
      validateEmailRecipient(validEmailRecipient as EmailRecipient);
    }).toThrow(JunoError);

    validEmailRecipient = {
      email: null
    }

    expect(() => {
      validateEmailRecipient(validEmailRecipient as EmailRecipient);
    }).toThrow(JunoError);
  });


  it("throws an error if a recipient email is blank", () => {
    let validEmailRecipient: unknown = {
      email: "     "
    };

    expect(() => {
      validateEmailRecipient(validEmailRecipient as EmailRecipient);
    }).toThrow(JunoError);
  });

  it("throws an error if a recipient name is null", () => {
    let validEmailRecipient: unknown = {
      email: "someEmail"
    };

    expect(() => {
      validateEmailRecipient(validEmailRecipient as EmailRecipient);
    }).toThrow(JunoError);

    validEmailRecipient = {
      email: "someEmail",
      name: null
    };

    expect(() => {
      validateEmailRecipient(validEmailRecipient as EmailRecipient);
    }).toThrow(JunoError);
  });

  it("throws an error if a recipient name is blank", () => {
    let validEmailRecipient: unknown = {
      email: "someEmail",
      name: "    "
    };

    expect(() => {
      validateEmailRecipient(validEmailRecipient as EmailRecipient);
    }).toThrow(JunoError);
  });

});


describe("String validation tests", () => {
  it("throws an error if the string is empty or null", () => {
    let str = "";

    expect(() => {
      validateString(str)
    }).toThrow(JunoError);


    let nullStr: unknown = null;

    expect(() => {
      validateString(nullStr as string)
    }).toThrow(JunoError);
  })

  it("throws an error if the string is blank", () => {
    let str = "      ";

    expect(() => {
      validateString(str)
    }).toThrow(JunoError);
  })
});
