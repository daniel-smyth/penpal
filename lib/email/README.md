## Email

This folder houses all the code related to the email functionality for the project.

### Directories

- services: This folder contains the logic for sending emails, using the Nodemailer library.

### Examples of usage

Using the email service.

```typescript
// somefile.ts
export { EmailService } from '@lib/email';
```

Sending an email.

```typescript
// somefile.ts
import { EmailService } from '@lib/email';

const emailService = new EmailService();

const to = 'recipient@example.com';
const from = 'sender@example.com';
const subject = 'Example Email';
const html = '<p>This is an example email.</p>';

emailService.sendEmail({ to, from, subject, html });
```
