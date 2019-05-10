/**
 * @author {[Monty Khanna]}
 */
import path from 'path';
import i18n from 'i18n';

// Locale Settings
i18n.configure({
  locales: ['en', 'es', 'hi'],
  defaultLocale: 'en',
  directory: path.resolve(__dirname, '..', 'locales'),
  autoReload: true,
  objectNotation: true,
});

module.exports = i18n;
