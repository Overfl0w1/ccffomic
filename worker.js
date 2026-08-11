const ALLOWED_ORIGINS = [
  'https://overfl0w1.github.io'
];

function cors(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Expose-Headers': 'content-type,content-length,cache-control',
    'Vary': 'Origin'
  };
}

export default {
  async fetch(request) {
    const origin = request.headers.get('Origin') || '';
    const requestUrl = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors(origin) });
    }

    if (requestUrl.pathname !== '/proxy') {
      return new Response('Manyue proxy is running', { status: 200 });
    }

    if (!ALLOWED_ORIGINS.includes(origin)) {
      return new Response('Origin not allowed', { status: 403, headers: cors(origin) });
    }

    const targetRaw = requestUrl.searchParams.get('url');
    if (!targetRaw) return new Response('Missing url', { status: 400, headers: cors(origin) });

    let target;
    try { target = new URL(targetRaw); }
    catch { return new Response('Bad url', { status: 400, headers: cors(origin) }); }

    if (target.protocol !== 'https:') {
      return new Response('HTTPS only', { status: 400, headers: cors(origin) });
    }

    // MangaDex API, covers, and dynamically assigned MangaDex@Home image nodes.
    // Restrict requests to GET/HEAD and strip client cookies/auth.
    const upstreamHeaders = new Headers();
    upstreamHeaders.set('User-Agent', 'Manyue-PWA/1.0');
    upstreamHeaders.set('Accept', request.headers.get('Accept') || '*/*');
    upstreamHeaders.set('Referer', 'https://mangadex.org/');
    upstreamHeaders.set('Origin', 'https://mangadex.org');

    let upstream;
    try {
      upstream = await fetch(target.toString(), {
        method: request.method === 'HEAD' ? 'HEAD' : 'GET',
        headers: upstreamHeaders,
        redirect: 'follow'
      });
    } catch (e) {
      return new Response('Upstream fetch failed', { status: 502, headers: cors(origin) });
    }

    const headers = new Headers(upstream.headers);
    for (const [k,v] of Object.entries(cors(origin))) headers.set(k,v);
    headers.delete('content-security-policy');
    headers.delete('content-security-policy-report-only');
    headers.delete('x-frame-options');
    headers.set('Cache-Control', target.hostname === 'api.mangadex.org'
      ? 'public, max-age=30'
      : 'public, max-age=86400');

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers
    });
  }
};