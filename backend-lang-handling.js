app.use((req, _res, next) => {
  const match = req.url.match(/^\/api\/([a-z]{2})(\/.*)/);
  match && (req.lang = match[1]) && (req.url = '/api' + match[2]);
  req.lang = req.lang || 'en';
  next();
});
