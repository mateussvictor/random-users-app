export default function getFormatedDate(date, language = 'en-IE') {
  const options = { dateStyle: 'short' };

  return new Intl.DateTimeFormat(language, options).format(new Date(date));
}
