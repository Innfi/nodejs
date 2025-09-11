import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import fetch from 'node-fetch';
import { search } from 'duckduckgo-search';

export const searchTool = createTool({
    id: 'search',
    description: 'Search for information on the web.',
    inputSchema: z.object({
        query: z.string().describe('The search query.'),
    }),
    outputSchema: z.object({
        results: z.array(z.object({
            title: z.string(),
            snippet: z.string(),
            url: z.string(),
        })),
    }),
    execute: async ({ context }) => {
        const searchResults = await search(context.query);
        return {
            results: searchResults.results.map((r) => ({
                title: r.title,
                snippet: r.snippet,
                url: r.url,
            })),
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
        content: z.string(),
    }),
    execute: async ({ context }) => {
        const response = await fetch(context.url);
        const content = await response.text();
        return { content };
    },
});
