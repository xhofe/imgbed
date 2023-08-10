/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// We support the GET, POST, HEAD, and OPTIONS methods from any origin,
// and allow any header on requests. These headers must be present
// on all responses to all CORS preflight requests. In practice, this means
// all responses to OPTIONS requests.
const allowUrls = ['https://img.nn.ci', 'http://localhost:5173']

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
}

async function handleRequest(request) {
  const origin = request.headers.get('origin')
  const url = new URL(request.url)
  if (!allowUrls.includes(origin)) {
    const resp = new Response(
      JSON.stringify({
        code: 401,
        message: `${origin} not allowed`,
      }),
      {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      },
    )
    resp.headers.set('Access-Control-Allow-Origin', origin)
    return resp
  }

  let apiUrl = request.url.substr(8)
  apiUrl = decodeURIComponent(apiUrl.substr(apiUrl.indexOf('/') + 1))
  if (!apiUrl) {
    const resp = new Response(
      JSON.stringify({
        code: 400,
        message: `usage: ${url.origin}/API-URL`,
      }),
      {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      },
    )
    resp.headers.set('Access-Control-Allow-Origin', origin)
    return resp
  }
  if (apiUrl.indexOf('://') == -1) {
    apiUrl = 'http://' + apiUrl
  }
  // Rewrite request to point to API url. This also makes the request mutable
  // so we can add the correct Origin header to make the API server think
  // that this request isn't cross-site.
  request = new Request(apiUrl, request)
  request.headers.set('Origin', new URL(apiUrl).origin)
  request.headers.set('Referer', new URL(apiUrl).origin)
  let response = await fetch(request)

  // Recreate the response so we can modify the headers
  response = new Response(response.body, response)

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', origin)

  // Append to/Add Vary header so browser will cache response correctly
  response.headers.append('Vary', 'Origin')

  return response
}

function handleOptions(request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  let headers = request.headers
  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    let respHeaders = {
      ...corsHeaders,
      // Allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Version
      'Access-Control-Allow-Headers': request.headers.get(
        'Access-Control-Request-Headers',
      ),
    }

    return new Response(null, {
      headers: respHeaders,
    })
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: 'GET, HEAD, POST, OPTIONS',
      },
    })
  }
}

addEventListener('fetch', (event) => {
  const request = event.request
  // const url = new URL(request.url)
  if (request.method === 'OPTIONS') {
    // Handle CORS preflight requests
    event.respondWith(handleOptions(request))
  } else if (
    request.method === 'GET' ||
    request.method === 'HEAD' ||
    request.method === 'POST'
  ) {
    // Handle requests to the API server
    event.respondWith(handleRequest(request))
  } else {
    event.respondWith(
      new Response(null, {
        status: 405,
        statusText: 'Method Not Allowed',
      }),
    )
  }
})
