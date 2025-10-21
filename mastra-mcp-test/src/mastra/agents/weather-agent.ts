import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { weatherTool } from '../tools/weather-tool';
import { searchTool, fetchTool } from '../tools/search-fetch-tool';
import { TokenLimiter } from '@mastra/memory/processors';

const workingMemoryTemplate = `## weather summary by date, location as key`;

export const weatherAgent = new Agent({
  name: 'Weather Agent',
  instructions: `
      You are a helpful weather assistant that provides accurate weather information and can help planning activities based on the weather.
      You can also search the web for information and fetch the content of URLs.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn't in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative
      - If the user asks for activities and provides the weather forecast, suggest activities based on the weather forecast.
      - If the user asks for activities, respond in the format they request.

      Use the weatherTool to fetch current weather data.
      Use the searchTool to search the web.
      Use the fetchTool to fetch the content of a URL.
`,
  model: openai('gpt-4o-mini'),
  tools: { weatherTool, searchTool, fetchTool },
  memory: new Memory({
    processors: [
      new TokenLimiter(127000), // how does token count affect memory performance?
    ],
    options: {
      threads: {
        generateTitle: true
      },
      workingMemory: {
        enabled: true,
        // TemplateWorkingMemory?
        scope: 'resource', // 'thread' | 'resource'
        template: workingMemoryTemplate,
      },
      lastMessages: 20,
      semanticRecall: {
        topK: 5,
        messageRange: 50,
        scope: 'resource',
      },
    },
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // TODO: test vectordb
    }),
  }),
});
