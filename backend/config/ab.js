import axios from 'axios';

const options = {
  method: 'POST',
  url: 'https://api.getimg.ai/v1/flux-schnell/text-to-image',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'Bearer 4apBmP5A5asa1BqLopli7LnuVNwePc0Wnvh5f6Y6PLuexUvq68dwVM7daC3uQEZ2hUAp6OWC5xtAvfRjOqsBVO2630KDvc6X'
  }
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));