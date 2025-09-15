import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import fetch from 'node-fetch';

const dummySearchResults = {
    results: [
        {id: 1, title: 'Example Domain', snippet: 'This domain is for use in illustrative examples in documents.', url: 'https://www.example.com'},
    ]
};

export const searchTool = createTool({
    id: 'search',
    description: 'Search for information on the web.',
    inputSchema: z.object({
        query: z.string().describe('The search query.'),
    }),
    outputSchema: z.object({
        content: z.array(z.object({
            type: z.string(),
            text: z.string(),
        })),
    }),
    execute: async ({ context }) => {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(dummySearchResults),
                }
            ]
        };
    },
});

export const fetchTool = createTool({
    id: 'fetch',
    description: 'Fetch the content of a URL.',
    inputSchema: z.object({
        url: z.string().describe('The URL to fetch.'),
    }),
    outputSchema: z.object({
        content: z.array(z.object({
            type: z.string(),
            text: z.string(),
        })),
    }),
    execute: async ({ context }) => {
        const response = await fetch(context.url);
        return {
            content: [
                {
                    type: 'text',
                    text: await response.text(),
                }
            ]
        };
    },
});
