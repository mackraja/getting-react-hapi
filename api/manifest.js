/**
 * @author {[Monty Khanna]}
 */
import Inert from 'inert';
import Vision from 'vision';
import HapiSwagger from 'hapi-swagger';
import HapiRouter from 'hapi-router';
import HapiAuthorization from 'hapi-authorization';
import Good from 'good';
import * as Path from 'path';
import { jwtAuth, hapiAuthCookie } from './helpers'; // eslint-disable-line

import * as rootPackage from '../package.json';

const corsHeaders = {
  origin: ["*"],
  headers: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers","Access-Control-Request-Method", "Accept", "Content-Type", "If-None-Match", "Access-Control-Request-Headers","Connection, Host, Origin, X-Requested-With, Content-Type", "Authorization", "RefreshToken"],
  credentials: true
};

const hapiSwaggerOptions = {
  pathPrefixSize: 1,
  grouping: 'tags',
  sortTags: 'name',
  expanded: 'none',
  info: {
    title: `${rootPackage.name} Documentation`,
    version: rootPackage.version,
    contact: {
      name: 'Monty Khanna',
      email: 'montykhanna007@hotmail.com',
    },
  },
  schemes: (process.env.NODE_ENV || 'development') !== 'development' ? ['https'] : ['http'],
};

const goodOptions = {
  ops: {
    interval: 1000,
  },
  reporters: {
    myConsoleReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ log: '*', error: '*', response: '*' }],
    }, {
      module: 'good-console',
    }, 'stdout'],
    // myFileReporter: [{
    //     module: 'good-squeeze',
    //     name: 'Squeeze',
    //     args: [{ ops: '*' }]
    // }, {
    //     module: 'good-squeeze',
    //     name: 'SafeJson'
    // }, {
    //     module: 'good-file',
    //     args: ['./test/fixtures/awesome_log']
    // }],
    // myHTTPReporter: [{
    //     module: 'good-squeeze',
    //     name: 'Squeeze',
    //     args: [{ error: '*' }]
    // }, {
    //     module: 'good-http',
    //     args: ['http://prod.logs:3000', {
    //         wreck: {
    //             headers: { 'x-api-key': 12345 }
    //         }
    //     }]
    // }]
  },
};

const connections = {
  host: process.env.HOST,
  port: process.env.PORT,
  routes: {
    cors: corsHeaders,
    files: {
      relativeTo: Path.join(__dirname, './', 'public'),
    },
  },
};

const registrations = [
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: hapiSwaggerOptions,
  },
  {
    plugin: jwtAuth, // jwtAuth, hapiAuthCookie
  },
  {
    plugin: HapiRouter,
    options: {
      cwd: __dirname,
      routes: 'controllers/**/*Controller.js',
    },
  },
  {
    plugin: Good,
    options: goodOptions,
  },
  {
    plugin: HapiAuthorization,
    options: {
      roles: false, // default roles: "SUPER_ADMIN", "ADMIN", "USER", "GUEST"
    },
  },
];

module.exports = { connections, registrations };
