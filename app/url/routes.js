const router = require('express').Router();
const url = require('./url');


router.get('/:hash', async (req, res, next) => {

  const source = await url.getUrl(req.params.hash);
  
  if(!source){
    const err = new Error("The url that you entered doesn't exist");
    err.status = 404;
    next(err);
  } 

  // Behave based on the requested format using the 'Accept' header.
  // If header is not provided or is */* redirect instead.
  const accepts = req.get('Accept');

  switch (accepts) {
    case 'text/plain':
      res.end(source.url);
      break;
    case 'application/json':
      res.json(source);
      break;
    default:
      res.redirect(source.url);
      break;
  }
});


router.post('/', async (req, res, next) => {

  if(!req.body.url){
    const err = new Error("There is no url parameter in your request.");
    err.status = 400;
    next(err);
  }

  try {
    let shortUrl = await url.shorten(req.body.url, url.generateHash());
    res.json(shortUrl);
  } catch (e) {
    const err = new Error("Check your POST request, an error was found.");
    err.status = 400;
    next(err);
  }
});


router.delete('/:hash/remove/:removeToken', async (req, res, next) => {
  // TODO: Remove shortened URL if the remove token and the hash match
  
  const status = await url.deleteUrl(req.params.removeToken, req.params.hash);

  if(!status){
    const err = new Error("There is no url that can be removed with that hash or token.");
    err.status = 400;
    next(err);
  }else{
    res.json(status);
  }

  
  
});

module.exports = router;
