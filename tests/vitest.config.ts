import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // poolOptions: {
    //   threads: {
    //     singleThread: true,
    //     maxThreads: 1,
    //   },
    //   vmThreads: {
    //     maxThreads: 1,
    //     singleThread: true,
    //   },
    //   forks: {
    //     maxForks: 1,
    //     singleFork: true,
    //   },
    //   vmForks: {
    //     maxForks: 1,
    //     singleFork: true,
    //   },
      
    // },
    chaiConfig: {
      truncateThreshold: 0,
    },
    
    fileParallelism: false,
    environment: "happy-dom",
    maxConcurrency: 1,
    // typecheck: {
    // 	enabled: true,
    // },
    cache: false,
    includeTaskLocation: true,
    reporters: ["basic"],
    testTimeout: 0,
    disableConsoleIntercept: true,
    setupFiles: ['dotenv/config'],
  },
  clearScreen: false,
});
