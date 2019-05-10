/**
 * @author {[Monty Khanna]}
 */
const API_BASE_PATH = '/v1';

const APP_HEAD_META = {
  titleTemplate: 'Hapi JS',
  meta: [
    { name: 'description', content: 'Hapi JS 17.x.x' },
    { charset: 'utf-8' },
  ],
};

const constants = {
  DEFAULT_OFFSET: 25,
  ERROR_MESSAGE: 'There was an error. Please Try Again.',
  /**
     * TODO need to replace this google API key with client's
     */
  GOOGLE_API_KEY: '',
};

module.exports = {
  API_BASE_PATH, APP_HEAD_META, constants,
};
