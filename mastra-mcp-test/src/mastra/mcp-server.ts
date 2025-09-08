#!/usr/bin/env node
import { MCPServer } from "@mastra/mcp";
import { weatherTool } from './tools/weather-tool';
import http from "http";

const server = new MCPServer({
  name: "my-mcp-server",
  version: "1.0.0",
  tools: { weatherTool },
});

http.createServer((req, res) => {
  server.startSSE({
    url: new URL('http://localhost:8080'),
    ssePath: "/sse",
    messagePath: "/message",
    req,
    res
  });
}).listen(8080);
