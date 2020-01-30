import { createClient } from 'contentful';

const spaceKey = process.env.REACT_APP_RESORT_ROOMS_SPACE;
const apiKey = process.env.REACT_APP_RESORT_ROOMS_KEY;

export default createClient({
  space: spaceKey,
  accessToken: apiKey,
});
