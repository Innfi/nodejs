import { query } from 'dns-query';

const queryMxRecord = async (domain: string, endpoints?: string[]) => {
  const { answers, rcode } = await query(
    { question: { type: 'MX', name: domain } },
    { endpoints: endpoints ?? ['8.8.8.8'] }
  );
};


