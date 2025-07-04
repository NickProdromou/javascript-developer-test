const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  const fetchPromises = urls.map(async (url) => {
    try {
      const response = await httpGet(url);
      const responseBody = JSON.parse(response.body);

      if (response.status === 200) {
        return { 'Arnie Quote': responseBody.message };
      } else {
        return { 'FAILURE': responseBody.message };
      }
    } catch (error) {
      return { 'FAILURE': error.message };
    }
  });

  const results = await Promise.all(fetchPromises);
  return results;
};

module.exports = {
  getArnieQuotes,
};
