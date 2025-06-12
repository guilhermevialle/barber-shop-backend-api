import { wait } from "@/utils/wait";
import {
  IMailService,
  MailPayload,
} from "../interfaces/services/mail-service.interface";

export class MailService implements IMailService {
  async send(payload: MailPayload): Promise<void> {
    wait(1_750);

    console.log(`
      from: no-reply@example.com
      to: ${payload.to}
      subject: ${payload.subject}
      html: ${payload.html}
      `);
  }
}
