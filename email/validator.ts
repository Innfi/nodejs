import { query } from 'dns-query';
import smtp from 'smtp-protocol';

type MXQueryResponseCode = 'NOERROR' | 'NXDOMAIN';

const queryMxRecord = async (domain: string, endpoints?: string[]): Promise<MXQueryResponseCode> => {
  const { answers, rcode } = await query(
    { question: { type: 'MX', name: domain } },
    { endpoints: endpoints ?? ['8.8.8.8'] }
  );

  return rcode as MXQueryResponseCode;
};

// const verifyLocalname = async (email: string): Promise<void> => {
//   const [localname, domain] = email.split('@');
// 
//   const client = smtp.connect(25, domain);
// };

const validateEmail = async (email: string): Promise<void> => {
  console.log(`email: ${email}`);

  const mxRecordResponse = await queryMxRecord(email.split('@')[1]);
  if (mxRecordResponse !== 'NOERROR') {
    console.log(`${email}] invalid domain`);
    return;
  }

  // await verifyLocalname(email);
};

(async () => {
  await validateEmail('thisis@notexist');
})()
