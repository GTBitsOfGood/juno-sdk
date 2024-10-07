"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAPI = void 0;
const api_1 = require("../internal/api");
class EmailAPI {
    constructor(baseURL, auth) {
        this.internalApi = new api_1.EmailApi(baseURL);
        this.auth = auth;
    }
    async sendEmail(options) {
        const { recipients, cc, bcc, sender, contents } = options;
        if (!recipients || !sender || !contents) {
            throw new Error('Parameter recipients or sender or content cannot be null');
        }
        if (recipients.length === 0 || contents.length === 0) {
            throw new Error('Parameter recipients or content cannot be an empty array');
        }
        recipients.forEach((recipient) => validateEmailRecipient(recipient));
        contents.forEach((content) => validateEmailContent(content));
        validateEmailSender(sender);
        try {
            const sendEmailModel = new api_1.SendEmailModel();
            sendEmailModel.recipients = recipients;
            sendEmailModel.sender = sender;
            sendEmailModel.content = contents;
            sendEmailModel.cc = cc;
            sendEmailModel.bcc = bcc;
            const result = await this.internalApi.emailControllerSendEmail(sendEmailModel, {
                headers: {
                    Authorization: `Bearer ${this.auth.junoApiKey}`,
                },
            });
            return result.body;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async registerSenderAddress(options) {
        let { email, name, replyTo } = options;
        if (!email || email.trim().length === 0) {
            throw new Error('Email cannot be null or empty string');
        }
        try {
            const registerEmailModel = new api_1.RegisterEmailModel();
            registerEmailModel.email = email;
            registerEmailModel.name = name;
            registerEmailModel.replyTo = replyTo;
            const result = await this.internalApi.emailControllerRegisterSenderAddress(registerEmailModel, {
                headers: {
                    Authorization: `Bearer ${this.auth.junoApiKey}`,
                },
            });
            return result.body;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async registerDomain(options) {
        const { domain, subdomain } = options;
        if (!domain || domain.trim().length === 0) {
            throw new Error('Domain cannot be null or empty string');
        }
        try {
            const registerDomainModel = new api_1.RegisterDomainModel();
            registerDomainModel.domain = domain;
            registerDomainModel.subdomain = subdomain;
            const result = await this.internalApi.emailControllerRegisterEmailDomain(registerDomainModel, {
                headers: {
                    Authorization: `Bearer ${this.auth.junoApiKey}`,
                },
            });
            return result.body;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async verifyDomain(options) {
        const { domain } = options;
        if (!domain || domain.trim().length === 0) {
            throw new Error('Domain cannot be null or empty string');
        }
        try {
            const verifyDomainModel = new api_1.VerifyDomainModel();
            verifyDomainModel.domain = domain;
            const result = await this.internalApi.emailControllerVerifySenderDomain(verifyDomainModel, {
                headers: {
                    Authorization: `Bearer ${this.auth.junoApiKey}`,
                },
            });
            return result.body;
        }
        catch (e) {
            throw new Error(e);
        }
    }
}
exports.EmailAPI = EmailAPI;
const validateEmailRecipient = (recipient) => {
    if (!recipient) {
        throw new Error('Recipient cannot be null');
    }
    if (!recipient.email || recipient.email.trim().length === 0) {
        throw new Error('Recipient email cannot be null or empty string');
    }
    if (!recipient.name && recipient.name.trim().length === 0) {
        throw new Error('Recipient name cannot be empty string');
    }
};
const validateEmailSender = (sender) => {
    if (!sender) {
        throw new Error('Sender cannot be null');
    }
    if (!sender.email || sender.email.trim().length === 0) {
        throw new Error('Sender email cannot be null or empty string');
    }
    if (!sender.name && sender.name.trim().length === 0) {
        throw new Error('Sender name cannot be empty string');
    }
};
const validateEmailContent = (content) => {
    if (!content) {
        throw new Error('Content cannot be null');
    }
    if (!content.type || content.type.trim().length === 0) {
        throw new Error('Content type cannot be null or empty string');
    }
    if (!content.value || content.value.trim().length === 0) {
        throw new Error('Content value cannot be null or empty string');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2VtYWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlDQVl5QjtBQUd6QixNQUFhLFFBQVE7SUFHbkIsWUFBWSxPQUFnQixFQUFFLElBQWM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGNBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQU1mO1FBQ0MsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDMUQsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN2QyxNQUFNLElBQUksS0FBSyxDQUNiLDBEQUEwRCxDQUMzRCxDQUFDO1NBQ0g7UUFDRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3BELE1BQU0sSUFBSSxLQUFLLENBQ2IsMERBQTBELENBQzNELENBQUM7U0FDSDtRQUNELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDckUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM3RCxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1QixJQUFJO1lBQ0YsTUFBTSxjQUFjLEdBQUcsSUFBSSxvQkFBYyxFQUFFLENBQUM7WUFDNUMsY0FBYyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDdkMsY0FB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