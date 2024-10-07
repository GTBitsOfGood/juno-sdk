import { RegisterEmailModel, SendEmailModel, RegisterDomainModel, VerifyDomainModel, EmailApi, } from '../internal/api';
export class EmailAPI {
    internalApi;
    auth;
    constructor(baseURL, auth) {
        this.internalApi = new EmailApi(baseURL);
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
            const sendEmailModel = new SendEmailModel();
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
            const registerEmailModel = new RegisterEmailModel();
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
            const registerDomainModel = new RegisterDomainModel();
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
            const verifyDomainModel = new VerifyDomainModel();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2VtYWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxrQkFBa0IsRUFDbEIsY0FBYyxFQU1kLG1CQUFtQixFQUNuQixpQkFBaUIsRUFDakIsUUFBUSxHQUVULE1BQU0saUJBQWlCLENBQUM7QUFHekIsTUFBTSxPQUFPLFFBQVE7SUFDWCxXQUFXLENBQVc7SUFDdEIsSUFBSSxDQUFXO0lBQ3ZCLFlBQVksT0FBZ0IsRUFBRSxJQUFjO1FBQzFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUNELEtBQUssQ0FBQyxTQUFTLENBQUMsT0FNZjtRQUNDLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQzFELElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FDYiwwREFBMEQsQ0FDM0QsQ0FBQztTQUNIO1FBQ0QsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNwRCxNQUFNLElBQUksS0FBSyxDQUNiLDBEQUEwRCxDQUMzRCxDQUFDO1NBQ0g7UUFDRCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDN0QsbUJBQW1CLENBQUMs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