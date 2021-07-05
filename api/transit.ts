import { VercelRequest, VercelResponse } from '@vercel/node';

interface handler{
  (request: VercelRequest, response: VercelResponse) : void
}

const allowCors = (fn:handler) => async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  // res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handle = (request: VercelRequest, response: VercelResponse) => {
  const { url } = request.query;
  console.log(url,request.body)
  response.status(200).end('cors')
};


export default allowCors(handle)