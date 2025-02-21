import { EmailRecipient } from "../../src/internal/model/emailRecipient";
import { JunoError } from "../../src/lib/errors";
import { validateEmailRecipient, validateProjectIdentifier, validateString, validateUserIdentifier } from "../../src/lib/validators";

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

  it("does not throw an error if a recipient name is null", () => {
    let validEmailRecipient: unknown = {
      email: "someEmail"
    };

    validateEmailRecipient(validEmailRecipient as EmailRecipient);
  });

  it("does not throw an error if a recipient name is blank", () => {
    let validEmailRecipient: unknown = {
      email: "someEmail",
      name: "    "
    };

    validateEmailRecipient(validEmailRecipient as EmailRecipient);
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

  it("throws an error if the string is not actually a string", () => {
    let fakeStr: any = 3;

    expect(() => {
      validateString(fakeStr)
    }).toThrow(JunoError);
  })

  it("throws an error if the string is blank", () => {
    let str = "      ";

    expect(() => {
      validateString(str)
    }).toThrow(JunoError);
  })
});

describe("Validate user identifier tests", () => {
  it("validates against null input", () => {
    expect(() => validateUserIdentifier(null as any)).toThrow(JunoError);
  });

  it("validates against having both inputs", () => {
    expect(() => validateUserIdentifier({ email: "a", id: 4 } as any)).toThrow(JunoError);
  });

  it("validates against negative id", () => {
    expect(() => validateUserIdentifier({ email: "a", id: -4 } as any)).toThrow(JunoError);
  });

  it("validates against empty email", () => {
    expect(() => validateUserIdentifier({ email: "" } as any)).toThrow(JunoError);
  });

  it("validates against null email", () => {
    expect(() => validateUserIdentifier({ email: null } as any)).toThrow(JunoError);
  });

  it("validates against null id", () => {
    expect(() => validateUserIdentifier({ id: null } as any)).toThrow(JunoError);
  });

  it("validates against valid id", () => {
    expect(() => validateUserIdentifier({ id: 3 } as any)).not.toThrow(JunoError);
  });

  it("validates against valid email", () => {
    expect(() => validateUserIdentifier({ email: "email" })).not.toThrow(JunoError);
    expect(() => validateUserIdentifier({ id: 3 })).not.toThrow(JunoError);
  });
});

describe("Validate project identifier tests", () => {
  it("validates against null input", () => {
    expect(() => validateProjectIdentifier(null as any)).toThrow(JunoError);
  });

  it("validates against having both inputs", () => {
    expect(() => validateProjectIdentifier({ name: "a", id: 4 } as any)).toThrow(JunoError);
  });

  it("validates against negative id", () => {
    expect(() => validateProjectIdentifier({ name: "a", id: -4 } as any)).toThrow(JunoError);
  });

  it("validates against empty name", () => {
    expect(() => validateProjectIdentifier({ name: "" } as any)).toThrow(JunoError);
  });

  it("validates against null name", () => {
    expect(() => validateProjectIdentifier({ name: null } as any)).toThrow(JunoError);
  });

  it("validates against null id", () => {
    expect(() => validateProjectIdentifier({ id: null } as any)).toThrow(JunoError);
  });

  it("validates against valid id", () => {
    expect(() => validateProjectIdentifier({ id: 3 } as any)).not.toThrow(JunoError);
  });

  it("validates against valid name", () => {
    expect(() => validateProjectIdentifier({ name: "name" })).not.toThrow(JunoError);
    expect(() => validateProjectIdentifier({ id: 3 })).not.toThrow(JunoError);
  });
});


