#!/usr/bin/env node
import { MCPServer } from "@mastra/mcp";
import { weatherTool } from '../tools/weather-tool';
import { fetchTool, searchTool } from "../tools/search-fetch-tool";

export const server = new MCPServer({
  name: "my-mcp-server",
  version: "1.0.0",
  tools: { weatherTool, searchTool, fetchTool },
});
