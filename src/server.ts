import app from './app';
import config from './app/config';
import { Server } from 'http';
// const mongoose = require('mongoose');
import mongoose from 'mongoose';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error : any) {
    console.log(error);
    throw new Error(error)
  }
}
main();
process.on('unhandledRejection', () => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});