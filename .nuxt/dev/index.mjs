import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, createError, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, getQuery as getQuery$1, getRequestWebStream, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, getRouterParam, readBody, getResponseStatusText } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs';
import { escapeHtml } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/@vue+shared@3.5.41/node_modules/@vue/shared/dist/shared.cjs.js';
import viteNodeEntry_mjs from 'file:///C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/@nuxt+vite-builder@4.5.2_a78d93f6e321012e10ef8b8aa10fe93d/node_modules/@nuxt/vite-builder/dist/vite-node-entry.mjs';
import { viteNodeFetch } from 'file:///C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/@nuxt+vite-builder@4.5.2_a78d93f6e321012e10ef8b8aa10fe93d/node_modules/@nuxt/vite-builder/dist/vite-node.mjs';
import { marked } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/marked@15.0.12/node_modules/marked/lib/marked.esm.js';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, encodePath, joinRelativeURL } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/unhead@3.4.0_esbuild@0.28.2_bf318ae7baec3f1765d0f3d755d23cdc/node_modules/unhead/dist/server.mjs';
import { isVNode, isRef, toValue } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/vue@3.5.41_typescript@5.9.3/node_modules/vue/index.mjs';
import { DeprecationsPlugin } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/unhead@3.4.0_esbuild@0.28.2_bf318ae7baec3f1765d0f3d755d23cdc/node_modules/unhead/dist/legacy.mjs';
import { PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/unhead@3.4.0_esbuild@0.28.2_bf318ae7baec3f1765d0f3d755d23cdc/node_modules/unhead/dist/plugins.mjs';
import { klona } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs';
import destr, { destr as destr$1 } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs';
import { snakeCase } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import { defineDiagnostics, createConsoleReporter } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/nostics@1.2.0/node_modules/nostics/dist/index.mjs';
import { ansiFormatter } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/nostics@1.2.0/node_modules/nostics/dist/formatters/ansi.mjs';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/vue-bundle-renderer@2.3.2/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { renderToString } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/vue@3.5.41_typescript@5.9.3/node_modules/vue/server-renderer/index.mjs';
import { stringify, uneval } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/devalue@5.9.1/node_modules/devalue/index.js';
import { createHooks } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/node-mock-http@1.0.5/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/unstorage@1.17.5_@vercel+fu_742d2ceac3d9df5f58c0a62b3d81f1ee/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/unstorage@1.17.5_@vercel+fu_742d2ceac3d9df5f58c0a62b3d81f1ee/node_modules/unstorage/drivers/fs.mjs';
import { digest, hash as hash$1 } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/ohash@2.0.12/node_modules/ohash/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/consola@3.4.2/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/youch-core@0.3.3/node_modules/youch-core/build/index.js';
import { Youch } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/youch@4.1.1/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/source-map@0.7.6/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getContext } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/unctx@3.0.1_magic-string@1._ae9ffac5fa0b95754641a40da4fbef0b/node_modules/unctx/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/errx@0.1.2/node_modules/errx/dist/index.mjs';
import _wH6JrtIxmaSoA8lCPWFnE9z4lQeXW6H5z3l5aymEQw from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/@nuxt+vite-builder@4.5.2_a78d93f6e321012e10ef8b8aa10fe93d/node_modules/@nuxt/vite-builder/dist/fix-stacktrace.mjs';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import { walkResolver } from 'file://C:/Users/coren/Projects/RPGMultitool/node_modules/.pnpm/unhead@3.4.0_esbuild@0.28.2_bf318ae7baec3f1765d0f3d755d23cdc/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"C:/Users/coren/Projects/RPGMultitool/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/coren/Projects/RPGMultitool","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/coren/Projects/RPGMultitool/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/coren/Projects/RPGMultitool/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/coren/Projects/RPGMultitool/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"C:/Users/coren/Projects/RPGMultitool/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {}
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function isPathInScope(pathname, base) {
  let canonical;
  try {
    const pre = pathname.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    canonical = new URL(pre, "http://_").pathname;
  } catch {
    return false;
  }
  return !base || canonical === base || canonical.startsWith(base + "/");
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

//#region src/runtime/utils/error.ts
/**
* Nitro internal functions extracted from https://github.com/nitrojs/nitro/blob/v2/src/runtime/internal/utils.ts
*/
function isJsonRequest(event) {
	if (hasReqHeader(event, "accept", "text/html")) return false;
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return !!(value && typeof value === "string" && value.toLowerCase().includes(includes));
}

//#region src/runtime/utils/dev.ts
const iframeStorageBridge = (nonce) => `
(function () {
  const NONCE = ${JSON.stringify(nonce)};
  const memoryStore = Object.create(null);

  const post = (type, payload) => {
    window.parent.postMessage({ type, nonce: NONCE, ...payload }, '*');
  };

  const isValid = (data) => data && data.nonce === NONCE;

  const mockStorage = {
    getItem(key) {
      return Object.hasOwn(memoryStore, key)
        ? memoryStore[key]
        : null;
    },
    setItem(key, value) {
      const v = String(value);
      memoryStore[key] = v;
      post('storage-set', { key, value: v });
    },
    removeItem(key) {
      delete memoryStore[key];
      post('storage-remove', { key });
    },
    clear() {
      for (const key of Object.keys(memoryStore))
        delete memoryStore[key];
      post('storage-clear', {});
    },
    key(index) {
      const keys = Object.keys(memoryStore);
      return keys[index] ?? null;
    },
    get length() {
      return Object.keys(memoryStore).length;
    }
  };

  const defineLocalStorage = () => {
    try {
      Object.defineProperty(window, 'localStorage', {
        value: mockStorage,
        writable: false,
        configurable: true
      });
    } catch {
      window.localStorage = mockStorage;
    }
  };

  defineLocalStorage();

  window.addEventListener('message', (event) => {
    const data = event.data;
    if (!isValid(data) || data.type !== 'storage-sync-data') return;

    const incoming = data.data || {};
    for (const key of Object.keys(incoming))
      memoryStore[key] = incoming[key];

    if (typeof window.initTheme === 'function')
      window.initTheme();
    window.dispatchEvent(new Event('storage-ready'));
  });

  // Clipboard API is unavailable in data: URL iframe, so we use postMessage
  document.addEventListener('DOMContentLoaded', function() {
    window.copyErrorMessage = function(button) {
      post('clipboard-copy', { text: button.dataset.errorText });
      button.classList.add('copied');
      setTimeout(function() { button.classList.remove('copied'); }, 2000);
    };
  });

  post('storage-sync-request', {});
})();
`;
const parentStorageBridge = (nonce) => `
(function () {
  const host = document.querySelector('nuxt-error-overlay');
  if (!host) return;

  const NONCE = ${JSON.stringify(nonce)};
  const isValid = (data) => data && data.nonce === NONCE;

  // Handle clipboard copy from iframe
  window.addEventListener('message', function(e) {
    if (isValid(e.data) && e.data.type === 'clipboard-copy') {
      navigator.clipboard.writeText(e.data.text).catch(function() {});
    }
  });

  const collectLocalStorage = () => {
    const all = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k != null) all[k] = localStorage.getItem(k);
    }
    return all;
  };

  const attachWhenReady = () => {
    const root = host.shadowRoot;
    if (!root)
      return false;
    const iframe = root.getElementById('frame');
    if (!iframe || !iframe.contentWindow)
      return false;

    const handlers = {
      'storage-set': (d) => localStorage.setItem(d.key, d.value),
      'storage-remove': (d) => localStorage.removeItem(d.key),
      'storage-clear': () => localStorage.clear(),
      'storage-sync-request': () => {
        iframe.contentWindow.postMessage({
          type: 'storage-sync-data',
          data: collectLocalStorage(),
          nonce: NONCE
        }, '*');
      }
    };

    window.addEventListener('message', (event) => {
      const data = event.data;
      if (!isValid(data)) return;
      const fn = handlers[data.type];
      if (fn) fn(data);
    });

    return true;
  };

  if (attachWhenReady())
    return;

  const obs = new MutationObserver(() => {
    if (attachWhenReady())
      obs.disconnect();
  });

  obs.observe(host, { childList: true, subtree: true });
})();
`;
const errorCSS = `
:host {
  --preview-width: 240px;
  --preview-height: 180px;
  --base-width: 1200px;
  --base-height: 900px;
  --z-base: 999999998;
  --error-pip-left: auto;
  --error-pip-top: auto;
  --error-pip-right: 5px;
  --error-pip-bottom: 5px;
  --error-pip-origin: bottom right;
  --app-preview-left: auto;
  --app-preview-top: auto;
  --app-preview-right: 5px;
  --app-preview-bottom: 5px;
  all: initial;
  display: contents;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
#frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  z-index: var(--z-base);
}
#frame[inert] {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: var(--error-pip-right);
  bottom: var(--error-pip-bottom);
  width: var(--base-width);
  height: var(--base-height);
  transform: scale(calc(240 / 1200));
  transform-origin: var(--error-pip-origin);
  overflow: hidden;
  border-radius: calc(1200 * 8px / 240);
}
#preview {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: var(--app-preview-right);
  bottom: var(--app-preview-bottom);
  width: var(--preview-width);
  height: var(--preview-height);
  overflow: hidden;
  border-radius: 6px;
  pointer-events: none;
  z-index: var(--z-base);
  background: white;
  display: none;
}
#preview iframe {
  transform-origin: var(--error-pip-origin);
}
#frame:not([inert]) + #preview {
  display: block;
}
#toggle {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: calc(var(--app-preview-right) - 3px);
  bottom: calc(var(--app-preview-bottom) - 3px);
  width: var(--preview-width);
  height: var(--preview-height);
  background: none;
  border: 3px solid #00DC82;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s, box-shadow 0.2s;
  z-index: calc(var(--z-base) + 1);
  display: flex;
  align-items: center;
  justify-content: center;
}
#toggle:hover,
#toggle:focus {
  opacity: 1;
  box-shadow: 0 0 20px rgba(0, 220, 130, 0.6);
}
#toggle:focus-visible {
  outline: 3px solid #00DC82;
  outline-offset: 0;
  box-shadow: 0 0 24px rgba(0, 220, 130, 0.8);
}
#frame[inert] ~ #toggle {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: calc(var(--error-pip-right) - 3px);
  bottom: calc(var(--error-pip-bottom) - 3px);
  cursor: grab;
}
:host(.dragging) #frame[inert] ~ #toggle {
  cursor: grabbing;
}
#frame:not([inert]) ~ #toggle,
#frame:not([inert]) + #preview {
  cursor: grab;
}
:host(.dragging-preview) #frame:not([inert]) ~ #toggle,
:host(.dragging-preview) #frame:not([inert]) + #preview {
  cursor: grabbing;
}

#pip-close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 16px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
}
#pip-close:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}

#pip-restore {
  position: fixed;
  right: 16px;
  bottom: 16px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 2px solid #00DC82;
  background: #111;
  color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  z-index: calc(var(--z-base) + 2);
  cursor: grab;
}
#pip-restore:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}
:host(.dragging-restore) #pip-restore {
  cursor: grabbing;
}

#frame[hidden],
#toggle[hidden],
#preview[hidden],
#pip-restore[hidden],
#pip-close[hidden] {
  display: none !important;
}

@media (prefers-reduced-motion: reduce) {
  #toggle {
    transition: none;
  }
}
`;
function webComponentScript(base64HTML, startMinimized) {
	return `
(function () {
  try {
    // =========================
    // Host + Shadow
    // =========================
    const host = document.querySelector('nuxt-error-overlay');
    if (!host)
      return;
    const shadow = host.attachShadow({ mode: 'open' });

    // =========================
    // DOM helpers
    // =========================
    const el = (tag) => document.createElement(tag);
    const on = (node, type, fn, opts) => node.addEventListener(type, fn, opts);
    const hide = (node, v) => node.toggleAttribute('hidden', !!v);
    const setVar = (name, value) => host.style.setProperty(name, value);
    const unsetVar = (name) => host.style.removeProperty(name);

    // =========================
    // Create DOM
    // =========================
    const style = el('style');
    style.textContent = ${JSON.stringify(errorCSS)};

    const iframe = el('iframe');
    iframe.id = 'frame';
    iframe.src = 'data:text/html;base64,${base64HTML}';
    iframe.title = 'Detailed error stack trace';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-top-navigation-by-user-activation');

    const preview = el('div');
    preview.id = 'preview';

    const toggle = el('div');
    toggle.id = 'toggle';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.innerHTML = '<span class="sr-only">Toggle detailed error view</span>';

    const liveRegion = el('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';

    const pipCloseButton = el('button');
    pipCloseButton.id = 'pip-close';
    pipCloseButton.setAttribute('type', 'button');
    pipCloseButton.setAttribute('aria-label', 'Hide error preview overlay');
    pipCloseButton.innerHTML = '&times;';
    pipCloseButton.hidden = true;
    toggle.appendChild(pipCloseButton);

    const pipRestoreButton = el('button');
    pipRestoreButton.id = 'pip-restore';
    pipRestoreButton.setAttribute('type', 'button');
    pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
    pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
    pipRestoreButton.hidden = true;

    // Order matters: #frame + #preview adjacency
    shadow.appendChild(style);
    shadow.appendChild(liveRegion);
    shadow.appendChild(iframe);
    shadow.appendChild(preview);
    shadow.appendChild(toggle);
    shadow.appendChild(pipRestoreButton);

    // =========================
    // Constants / keys
    // =========================
    const POS_KEYS = {
      position: 'nuxt-error-overlay:position',
      hiddenPretty: 'nuxt-error-overlay:error-pip:hidden',
      hiddenPreview: 'nuxt-error-overlay:app-preview:hidden'
    };

    const CSS_VARS = {
      pip: {
        left: '--error-pip-left',
        top: '--error-pip-top',
        right: '--error-pip-right',
        bottom: '--error-pip-bottom'
      },
      preview: {
        left: '--app-preview-left',
        top: '--app-preview-top',
        right: '--app-preview-right',
        bottom: '--app-preview-bottom'
      }
    };

    const MIN_GAP = 5;
    const DRAG_THRESHOLD = 2;

    // =========================
    // Local storage safe access + state
    // =========================
    let storageReady = true;
    let isPrettyHidden = false;
    let isPreviewHidden = false;

    const safeGet = (k) => {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    };

    const safeSet = (k, v) => {
      if (!storageReady) 
        return;
      try {
        localStorage.setItem(k, v);
      } catch {}
    };

    // =========================
    // Sizing helpers
    // =========================
    const vvSize = () => {
      const v = window.visualViewport;
      return v ? { w: v.width, h: v.height } : { w: window.innerWidth, h: window.innerHeight };
    };

    const previewSize = () => {
      const styles = getComputedStyle(host);
      const w = parseFloat(styles.getPropertyValue('--preview-width')) || 240;
      const h = parseFloat(styles.getPropertyValue('--preview-height')) || 180;
      return { w, h };
    };

    const sizeForTarget = (target) => {
      if (!target)
        return previewSize();
      const rect = target.getBoundingClientRect();
      if (rect.width && rect.height)
        return { w: rect.width, h: rect.height };
      return previewSize();
    };

    // =========================
    // Dock model + offset/alignment calculations
    // =========================
    const dock = { edge: null, offset: null, align: null, gap: null };

    const maxOffsetFor = (edge, size) => {
      const vv = vvSize();
      if (edge === 'left' || edge === 'right')
        return Math.max(MIN_GAP, vv.h - size.h - MIN_GAP);
      return Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
    };

    const clampOffset = (edge, value, size) => {
      const max = maxOffsetFor(edge, size);
      return Math.min(Math.max(value, MIN_GAP), max);
    };

    const updateDockAlignment = (size) => {
      if (!dock.edge || dock.offset == null)
        return;
      const max = maxOffsetFor(dock.edge, size);
      if (dock.offset <= max / 2) {
        dock.align = 'start';
        dock.gap = dock.offset;
      } else {
        dock.align = 'end';
        dock.gap = Math.max(0, max - dock.offset);
      }
    };

    const appliedOffsetFor = (size) => {
      if (!dock.edge || dock.offset == null)
        return null;
      const max = maxOffsetFor(dock.edge, size);

      if (dock.align === 'end' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, max - dock.gap, size);
      }
      if (dock.align === 'start' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, dock.gap, size);
      }
      return clampOffset(dock.edge, dock.offset, size);
    };

    const nearestEdgeAt = (x, y) => {
      const { w, h } = vvSize();
      const d = { left: x, right: w - x, top: y, bottom: h - y };
      return Object.keys(d).reduce((a, b) => (d[a] < d[b] ? a : b));
    };

    const cornerDefaultDock = () => {
      const vv = vvSize();
      const size = previewSize();
      const offset = Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
      return { edge: 'bottom', offset };
    };

    const currentTransformOrigin = () => {
      if (!dock.edge) return null;
      if (dock.edge === 'left' || dock.edge === 'top')
        return 'top left';
      if (dock.edge === 'right')
        return 'top right';
      return 'bottom left';
    };

    // =========================
    // Persist / load dock
    // =========================
    const loadDock = () => {
      const raw = safeGet(POS_KEYS.position);
      if (!raw)
        return;
      try {
        const parsed = JSON.parse(raw);
        const { edge, offset, align, gap } = parsed || {};
        if (!['left', 'right', 'top', 'bottom'].includes(edge))
          return;
        if (typeof offset !== 'number')
          return;

        dock.edge = edge;
        dock.offset = clampOffset(edge, offset, previewSize());
        dock.align = align === 'start' || align === 'end' ? align : null;
        dock.gap = typeof gap === 'number' ? gap : null;

        if (!dock.align || dock.gap == null)
          updateDockAlignment(previewSize());
      } catch {}
    };

    const persistDock = () => {
      if (!dock.edge || dock.offset == null)
        return; 
      safeSet(POS_KEYS.position, JSON.stringify({
        edge: dock.edge,
        offset: dock.offset,
        align: dock.align,
        gap: dock.gap
      }));
    };

    // =========================
    // Apply dock
    // =========================
    const dockToVars = (vars) => ({
      set: (side, v) => host.style.setProperty(vars[side], v),
      clear: (side) => host.style.removeProperty(vars[side])
    });

    const dockToEl = (node) => ({
      set: (side, v) => { node.style[side] = v; },
      clear: (side) => { node.style[side] = ''; }
    });

    const applyDock = (target, size, opts) => {
      if (!dock.edge || dock.offset == null) {
        target.clear('left');
        target.clear('top');
        target.clear('right');
        target.clear('bottom');
        return;
      }

      target.set('left', 'auto');
      target.set('top', 'auto');
      target.set('right', 'auto');
      target.set('bottom', 'auto');

      const applied = appliedOffsetFor(size);

      if (dock.edge === 'left') {
        target.set('left', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'right') {
        target.set('right', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'top') {
        target.set('top', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      } else {
        target.set('bottom', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      }

      if (!opts || opts.persist !== false)
        persistDock();
    };

    const applyDockAll = (opts) => {
      applyDock(dockToVars(CSS_VARS.pip), previewSize(), opts);
      applyDock(dockToVars(CSS_VARS.preview), previewSize(), opts);
      applyDock(dockToEl(pipRestoreButton), sizeForTarget(pipRestoreButton), opts);
    };

    const repaintToDock = () => {
      if (!dock.edge || dock.offset == null)
        return;
      const origin = currentTransformOrigin();
      if (origin)
        setVar('--error-pip-origin', origin);
      else 
        unsetVar('--error-pip-origin');
      applyDockAll({ persist: false });
    };

    // =========================
    // Hidden state + UI
    // =========================
    const loadHidden = () => {
      const rawPretty = safeGet(POS_KEYS.hiddenPretty);
      if (rawPretty != null)
        isPrettyHidden = rawPretty === '1' || rawPretty === 'true';
      const rawPreview = safeGet(POS_KEYS.hiddenPreview);
      if (rawPreview != null)
        isPreviewHidden = rawPreview === '1' || rawPreview === 'true';
    };

    const setPrettyHidden = (v) => {
      isPrettyHidden = !!v;
      safeSet(POS_KEYS.hiddenPretty, isPrettyHidden ? '1' : '0');
      updateUI();
    };

    const setPreviewHidden = (v) => {
      isPreviewHidden = !!v;
      safeSet(POS_KEYS.hiddenPreview, isPreviewHidden ? '1' : '0');
      updateUI();
    };

    const isMinimized = () => iframe.hasAttribute('inert');

    const setMinimized = (v) => {
      if (v) {
        iframe.setAttribute('inert', '');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        iframe.removeAttribute('inert');
        toggle.setAttribute('aria-expanded', 'true');
      }
    };

    const setRestoreLabel = (kind) => {
      if (kind === 'pretty') {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
      } else {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error page</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error page');
      }
    };

    const updateUI = () => {
      const minimized = isMinimized();
      const showPiP = minimized && !isPrettyHidden;
      const showPreview = !minimized && !isPreviewHidden;
      const pipHiddenByUser = minimized && isPrettyHidden;
      const previewHiddenByUser = !minimized && isPreviewHidden;
      const showToggle = minimized ? showPiP : showPreview;
      const showRestore = pipHiddenByUser || previewHiddenByUser;

      hide(iframe, pipHiddenByUser);
      hide(preview, !showPreview);
      hide(toggle, !showToggle);
      hide(pipCloseButton, !showToggle);
      hide(pipRestoreButton, !showRestore);

      pipCloseButton.setAttribute('aria-label', minimized ? 'Hide error overlay' : 'Hide error page preview');

      if (pipHiddenByUser)
        setRestoreLabel('pretty');
      else if (previewHiddenByUser)
        setRestoreLabel('preview');

      host.classList.toggle('pip-hidden', isPrettyHidden);
      host.classList.toggle('preview-hidden', isPreviewHidden);
    };

    // =========================
    // Preview snapshot
    // =========================
    const updatePreview = () => {
      try {
        let previewIframe = preview.querySelector('iframe');
        if (!previewIframe) {
          previewIframe = el('iframe');
          previewIframe.style.cssText = 'width: 1200px; height: 900px; transform: scale(0.2); transform-origin: top left; border: none;';
          previewIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
          preview.appendChild(previewIframe);
        }

        const doctype = document.doctype ? '<!DOCTYPE ' + document.doctype.name + '>' : '';
        const cleanedHTML = document.documentElement.outerHTML
          .replace(/<nuxt-error-overlay[^>]*>.*?<\\/nuxt-error-overlay>/gs, '')
          .replace(/<script[^>]*>.*?<\\/script>/gs, '');

        const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(doctype + cleanedHTML);
        iframeDoc.close();
      } catch (err) {
        console.error('Failed to update preview:', err);
      }
    };

    // =========================
    // View toggling
    // =========================
    const toggleView = () => {
      if (isMinimized()) {
        updatePreview();
        setMinimized(false);
        liveRegion.textContent = 'Showing detailed error view';
        setTimeout(() => { 
          try { 
            iframe.contentWindow.focus();
          } catch {}
        }, 100);
      } else {
        setMinimized(true);
        liveRegion.textContent = 'Showing error page';
        repaintToDock();
        void iframe.offsetWidth;
      }
      updateUI();
    };

    // =========================
    // Dragging (unified, rAF throttled)
    // =========================
    let drag = null;
    let rafId = null;
    let suppressToggleClick = false;
    let suppressRestoreClick = false;

    const beginDrag = (e) => {
      if (drag) 
        return;

      if (!dock.edge || dock.offset == null) {
        const def = cornerDefaultDock();
        dock.edge = def.edge;
        dock.offset = def.offset;
        updateDockAlignment(previewSize());
      }

      const isRestoreTarget = e.currentTarget === pipRestoreButton;

      drag = {
        kind: isRestoreTarget ? 'restore' : (isMinimized() ? 'pip' : 'preview'),
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        moved: false,
        target: e.currentTarget
      };

      drag.target.setPointerCapture(e.pointerId);

      if (drag.kind === 'restore')
        host.classList.add('dragging-restore');
      else 
        host.classList.add(drag.kind === 'pip' ? 'dragging' : 'dragging-preview');

      e.preventDefault();
    };

    const moveDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      
      const dx = drag.lastX - drag.startX;
      const dy = drag.lastY - drag.startY;

      if (!drag.moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
        drag.moved = true;
      }

      if (!drag.moved)
        return;
      if (rafId)
        return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const edge = nearestEdgeAt(drag.lastX, drag.lastY);
        const size = sizeForTarget(drag.target);

        let offset;
        if (edge === 'left' || edge === 'right') {
          const top = drag.lastY - (size.h / 2);
          offset = clampOffset(edge, Math.round(top), size);
        } else {
          const left = drag.lastX - (size.w / 2);
          offset = clampOffset(edge, Math.round(left), size);
        }

        dock.edge = edge;
        dock.offset = offset;
        updateDockAlignment(size);

        const origin = currentTransformOrigin();
        setVar('--error-pip-origin', origin || 'bottom right');

        applyDockAll({ persist: false });
      });
    };

    const endDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      const endedKind = drag.kind;
      drag.target.releasePointerCapture(e.pointerId);

      if (endedKind === 'restore')
        host.classList.remove('dragging-restore');
      else 
        host.classList.remove(endedKind === 'pip' ? 'dragging' : 'dragging-preview');

      const didMove = drag.moved;
      drag = null;

      if (didMove) {
        persistDock();
        if (endedKind === 'restore')
          suppressRestoreClick = true;
        else 
          suppressToggleClick = true;
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const bindDragTarget = (node) => {
      on(node, 'pointerdown', beginDrag);
      on(node, 'pointermove', moveDrag);
      on(node, 'pointerup', endDrag);
      on(node, 'pointercancel', endDrag);
    };

    bindDragTarget(toggle);
    bindDragTarget(pipRestoreButton);

    // =========================
    // Events (toggle / close / restore)
    // =========================
    on(toggle, 'click', (e) => {
      if (suppressToggleClick) {
        e.preventDefault();
        suppressToggleClick = false;
        return;
      }
      toggleView();
    });

    on(toggle, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleView();
      }
    });

    on(pipCloseButton, 'click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized())
        setPrettyHidden(true);
      else
        setPreviewHidden(true);
    });

    on(pipCloseButton, 'pointerdown', (e) => {
      e.stopPropagation();
    });

    on(pipRestoreButton, 'click', (e) => {
      if (suppressRestoreClick) {
        e.preventDefault();
        suppressRestoreClick = false;
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized()) 
        setPrettyHidden(false);
      else 
        setPreviewHidden(false);
    });

    // =========================
    // Lifecycle: load / sync / repaint
    // =========================
    const loadState = () => {
      loadDock();
      loadHidden();

      if (isPrettyHidden && !isMinimized())
        setMinimized(true);

      updateUI();
      repaintToDock();
    };

    loadState();

    on(window, 'storage-ready', () => {
      storageReady = true;
      loadState();
    });

    const onViewportChange = () => repaintToDock();

    on(window, 'resize', onViewportChange);

    if (window.visualViewport) {
      on(window.visualViewport, 'resize', onViewportChange);
      on(window.visualViewport, 'scroll', onViewportChange);
    }

    // initial preview
    setTimeout(updatePreview, 100);

    // initial minimized option
    if (${startMinimized}) {
      setMinimized(true);
      repaintToDock();
      void iframe.offsetWidth;
      updateUI();
    }
  } catch (err) {
    console.error('Failed to initialize Nuxt error overlay:', err);
  }
})();
`;
}
function generateErrorOverlayHTML(html, options) {
	const nonce = Array.from(crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
	const errorPage = html.replace("<head>", `<head><script>${iframeStorageBridge(nonce)}<\/script>`);
	const base64HTML = Buffer.from(errorPage, "utf8").toString("base64");
	return `
    <script>${parentStorageBridge(nonce)}<\/script>
    <nuxt-error-overlay></nuxt-error-overlay>
    <script>${webComponentScript(base64HTML, options?.startMinimized ?? false)}<\/script>
  `;
}

//#region src/runtime/handlers/error.ts
var error_default = async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) return;
	const defaultRes = await defaultHandler(error, event, { json: true });
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) defaultRes.body.stack = defaultRes.body.stack.join("\n");
	const errorObject = defaultRes.body;
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	const reqHeaders = getRequestHeaders(event);
	const res = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"] ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) return;
	if (!res) {
		const { template } = await Promise.resolve().then(function () { return error500; });
		errorObject.description = errorObject.message;
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	if (typeof html === "string") {
		const prettyResponse = await defaultHandler(error, event, { json: false });
		if (typeof prettyResponse.body === "string") return send(event, html.replace("</body>", `${generateErrorOverlayHTML(prettyResponse.body, { startMinimized: 300 <= status && status < 500 })}</body>`));
	}
	return send(event, html);
};

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json ?? !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [error_default, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

//#region src/runtime/diagnostics.ts
const ansi = (open, close) => (s) => `\x1B[${open}m${s}\x1B[${close}m`;
const colors = {
	red: ansi(31, 39),
	yellow: ansi(33, 39),
	cyan: ansi(36, 39),
	gray: ansi(90, 39),
	bold: ansi(1, 22),
	dim: ansi(2, 22)
};
/**
* E8xxx
* Nitro server runtime (SSR rendering / dev server) diagnostics.
*/
const docsBase = (code) => `https://nuxt.com/docs/4.x/errors/${code.replace("NUXT_", "").toLowerCase()}`;
const serverDiagnostics = /* #__PURE__ */ defineDiagnostics({
	docsBase,
	reporters: [/* @__PURE__ */ createConsoleReporter({ formatter: ansiFormatter(colors) } )],
	codes: {
		NUXT_E8001: {
			why: (p) => `\`render:html\` mutated \`body\`/\`bodyAppend\` while streaming (\`${p.path}\`). These fields are silently dropped because the body is about to stream.`,
			fix: "Use the `render:html:close` hook instead.",
			docs: false
		},
		NUXT_E8002: {
			why: (p) => `SSR streaming committed the response before render completed (\`${p.path}\`). The following mutations did not reach the client and were dropped:\n  - ${p.mutations}`,
			fix: (p) => `Move the mutation into a plugin (which runs before the shell is flushed), or opt this route out of streaming with \`routeRules: { '${p.path}': { streaming: false } }\` or the \`render:route\` hook.`,
			docs: false
		},
		NUXT_E8003: {
			why: (p) => `Failed to stringify dev server logs.${p.error ? ` Received \`${p.error}\`.` : ""}`,
			fix: "You can define your own reducer/reviver for rich types following the instructions in `https://nuxt.com/docs/4.x/api/composables/use-nuxt-app#payload`.",
			docs: false
		},
		NUXT_E8004: {
			why: "The server bundle is not available.",
			fix: "Ensure the Nuxt build completed successfully and the server entry was emitted by your builder.",
			docs: false
		},
		NUXT_E8005: {
			why: "Island props cannot contain a `template` key, which the Vue runtime compiler would compile and execute.",
			fix: "Rename the prop (e.g. `templateName`), or disable `vue.runtimeCompiler` if you do not need runtime template compilation.",
			docs: false
		}
	}
});

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[],"style":[],"script":[],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appSpaLoaderTag = "div";

const appSpaLoaderAttrs = {"id":"__nuxt-loader"};

const appId = "nuxt-app";

const rootDir = "C:/Users/coren/Projects/RPGMultitool";

//#region src/runtime/plugins/dev-server-logs.ts
const devReducers = {
	VNode: (data) => isVNode(data) ? {
		type: data.type,
		props: data.props
	} : void 0,
	URL: (data) => data instanceof URL ? data.toString() : void 0,
	Symbol: (data) => typeof data === "symbol" ? data.description ?? "" : void 0
};
const asyncContext = getContext("nuxt-dev", {
	asyncContext: true,
	AsyncLocalStorage
});
var dev_server_logs_default = (nitroApp) => {
	const handler = nitroApp.h3App.handler;
	nitroApp.h3App.handler = (event) => {
		return asyncContext.callAsync({
			logs: [],
			event
		}, () => handler(event));
	};
	onConsoleLog((_log) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) return;
		const rawStack = captureRawStackTrace();
		if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) return;
		const trace = [];
		let filename = "";
		for (const entry of parseRawStackTrace(rawStack)) {
			if (entry.source === globalThis._importMeta_.url) continue;
			if (EXCLUDE_TRACE_RE.test(entry.source)) continue;
			filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
			trace.push({
				...entry,
				source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
			});
		}
		const log = {
			..._log,
			filename,
			stack: trace
		};
		ctx.logs.push(log);
	});
	nitroApp.hooks.hook("afterResponse", () => {
		const ctx = asyncContext.tryUse();
		if (!ctx) return;
		return nitroApp.hooks.callHook("dev:ssr-logs", {
			logs: ctx.logs,
			path: ctx.event.path
		});
	});
	nitroApp.hooks.hook("render:html", (htmlContext) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) return;
		try {
			const reducers = Object.assign(Object.create(null), devReducers, ctx.event.context["~payloadReducers"]);
			htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
		} catch (e) {
			serverDiagnostics.NUXT_E8003({
				error: e instanceof Error ? e.toString() : void 0,
				cause: e
			});
		}
	});
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
	consola$1.addReporter({ log(logObj) {
		callback(logObj);
	} });
	consola$1.wrapConsole();
}

const plugins = [
  dev_server_logs_default,
_wH6JrtIxmaSoA8lCPWFnE9z4lQeXW6H5z3l5aymEQw
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _haCELA = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

//#region ../nuxt/src/app/island-hash.ts
/**
* Strip Vue scoped-style attributes (`data-v-*`) from island props before hashing
* or rendering. Scoped-id markers leak in from parent components and are not part
* of the logical island input.
*
* Used before island props are serialized and sent to the island handler.
*
* @internal
*/
function filterIslandProps(props) {
	if (!props) return {};
	const out = {};
	for (const key in props) if (!key.startsWith("data-v-")) out[key] = props[key];
	return out;
}
/**
* Compute the `hashId` segment embedded in an island URL (`/__nuxt_island/<Name>_<hashId>.json`).
*
* The hash binds the response to the requested `(name, props, context, source)` tuple, so the
* server can reject requests whose URL hash does not match the supplied query/body. Use this
* from island clients if you need to ensure a hash stays in step with Nuxt's implementation.
*
* `props` may be passed either as the raw props object or as the JSON string that will be sent
* over the wire; the two produce the same hash when the round-trip is identity.
*
* @since 4.5.0
*/
function getIslandHash(input) {
	const props = typeof input.props === "string" ? parseSerializedProps(input.props) : input.props ?? {};
	return hash$1([
		input.name,
		props,
		input.context ?? {},
		input.source
	]).replace(/[-_]/g, "");
}
function parseSerializedProps(serializedProps) {
	try {
		return JSON.parse(serializedProps);
	} catch {
		return serializedProps;
	}
}

//#region src/runtime/utils/island-props.ts
/** @internal */
const MAX_ISLAND_BODY_BYTES = 65536;
/**
* Whether the bracket nesting of a JSON-ish string exceeds `maxDepth`, in a single linear
* pass. Brackets inside string values are ignored.
*
* @internal
*/
function exceedsMaxDepth(raw, maxDepth = 64) {
	let depth = 0;
	let inString = false;
	let escaped = false;
	for (let i = 0; i < raw.length; i++) {
		const ch = raw[i];
		if (inString) {
			if (escaped) escaped = false;
			else if (ch === "\\") escaped = true;
			else if (ch === "\"") inString = false;
			continue;
		}
		if (ch === "\"") inString = true;
		else if (ch === "{" || ch === "[") {
			if (++depth > maxDepth) return true;
		} else if (ch === "}" || ch === "]") {
			if (depth > 0) depth--;
		}
	}
	return false;
}
/** @internal */
function exceedsMaxBytes(raw, maxBytes = MAX_ISLAND_BODY_BYTES) {
	return Buffer.byteLength(raw, "utf8") > maxBytes;
}

const NUXT_RUNTIME_PAYLOAD_EXTRACTION = false;
const NUXT_SSR_STREAMING = false;

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

const VueResolver = /* @__PURE__ */ Object.assign(
  (_, value) => isRef(value) ? toValue(value) : value,
  // identity for plain non-reactive values, so the SSR default init entry
  // keeps its precomputed fast path (see unhead/server createHead)
  { _static: true }
);

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const legacyPlugins = [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin];

const unheadOptions = {
  disableDefaults: true,
  plugins: legacyPlugins,
};

function encodeEventPath(path) {
	const queryIndex = path.indexOf("?");
	if (queryIndex === -1) return encodePath(path);
	return encodePath(path.slice(0, queryIndex)) + path.slice(queryIndex);
}
function createSSRContext(event) {
	const url = encodeEventPath(event.path);
	const ssrContext = {
		url,
		event,
		runtimeConfig: useRuntimeConfig(event),
		noSSR: event.context.nuxt?.noSSR || (false),
		head: createHead(unheadOptions),
		error: false,
		nuxt: void 0,
		payload: {},
		["~payloadReducers"]: Object.create(null),
		modules: /* @__PURE__ */ new Set()
	};
	return ssrContext;
}
function setSSRError(ssrContext, error) {
	ssrContext.error = true;
	ssrContext.payload = { error };
	ssrContext.url = error.url;
}

function buildAssetsDir() {
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

//#region src/runtime/utils/renderer/cache.ts
function lazyCachedFunction(fn) {
	let res = null;
	return () => {
		if (res === null) res = fn().catch((err) => {
			res = null;
			throw err;
		});
		return res;
	};
}

//#region src/runtime/utils/renderer/build-files.ts
globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => Promise.resolve().then(function () { return entry; }).then((r) => r.default || r);
const getClientManifest = () => Promise.resolve().then(function () { return manifest$1; }).then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSSRRenderer = lazyCachedFunction(async () => {
	const createSSRApp = await getServerEntry();
	if (!createSSRApp) throw serverDiagnostics.NUXT_E8004();
	const precomputed = void 0 ;
	const renderer = createRenderer(createSSRApp, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: renderToString$1,
		buildAssetsURL
	});
	async function renderToString$1(input, context) {
		const html = await renderToString(input, context);
		if (process.env.NUXT_VITE_NODE_OPTIONS) renderer.rendererContext.updateManifest(await getClientManifest());
		return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
	}
	return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
	const precomputed = void 0 ;
	const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
		{
			const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
			const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
			return APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG + (r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "");
		}
	});
	const renderer = createRenderer(() => () => {}, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: () => spaTemplate,
		buildAssetsURL
	});
	const result = await renderer.renderToString({});
	const renderToString = (ssrContext) => {
		const config = useRuntimeConfig(ssrContext.event);
		ssrContext.modules ||= /* @__PURE__ */ new Set();
		ssrContext.payload.serverRendered = false;
		ssrContext.config = {
			public: config.public,
			app: config.app
		};
		return Promise.resolve(result);
	};
	return {
		rendererContext: renderer.rendererContext,
		renderToString
	};
});
function getRenderer(ssrContext) {
	return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

//#region src/runtime/utils/renderer/inline-styles.ts
async function renderInlineStyles(usedModules) {
	const styleMap = await getSSRStyles();
	const inlinedStyles = /* @__PURE__ */ new Set();
	const promises = [];
	for (const mod of usedModules) if (mod in styleMap && styleMap[mod]) promises.push(styleMap[mod]());
	for (const styles of await Promise.all(promises)) for (const style of styles) inlinedStyles.add(style);
	return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

//#region src/runtime/utils/renderer/islands.ts
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
/**
* remove the root node from the html body
*/
function getServerComponentHTML(body) {
	return body.match(ROOT_NODE_REGEX)?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) return;
	const response = {};
	for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) response[name] = {
		...slot,
		fallback: ssrContext.teleports?.[`island-fallback=${name}`]
	};
	return response;
}
function getClientIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) return;
	const response = {};
	for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
		let html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
		if (!html && ssrContext.teleports) for (const [key, value] of Object.entries(ssrContext.teleports)) {
			const [, , componentUid] = key.match(SSR_CLIENT_TELEPORT_MARKER) ?? [];
			if (componentUid === clientUid) {
				html = value.replaceAll("<!--teleport start anchor-->", "");
				break;
			}
		}
		response[clientUid] = {
			...component,
			html,
			slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
		};
	}
	return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
	const entries = Object.entries(teleports);
	const slots = {};
	for (const [key, value] of entries) {
		const match = key.match(SSR_CLIENT_SLOT_MARKER);
		if (match) {
			const [, id, slot] = match;
			if (!slot || clientUid !== id) continue;
			slots[slot] = value;
		}
	}
	return slots;
}
const ISLAND_TELEPORT_ANCHOR_RE = / data-island-uid="([^"]*)" data-island-(component|slot)="([^"]*)"[^>]*>/g;
function replaceIslandTeleports(ssrContext, html) {
	const { teleports, islandContext } = ssrContext;
	if (islandContext || !teleports) return html;
	const contentsByAnchor = /* @__PURE__ */ new Map();
	const uids = /* @__PURE__ */ new Set();
	for (const key in teleports) {
		const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
		if (matchClientComp) {
			const [, uid, clientId] = matchClientComp;
			if (!uid || !clientId) continue;
			contentsByAnchor.set(`${uid};component;${clientId}`, teleports[key]);
			uids.add(uid);
			continue;
		}
		const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
		if (matchSlot) {
			const [, uid, slot] = matchSlot;
			if (!uid || !slot) continue;
			contentsByAnchor.set(`${uid};slot;${slot}`, teleports[key]);
			uids.add(uid);
		}
	}
	if (!contentsByAnchor.size) return html;
	const stitch = (html) => {
		const anchorRE = new RegExp(ISLAND_TELEPORT_ANCHOR_RE);
		let out = "";
		let cursor = 0;
		let m;
		while (contentsByAnchor.size && (m = anchorRE.exec(html))) {
			if (!uids.has(m[1])) continue;
			const anchor = `${m[1]};${m[2]};${m[3]}`;
			const content = contentsByAnchor.get(anchor);
			if (content === void 0) continue;
			contentsByAnchor.delete(anchor);
			const end = m.index + m[0].length;
			out += html.slice(cursor, end) + stitch(content);
			cursor = end;
		}
		return cursor ? out + html.slice(cursor) : html;
	};
	return stitch(html);
}

//#region src/runtime/handlers/island.ts
const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const handler$1 = defineEventHandler(async (event) => {
	setResponseHeaders(event, {
		"content-type": "application/json;charset=utf-8",
		"x-powered-by": "Nuxt"
	});
	return toResponse(event, await renderIsland(event));
});
function toResponse(event, result) {
	return "raw" in result ? returnIslandResponse(event, result.raw) : result;
}
async function renderIsland(event) {
	const nitroApp = useNitroApp();
	const islandContext = await getIslandContext(event);
	const ssrContext = {
		...createSSRContext(event),
		islandContext,
		noSSR: false,
		url: islandContext.url
	};
	const renderer = await getSSRRenderer();
	const renderResult = await (renderer.renderToString(ssrContext)).catch(async (err) => {
		if (ssrContext["~renderResponse"] && err?.message === "skipping render") return {};
		await ssrContext.nuxt?.hooks.callHook("app:error", err);
		throw err;
	});
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult
	});
	if (ssrContext["~renderResponse"]) {
		const response = ssrContext["~renderResponse"];
		if (response.statusCode && response.statusCode >= 400) throw createError({
			statusCode: response.statusCode,
			statusMessage: response.statusMessage
		});
		return { raw: response };
	}
	if (ssrContext.payload?.error) throw ssrContext.payload.error;
	const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
	if (inlinedStyles.length) ssrContext.head.push({ style: inlinedStyles });
	{
		const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
		const link = [];
		for (const resource of Object.values(styles)) {
			if ("inline" in getQuery(resource.file)) continue;
			if (resource.file.includes("scoped") && !resource.file.includes("pages/")) link.push({
				rel: "stylesheet",
				href: renderer.rendererContext.buildAssetsURL(resource.file),
				crossorigin: ""
			});
		}
		if (link.length) ssrContext.head.push({ link });
	}
	const islandHead = {};
	for (const entry of ssrContext.head.entries.values()) for (const [key, value] of Object.entries(walkResolver(entry.input, VueResolver))) {
		const currentValue = islandHead[key];
		if (Array.isArray(currentValue)) currentValue.push(...value);
		else islandHead[key] = value;
	}
	const islandResponse = {
		id: islandContext.id,
		head: islandHead,
		html: getServerComponentHTML(renderResult.html),
		components: getClientIslandResponse(ssrContext),
		slots: getSlotIslandResponse(ssrContext)
	};
	await nitroApp.hooks.callHook("render:island", islandResponse, {
		event,
		islandContext
	});
	return islandResponse;
}
function returnIslandResponse(event, response) {
	for (const header in response.headers || {}) setResponseHeader(event, header, response.headers[header]);
	if (response.statusCode) setResponseStatus(event, response.statusCode, response.statusMessage);
	return response.body;
}
const ISLAND_PATH_PREFIX = "/__nuxt_island/";
const VALID_COMPONENT_NAME_RE = /^[a-z][\w.-]*$/i;
async function readGuardedIslandBody(event) {
	if (Number(getRequestHeader(event, "content-length")) > 65536) throw createError({
		statusCode: 413,
		statusMessage: "Island request body too large"
	});
	let received = 0;
	let raw = "";
	let overflowed = false;
	const stream = getRequestWebStream(event);
	if (stream) {
		const decoder = new TextDecoder();
		const reader = stream.getReader();
		try {
			for (;;) {
				const { done, value } = await reader.read();
				if (done) break;
				received += value.byteLength;
				if (received > 65536) {
					overflowed = true;
					continue;
				}
				raw += decoder.decode(value, { stream: true });
			}
		} finally {
			reader.releaseLock();
		}
		raw += decoder.decode();
	}
	if (overflowed) throw createError({
		statusCode: 413,
		statusMessage: "Island request body too large"
	});
	if (!raw) return {};
	if (exceedsMaxDepth(raw)) throw createError({
		statusCode: 400,
		statusMessage: "Island request body too deeply nested"
	});
	return destr$1(raw) || {};
}
async function getIslandContext(event) {
	let url = event.path || "";
	url.replace(/\?.*$/, "");
	if (!url.startsWith(ISLAND_PATH_PREFIX)) throw createError({
		statusCode: 400,
		statusMessage: "Invalid island request path"
	});
	const componentParts = url.substring(15).replace(ISLAND_SUFFIX_RE, "").split("_");
	const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
	const componentName = componentParts.join("_");
	if (!componentName || !VALID_COMPONENT_NAME_RE.test(componentName)) throw createError({
		statusCode: 400,
		statusMessage: "Invalid island component name"
	});
	const rawContext = event.method === "GET" ? getQuery$1(event) : await readGuardedIslandBody(event);
	const serializedProps = typeof rawContext?.props === "string" ? rawContext.props : "{}";
	if (exceedsMaxBytes(serializedProps)) throw createError({
		statusCode: 413,
		statusMessage: "Island request props too large"
	});
	if (exceedsMaxDepth(serializedProps)) throw createError({
		statusCode: 400,
		statusMessage: "Island request props too deeply nested"
	});
	const clientContext = {};
	if (rawContext && typeof rawContext === "object") {
		for (const key in rawContext) if (key !== "props") clientContext[key] = rawContext[key];
	}
	const parsed = destr$1(serializedProps);
	if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) throw createError({
		statusCode: 400,
		statusMessage: "Invalid island request props"
	});
	const parsedProps = filterIslandProps(parsed);
	const expectedHash = getIslandHash({
		name: componentName,
		props: parsedProps,
		context: clientContext
	});
	if (!hashId || hashId !== expectedHash) throw createError({
		statusCode: 400,
		statusMessage: "Invalid island request hash"
	});
	return {
		url: typeof rawContext?.url === "string" ? rawContext.url : "/",
		id: hashId,
		name: componentName,
		props: parsedProps,
		slots: {},
		components: {}
	};
}

const _lazy_cUwuzE = () => Promise.resolve().then(function () { return _collection__get$1; });
const _lazy_sm9ZSD = () => Promise.resolve().then(function () { return health_get$1; });
const _lazy_N1SPcv = () => Promise.resolve().then(function () { return renderer; });

const handlers = [
  { route: '', handler: _haCELA, lazy: false, middleware: true, method: undefined },
  { route: '/api/content/:collection', handler: _lazy_cUwuzE, lazy: true, middleware: false, method: "get" },
  { route: '/api/health', handler: _lazy_sm9ZSD, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_N1SPcv, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: handler$1, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_N1SPcv, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto.webcrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

//#region src/runtime/templates/error-500.ts
const _messages = {
	"appName": "Nuxt",
	"status": 500,
	"statusText": "Internal server error",
	"description": "This page is temporarily unavailable.",
	"refresh": "Refresh this page"
};
const template$1 = (messages) => {
	messages = {
		..._messages,
		...messages
	};
	return "<!DOCTYPE html><html lang=\"en\"><head><title>" + escapeHtml(messages.status) + " - " + escapeHtml(messages.statusText) + " | " + escapeHtml(messages.appName) + "</title><meta charset=\"utf-8\"><meta content=\"width=device-width,initial-scale=1,minimum-scale=1\" name=\"viewport\"><script>!function(){let e=document.createElement(\"link\").relList;if(!(e&&e.supports&&e.supports(\"modulepreload\"))){for(let e of document.querySelectorAll('link[rel=\"modulepreload\"]'))r(e);new MutationObserver(e=>{for(let t of e)if(\"childList\"===t.type)for(let e of t.addedNodes)\"LINK\"===e.tagName&&\"modulepreload\"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;let r=function(e){let r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),r.credentials=\"use-credentials\"===e.crossOrigin?\"include\":\"anonymous\"===e.crossOrigin?\"omit\":\"same-origin\",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{box-sizing:border-box;border-style:solid;border-width:0;border-color:var(--un-default-border-color,#e5e7eb)}:after,:before{--un-content:\"\"}html{-webkit-text-size-adjust:100%;tab-size:4;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 #0000;--un-ring-shadow:0 0 #0000;--un-shadow-inset: ;--un-shadow:0 0 #0000;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:#93c5fd80;--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.grid{display:grid}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2{padding-left:.5rem;padding-right:.5rem}.text-center{text-align:center}.text-\\[80px\\]{font-size:80px}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (width>=640px){.sm\\:text-\\[110px\\]{font-size:110px}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}</style></head><body class=\"antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide\"><div class=\"max-w-520px text-center\"><h1 class=\"font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]\">" + escapeHtml(messages.status) + "</h1><h2 class=\"font-semibold mb-2 sm:text-3xl text-2xl\">" + escapeHtml(messages.statusText) + "</h2><p class=\"mb-4 px-2 text-[#64748B] text-md\">" + escapeHtml(messages.description) + "</p></div></body></html>";
};

const error500 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const entry = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: viteNodeEntry_mjs
}, Symbol.toStringTag, { value: 'Module' }));

const manifest = () => viteNodeFetch.getManifest();

const manifest$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: manifest
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

const contentFiles = { "/src/content/arcs/01-racines-amere.md": { "data": { "title": "Arc I \u2014 Les Racines Am\xE8res", "order": 1, "sessions": "Sessions 1 \xE0 6", "summary": "Une vague de sabotages frappe les celliers de Vallombra : intrigue \xE9conomique, enqu\xEAte et premiers combats posent les bases de la campagne." }, "body": `\r
## Pr\\u00e9misse\r
\r
Depuis un mois, les celliers de Vallombra (le Tinaie) subissent des sabotages : tonneaux perc\\u00e9s, incendies mineurs, cargaisons vol\\u00e9es en chemin vers Gratigna. La Contessa Serafina Dal Moro engage les PJ pour faire cesser ces troubles avant que la r\\u00e9colte de l'ann\\u00e9e ne soit compromise.\r
\r
## Objectifs p\\u00e9dagogiques de l'arc\r
\r
Introduire le hub (Vallombra), les factions (Conseil de Vallombra, Compagnia del Tralcio, Casato Vestraro) et un premier avant-go\\u00fbt du myst\xE8re de l'Ossario (via le Villaggio dei Salici), tout en variant les styles de jeu : enqu\\u00ete, combat, politique.\r
\r
## D\\u00e9roul\\u00e9 sugg\\u00e9r\\u00e9 (6 sessions)\r
\r
### Session 1 \u2014 Foire aux Larmes\r
Introduction, foire de Vallombra, premier sabotage en direct (incendie d'un cellier). Enqu\\u00ete de sc\\u00e8ne de crime, premiers indices (marque \\u00e0 la cire de la Compagnia del Tralcio... ou un pi\\u00e8ge grossier pour incriminer \\u00e0 tort la guilde).\r
\r
### Session 2 \u2014 Les Langues du Guscio\r
Enqu\\u00ete sociale dans le Guscio via Renzo \\"la Taupe\\". Rencontre avec des t\\u00e9moins peu fiables. **Embranchement A** : les PJ soup\\u00e7onnent la Compagnia del Tralcio. **Embranchement B** : ils soup\\u00e7onnent des rivaux locaux ou des bandits ind\\u00e9pendants.\r
\r
### Session 3 \u2014 Escarmouche sur la route de Gratigna\r
Combat : une cargaison de vin est attaqu\\u00e9e en chemin par des *Bandito della Fossa Verde* men\\u00e9s par un *Randagio Veterano*. Capturer un bandit m\\u00e8ne \\u00e0 un indice pointant vers la Miniera Abbandonata (lien avec les Randagi) ou vers un commanditaire en ville.\r
\r
### Session 4 \u2014 Audience \\u00e0 Gratigna\r
Sc\\u00e8ne politique \\u00e0 la cour du Principe Aldo Vestraro : les PJ doivent obtenir son soutien (troupes, fonds, ou simplement sa neutralit\\u00e9). Premi\\u00e8re rencontre avec Ilaria Conti, qui nie toute implication avec un aplomb suspect.\r
\r
### Session 5 \u2014 Le Sang dans les Saules\r
Enqu\\u00ete + horreur l\\u00e9g\\u00e8re : les PJ suivent une piste jusqu'au Villaggio dei Salici, o\\u00f9 des disparitions inqui\\u00e8tent l'Anziano Pietro. D\\u00e9couverte d'empreintes \\u00e0 trois griffes et d'un fragment d'ossement grav\\u00e9 de symboles inconnus (premier lien vers l'Arc II, ind\\u00e9pendant du sabotage).\r
\r
### Session 6 \u2014 Le Proc\\u00e8s du Tralcio\r
Confrontation finale de l'arc : selon les preuves r\\u00e9colt\\u00e9es, les PJ peuvent d\\u00e9masquer Ilaria Conti (proc\\u00e8s public ou n\\u00e9gociation priv\\u00e9e), disculper la guilde et d\\u00e9signer un autre coupable (un rival de Serafina au sein m\\u00eame du Conseil de Vallombra), ou choisir de couvrir l'affaire contre un service futur.\r
\r
## Embranchements et cons\\u00e9quences \\u00e0 long terme\r
\r
- **Ilaria d\\u00e9masqu\\u00e9e publiquement** \\u2192 ennemie jur\\u00e9e en Arc III, la Compagnia del Tralcio se retourne contre Vallombra.\r
- **Affaire \\u00e9touff\\u00e9e / n\\u00e9goci\\u00e9e** \\u2192 Ilaria devient une alli\\u00e9e \\u00e9conomique r\\u00e9ticente en Arc III, mais Serafina se m\\u00e9fie davantage des PJ.\r
- **Piste du Villaggio dei Salici approfondie** \\u2192 d\\u00e9marrage anticip\\u00e9 de l'Arc II, les PJ arrivent \\u00e0 l'Ossario Sepolto avec plus d'indices (avantage narratif et m\\u00e9canique : un indice suppl\\u00e9mentaire offert par Madre Iolanda).\r
` }, "/src/content/arcs/02-os-sous-le-sable.md": { "data": { "title": "Arc II \u2014 Les Os Sous le Sable", "order": 2, "sessions": "Sessions 7 \xE0 13", "summary": "Exploration de la Riarsa et donjon de l'Ossario Sepolto : horreur, \xE9nigmes rituelles et combats progressifs face \xE0 l'Ordine delle Ossa Sopite." }, "body": `\r
## Pr\\u00e9misse\r
\r
Les indices r\\u00e9colt\\u00e9s en Arc I (fragment d'ossement, disparitions, empreintes) m\\u00e8nent les PJ vers la Riarsa, o\\u00f9 l'Ordine delle Ossa Sopite de Fra Cosma pr\xE9pare un rituel de r\\u00e9veil sous les sables.\r
\r
## Objectifs p\\u00e9dagogiques de l'arc\r
\r
Basculer vers l'exploration/donjon et l'horreur dark fantasy, tout en gardant des choix significatifs (approche frontale, infiltration, ou tentative de dialogue).\r
\r
## D\\u00e9roul\\u00e9 sugg\\u00e9r\\u00e9 (7 sessions)\r
\r
### Session 7 \u2014 La Trace dans la Riarsa\r
Voyage et survie dans le d\\u00e9sert (jets de Survie/Constitution, rencontre al\\u00e9atoire avec des *Sciacallo delle Sabbie*). Rencontre avec Madre Iolanda si les PJ l'ont sollicit\\u00e9e : elle r\\u00e9v\\u00e8le son pass\\u00e9 avec Fra Cosma et propose de les accompagner ou de les \\u00e9quiper (rituel de protection contre les mort-vivants).\r
\r
### Session 8 \u2014 Les Cryptes d'Entr\\u00e9e (I)\r
D\\u00e9but du donjon : pi\\u00e8ges m\\u00e9caniques anciens, premiers *Scheletro Mortificato*. \\u00c9nigme d'entr\\u00e9e bas\\u00e9e sur l'ordre des Treize C\\u00f4tes (r\\u00e9f\\u00e9rence au culte officiel des Ossa du Sacro Regno, d\\u00e9tourn\\u00e9e par Cosma).\r
\r
### Session 9 \u2014 Les Cryptes d'Entr\\u00e9e (II)\r
Suite de l'exploration : embranchement architectural. **Voie A** : passage direct mais gard\\u00e9 (combat plus dur). **Voie B** : passage cach\\u00e9 via une \\u00e9nigme (DD \\u00e9lev\\u00e9, r\\u00e9compense : \\u00e9viter une rencontre).\r
\r
### Session 10 \u2014 La Nef S\\u00e9pulcrale\r
Rencontre avec le *Custode d'Ossa* (mini-boss). Une inscription ou un rituel appris de Madre Iolanda permet de le d\\u00e9sactiver sans combat (option non-violente).\r
\r
### Session 11 \u2014 Les Cultistes\r
Rencontre avec des membres vivants de l'Ordine (recrues, pas seulement des morts-vivants) : possibilit\\u00e9 de dialogue, de recrutement d'un informateur interne, ou de combat. R\\u00e9v\\u00e9lation partielle du plan de Fra Cosma.\r
\r
### Session 12 \u2014 Le Seuil du C\\u0153ur S\\u00e9pulcral\r
Derni\\u00e8re salle avant le boss : choix cornu deconstruit ici. **Branche Combat imm\\u00e9diat** : confrontation avec Fra Cosma en fin de session (voir fiche [Fra Cosma](/ennemis/fra-cosma)) \\u2014 combat difficile, victoire possible mais co\\u00fbteuse. **Branche Retrait strat\\u00e9gique** : les PJ se replient pour pr\\u00e9parer une offensive plus large en Arc III (alliances politiques et militaires).\r
\r
### Session 13 \u2014 Cons\\u00e9quences\r
Retour \\u00e0 Vallombra (ou fuite dans la Riarsa). Selon l'issue de la session 12 : Fra Cosma vaincu/captur\\u00e9 t\\u00f4t (l'Arc III se concentre alors sur la reconstruction et les rivalit\\u00e9s politiques restantes), ou Fra Cosma toujours actif (l'Arc III inclut une bataille finale majeure).\r
\r
## Embranchements et cons\\u00e9quences \\u00e0 long terme\r
\r
- **Custode d'Ossa d\\u00e9sactiv\\u00e9 pacifiquement** \\u2192 les PJ gagnent une r\\u00e9putation de \\"sages\\" aupr\\u00e8s du Sacro Regno local, utile en Arc III.\r
- **Cultiste recrut\\u00e9 comme informateur** \\u2192 acc\\u00e8s \\u00e0 une entr\\u00e9e secr\\u00e8te lors de l'assaut final de l'Arc III.\r
- **Fra Cosma vaincu en Arc II** \\u2192 l'Arc III se recentre sur la politique et la reconstruction, avec un \\u00e9pilogue plus calme.\r
- **Fra Cosma toujours libre** \\u2192 l'Arc III culmine par un assaut coordonn\\u00e9 sur l'Ossario Sepolto, avec renforts d\\u00e9pendant des alliances nou\\u00e9es (Randagi, Gratigna, Sacro Regno).\r
` }, "/src/content/arcs/03-gouvernement-des-cendres.md": { "data": { "title": "Arc III \u2014 Le Gouvernement des Cendres", "order": 3, "sessions": "Sessions 14 \xE0 20", "summary": "Politique, gestion de quartier et affrontement final : Vallombra doit choisir son destin entre autonomie, alliance et guerre ouverte." }, "body": "\r\n## Pr\\u00e9misse\r\n\r\nVallombra doit se reconstruire (murailles endommag\\u00e9es, celliers en partie d\\u00e9truits, tensions politiques exacerb\\u00e9es) tout en g\\u00e9rant la menace r\\u00e9siduelle ou finale de l'Ordine delle Ossa Sopite. Les choix des Arcs I et II d\\u00e9terminent largement qui sont alli\\u00e9s, qui sont ennemis, et quelle est l'ampleur du danger restant.\r\n\r\n## Objectifs p\\u00e9dagogiques de l'arc\r\n\r\nIntroduire la **gestion de quartier/ville** (ressources, milices, b\\u00e2timents) et conclure l'intrigue politique et militaire, avec plusieurs fins possibles.\r\n\r\n## D\\u00e9roul\\u00e9 sugg\\u00e9r\\u00e9 (7 sessions)\r\n\r\n### Session 14 \u2014 L'\\u00c9tat des Lieux\r\nRetour \\u00e0 Vallombra. Introduction du mini-jeu de gestion : les PJ r\\u00e9partissent un budget/des ressources limit\\u00e9es entre **murailles**, **milice**, **approvisionnement** et **diplomatie** (voir encadr\\u00e9 ci-dessous). Serafina convoque un conseil de crise.\r\n\r\n### Session 15 \u2014 Les Dettes de Gratigna\r\nSc\\u00e8ne politique \\u00e0 Gratigna : les PJ tentent d'obtenir l'appui du Principe Aldo Vestraro. Son soutien d\\u00e9pend des relations \\u00e9tablies en Arc I (proc\\u00e8s d'Ilaria, r\\u00e9putation des PJ).\r\n\r\n### Session 16 \u2014 Tractations \\u00e0 la Miniera\r\nN\\u00e9gociation (ou combat) avec Orsina Vetraia et les Randagi della Fossa Verde pour s\\u00e9curiser un flanc et obtenir des mercenaires suppl\\u00e9mentaires.\r\n\r\n### Session 17 \u2014 Ombres sur Celside\r\nIntrigue secondaire : un \\u00e9missaire de Celside tente de saboter les n\\u00e9gociations en cours (financement occulte d'un rival au Conseil de Vallombra, ou envoi d'un *Sicario del Tralcio* si Ilaria est encore hostile). \\u00c9pisode d'enqu\\u00eate/infiltration.\r\n\r\n### Session 18 \u2014 La Nuit des Murailles\r\nCombat de grande ampleur : un assaut (des cultistes restants, des sciacalli, ou une tentative de sabotage) teste les pr\\u00e9paratifs de gestion de quartier des sessions pr\\u00e9c\\u00e9dentes. Les choix de r\\u00e9partition des ressources influencent directement la difficult\\u00e9 du combat (murailles solides = moins d'ennemis passent, milice forte = renforts en combat).\r\n\r\n### Session 19 \u2014 La Marche sur l'Ossario (si Fra Cosma est encore actif)\r\nAssaut final coordonn\\u00e9 sur l'Ossario Sepolto avec les alli\\u00e9s r\\u00e9unis. *(Si Fra Cosma a d\\u00e9j\\u00e0 \\u00e9t\\u00e9 vaincu en Arc II, cette session devient un \\u00e9pilogue de reconstruction et de c\\u00e9l\\u00e9bration, avec une intrigue secondaire au choix du MJ, par exemple un dernier complot de Celside.)*\r\n\r\n### Session 20 \u2014 \\u00c9pilogue : Le Gouvernement des Cendres\r\nR\\u00e9solution finale : statut politique de Vallombra (autonomie, rattachement renforc\\u00e9 \\u00e0 Gratigna, ou ind\\u00e9pendance conflictuelle), sort des factions (Compagnia del Tralcio, Randagi, Sacro Regno local), et devenir des PJ (titres, r\\u00e9putation, hooks pour une suite \\u00e9ventuelle).\r\n\r\n## Mini-jeu de gestion de quartier (sessions 14, 18)\r\n\r\n\\u00c0 la session 14, donnez aux PJ un total de **10 points de ressources** \\u00e0 r\\u00e9partir entre quatre pistes (murailles, milice, approvisionnement, diplomatie). Chaque point investi r\\u00e9duit d'un cran la difficult\\u00e9 des \\u00e9preuves correspondantes en session 18 (ex. : 3 points en murailles = -3 aux d\\u00e9g\\u00e2ts subis par la ville lors de l'assaut). Les \\u00e9v\\u00e9nements des sessions 15 \\u00e0 17 peuvent accorder des points suppl\\u00e9mentaires (succ\\u00e8s diplomatique, mercenaires obtenus) ou en retirer (sabotage r\\u00e9ussi de Celside).\r\n\r\n## Fins possibles\r\n\r\n1. **Autonomie triomphante** : Vallombra repousse la menace, obtient son ind\\u00e9pendance de Gratigna, les PJ deviennent des figures h\\u00e9ro\\u00efques locales.\r\n2. **Alliance fragile** : victoire obtenue gr\\u00e2ce \\u00e0 des alli\\u00e9s de circonstance (Randagi, Ilaria), mais Vallombra reste sous tutelle de Gratigna \\u2014 fin en demi-teinte.\r\n3. **Reconstruction dans la douleur** : victoire ch\\u00e8rement acquise, pertes importantes, Vallombra survit mais affaiblie \\u2014 hooks pour une suite plus sombre.\r\n4. **Chute de Vallombra** (\\u00e9chec majeur) : si les PJ ont largement n\\u00e9glig\\u00e9 la gestion de quartier et les alliances, Vallombra peut tomber partiellement, ouvrant sur une campagne de reconqu\\u00eate en suite \\u00e9ventuelle.\r\n" }, "/src/content/enemies/bandito-fossa-verde.md": { "data": { "name": "Bandito della Fossa Verde", "type": "Humano\xEFde (th\xE9rien), tout alignement", "cr": "1/8 (25 XP)", "image": "/images/enemies/bandito-fossa-verde.svg", "ac": 12, "hp": "11 (2d8+2)", "speed": "9 m", "stats": { "for": 11, "dex": 12, "con": 12, "int": 10, "sag": 10, "cha": 10 }, "summary": "Pillard opportuniste rencontr\xE9 pr\xE8s des routes commerciales et du Villaggio dei Salici." }, "body": "\r\n## Actions\r\n\r\n- **Cimeterre.** Attaque au corps \xE0 corps, +3, 1,5 m ; 4 (1d6+1) d\xE9g\xE2ts tranchants.\r\n- **Arbal\xE8te l\xE9g\xE8re.** Attaque \xE0 distance, +3, 24/96 m ; 5 (1d8+1) d\xE9g\xE2ts perforants.\r\n\r\n## Notes de MJ\r\n\r\nApparaissent g\xE9n\xE9ralement par groupes de 3 \xE0 5 avec un meneur (voir *Randagio Veterano*). Utiles pour des rencontres d'introduction sur la route Vallombra \u2013 Villaggio dei Salici." }, "/src/content/enemies/custode-dossa.md": { "data": { "name": "Custode d'Ossa", "type": "Construction, non align\xE9", "cr": "5 (1800 XP)", "image": "/images/enemies/custode-dossa.svg", "ac": 17, "hp": "85 (10d10+30)", "speed": "9 m", "stats": { "for": 18, "dex": 9, "con": 16, "int": 5, "sag": 10, "cha": 3 }, "summary": "Golem d'ossements anim\xE9 par un rituel ancien, mini-boss de la Nef S\xE9pulcrale dans l'Ossario Sepolto." }, "body": "\r\n## Actions\r\n\r\n- **Attaques multiples.** Deux attaques de poing.\r\n- **Poing.** Attaque au corps \xE0 corps, +7, 1,5 m ; 13 (2d8+4) d\xE9g\xE2ts contondants.\r\n- **Explosion d'ossements (recharge 5-6).** Chaque cr\xE9ature \xE0 3 m doit r\xE9ussir un jet de Dext\xE9rit\xE9 (DD 14) ou subir 18 (4d8) d\xE9g\xE2ts perforants (moiti\xE9 en cas de r\xE9ussite).\r\n\r\n## Traits\r\n\r\n- **Immunit\xE9s.** Poison, Charme, Effroi, Poison, Fatigu\xE9.\r\n- **R\xE9sistance.** D\xE9g\xE2ts contondants/tranchants/perforants des attaques non magiques.\r\n\r\n## Notes de MJ\r\n\r\nGardien mis en \xE9veil au milieu de l'Ossario Sepolto (Arc II) ; sa d\xE9faite ou sa d\xE9sactivation (via un rituel appris aupr\xE8s de Madre Iolanda) peut ouvrir un chemin alternatif vers Fra Cosma." }, "/src/content/enemies/fra-cosma.md": { "data": { "name": "Fra Cosma, le Proph\xE8te Enseveli", "type": "Humano\xEFde (th\xE9rien), n\xE9omalveillant convaincu", "cr": "8 (3900 XP)", "image": "/images/enemies/fra-cosma.svg", "ac": 16, "hp": "136 (16d8+64)", "speed": "9 m", "stats": { "for": 11, "dex": 14, "con": 18, "int": 14, "sag": 17, "cha": 18 }, "summary": "Le chef d'ordre h\xE9r\xE9tique de l'Ossario Sepolto, boss final des Arcs II/III selon la branche choisie." }, "body": "\r\n## Actions\r\n\r\n- **Attaques multiples.** Deux attaques avec son b\xE2ton d'ossements, ou une attaque de b\xE2ton et un sort.\r\n- **B\xE2ton d'ossements.** Attaque au corps \xE0 corps, +5, 3 m ; 8 (1d8+4) d\xE9g\xE2ts contondants + 4 (1d8) d\xE9g\xE2ts n\xE9crotiques.\r\n- **Mots interdits (sort, 3/jour).** Une cr\xE9ature \xE0 9 m doit r\xE9ussir un jet de Sagesse (DD 15) ou \xEAtre Effray\xE9e pendant 1 minute.\r\n- **R\xE9veil des os (rituel, 1/combat).** Fra Cosma ranime 1d4 Scheletro Mortificato en r\xE9serve dans la salle.\r\n\r\n## Traits\r\n\r\n- **R\xE9sistance l\xE9gendaire (1/jour).** Peut transformer un jet de sauvegarde rat\xE9 en r\xE9ussite.\r\n- **Sinc\xE9rit\xE9 fanatique.** Immunis\xE9 \xE0 l'effet Charme ; avantage aux jets de sauvegarde contre la Persuasion visant \xE0 le faire renoncer.\r\n\r\n## Notes de MJ\r\n\r\nCombat final possible en Arc II (confrontation pr\xE9coce, plus difficile) ou en Arc III (apr\xE8s affaiblissement de son ordre \u2014 combat plus \xE9quilibr\xE9). Une approche non-violente (Madre Iolanda, DD 18 de Persuasion cumulative) permet une fin alternative o\xF9 Cosma est ramen\xE9 au Sacro Regno pour y \xEAtre jug\xE9." }, "/src/content/enemies/randagio-veterano.md": { "data": { "name": "Randagio Veterano", "type": "Humano\xEFde (th\xE9rien), neutre", "cr": "3 (700 XP)", "image": "/images/enemies/randagio-veterano.svg", "ac": 15, "hp": "58 (9d8+18)", "speed": "9 m", "stats": { "for": 14, "dex": 13, "con": 14, "int": 10, "sag": 11, "cha": 10 }, "summary": "Mercenaire aguerri des Randagi della Fossa Verde ; peut \xEAtre un ennemi \xE0 la mine ou un alli\xE9 pr\xE9cieux en Arc III." }, "body": "\r\n## Actions\r\n\r\n- **Attaques multiples.** Deux attaques \xE0 l'\xE9p\xE9e courte.\r\n- **\xC9p\xE9e courte.** Attaque au corps \xE0 corps, +4, 1,5 m ; 6 (1d6+3) d\xE9g\xE2ts perforants.\r\n- **Arc court.** Attaque \xE0 distance, +3, 24/96 m ; 6 (1d6+3) d\xE9g\xE2ts perforants.\r\n\r\n## Notes de MJ\r\n\r\nReprend le profil classique du v\xE9t\xE9ran. Sous les ordres d'Orsina Vetraia \xE0 la Miniera Abbandonata ; en tant qu'alli\xE9 potentiel en Arc III, peut renforcer la d\xE9fense de Vallombra." }, "/src/content/enemies/scheletro-mortificato.md": { "data": { "name": "Scheletro Mortificato", "type": "Mort-vivant, l\xE9gion neutre mauvais", "cr": "1/4 (50 XP)", "image": "/images/enemies/scheletro-mortificato.svg", "ac": 13, "hp": "13 (2d8+4)", "speed": "9 m", "stats": { "for": 10, "dex": 14, "con": 15, "int": 6, "sag": 8, "cha": 5 }, "summary": `Squelette rituellement lac\xE9r\xE9 ("Mortificato") gardant l'Ossario Sepolto pour l'Ordine delle Ossa Sopite.` }, "body": "\r\n## Actions\r\n\r\n- **\xC9p\xE9e courte.** Attaque au corps \xE0 corps, +4, 1,5 m ; 5 (1d6+2) d\xE9g\xE2ts perforants.\r\n- **Arc court.** Attaque \xE0 distance, +4, 24/96 m ; 5 (1d6+2) d\xE9g\xE2ts perforants.\r\n\r\n## Traits\r\n\r\n- **Immunit\xE9s.** Poison ; \xE9tats Empoisonn\xE9 et Fatigu\xE9.\r\n- **Vuln\xE9rabilit\xE9.** D\xE9g\xE2ts contondants.\r\n\r\n## Notes de MJ\r\n\r\nLes gardes standards de l'Ossario Sepolto (Arc II). Souvent post\xE9s en embuscade dans les Cryptes d'Entr\xE9e ; peuvent aussi appara\xEEtre comme \xE9claireurs pr\xE8s du Villaggio dei Salici (Arc I)." }, "/src/content/enemies/sciacallo-delle-sabbie.md": { "data": { "name": "Sciacallo delle Sabbie", "type": "B\xEAte, non align\xE9", "cr": "1 (200 XP)", "image": "/images/enemies/sciacallo-delle-sabbie.svg", "ac": 13, "hp": "22 (4d8+4)", "speed": "15 m", "stats": { "for": 14, "dex": 16, "con": 13, "int": 4, "sag": 13, "cha": 7 }, "summary": "Grand chacal des sables de la Riarsa, chasse en meute et sert parfois d'\xE9claireur \xE0 l'Ordine delle Ossa Sopite." }, "body": "\r\n## Actions\r\n\r\n- **Morsure.** Attaque au corps \xE0 corps, +4, 1,5 m ; 7 (1d8+3) d\xE9g\xE2ts perforants ; la cible doit r\xE9ussir un jet de Force (DD 11) ou \xEAtre renvers\xE9e.\r\n\r\n## Traits\r\n\r\n- **Tactiques de meute.** Avantage aux jets d'attaque contre une cr\xE9ature si un alli\xE9 du sciacallo est \xE0 1,5 m de la cible et n'est pas neutralis\xE9.\r\n- **Camouflage d\xE9sertique.** Avantage aux jets de discr\xE9tion dans le sable et la roche.\r\n\r\n## Notes de MJ\r\n\r\nApparaissent en meutes de 2 \xE0 4 dans la Riarsa et aux abords du Villaggio dei Salici. Bonne rencontre d'exploration en Arc II avant l'Ossario Sepolto." }, "/src/content/enemies/sicario-del-tralcio.md": { "data": { "name": "Sicario del Tralcio", "type": "Humano\xEFde (th\xE9rien), l\xE9galement mauvais", "cr": "2 (450 XP)", "image": "/images/enemies/sicario-del-tralcio.svg", "ac": 14, "hp": "33 (6d8+6)", "speed": "12 m", "stats": { "for": 12, "dex": 16, "con": 13, "int": 12, "sag": 11, "cha": 10 }, "summary": "Assassin \xE0 la solde de la Compagnia del Tralcio, envoy\xE9 pour intimider ou \xE9liminer les g\xEAneurs de son commerce." }, "body": "\r\n## Actions\r\n\r\n- **Attaques multiples.** Deux attaques \xE0 la dague.\r\n- **Dague.** Attaque au corps \xE0 corps ou \xE0 distance, +5, 1,5/6/18 m ; 5 (1d4+3) d\xE9g\xE2ts perforants, +7 (2d6) d\xE9g\xE2ts si la cible est surprise.\r\n- **Poison paralysant (objet, 1 dose).** La cible touch\xE9e doit r\xE9ussir un jet de Constitution (DD 13) ou \xEAtre Paralys\xE9e pendant 1 minute (nouveau jet \xE0 la fin de chaque tour).\r\n\r\n## Notes de MJ\r\n\r\nUtilis\xE9 par Ilaria Conti pour intimider t\xE9moins ou n\xE9gociateurs (Arc I) ; sa capture vivant peut fournir une preuve d\xE9cisive contre la Compagnia del Tralcio." }, "/src/content/locations/celside.md": { "data": { "name": "Celside", "type": "Cit\xE9-\xC9tat (oligarchie terrienne)", "region": "Conf\xE9d\xE9ration des Libres Cit\xE9s", "image": "/images/locations/celside.svg", "tags": ["politique", "rivalit\xE9"], "summary": "Cit\xE9 rivale de Gratigna, gouvern\xE9e par ses grands propri\xE9taires terriens, pr\xEAte \xE0 profiter des malheurs de Vallombra." }, "body": "\r\n## Description\r\n\r\nCelside choisit son Gouverneur parmi ses grands propri\xE9taires terriens. Rivale commerciale de Gratigna (et donc indirectement de Vallombra), elle verrait d'un bon \u0153il l'affaiblissement de sa voisine \u2014 quitte \xE0 financer en sous-main la Compagnia del Tralcio ou \xE0 n\xE9gocier directement avec les Randagi della Fossa Verde pour la mine.\r\n\r\n## Utilisation en jeu\r\n\r\nLevier d'**intrigue politique** en arri\xE8re-plan des Arcs I et III : source de complots, de financements occultes et de retournements d'alliances." }, "/src/content/locations/gratigna.md": { "data": { "name": "Gratigna", "type": "Cit\xE9-\xC9tat (principaut\xE9)", "region": "Conf\xE9d\xE9ration des Libres Cit\xE9s", "image": "/images/locations/gratigna.svg", "tags": ["politique", "intrigue", "cour"], "summary": "Cit\xE9 vinicole gouvern\xE9e par un Prince, dont d\xE9pend administrativement Vallombra ; c\u0153ur des intrigues politiques de la campagne." }, "body": "\r\n## Description\r\n\r\nGratigna est l'une des cit\xE9s membres de la Conf\xE9d\xE9ration, r\xE9put\xE9e pour ses vignobles et son vin, les meilleurs de Vesteria selon la rumeur. Contrairement aux autres cit\xE9s conf\xE9d\xE9r\xE9es, Gratigna est gouvern\xE9e par un **Prince** (et non un maire ou un podestat), ce qui en fait une exception fi\xE8re de son aura de noblesse au sein d'une Conf\xE9d\xE9ration plut\xF4t r\xE9publicaine.\r\n\r\nLa cit\xE9 tourne le dos \xE0 la Riarsa, pr\xE9f\xE9rant se concentrer sur ses vignes nourries par un affluent du Bastione. C'est \xE0 sa cour que se joue une bonne partie des intrigues politiques de la campagne : soutien ou abandon de Vallombra, rivalit\xE9 avec la Compagnia del Tralcio, r\xE9actions aux troubles venus du d\xE9sert.\r\n\r\n## Personnages associ\xE9s\r\n\r\n- Principe Aldo Vestraro (souverain de Gratigna)\r\n- Ilaria Conti (Guildmaster de la Compagnia del Tralcio)\r\n\r\n## Utilisation en jeu\r\n\r\nTh\xE9\xE2tre principal des sc\xE8nes de **cour et de politique** (Arc I et III) : audiences, complots, marchandages d'influence, proc\xE8s. Peut aussi servir de refuge ou, \xE0 l'inverse, de menace si le Prince retire son soutien \xE0 Vallombra." }, "/src/content/locations/miniera-abbandonata.md": { "data": { "name": "La Miniera Abbandonata", "type": "Mine d\xE9saffect\xE9e", "region": "Lisi\xE8re de la Fossa Verde", "image": "/images/locations/miniera-abbandonata.svg", "tags": ["combat", "ressources", "politique"], "summary": "Ancienne mine d'argent \xE0 la fronti\xE8re de la Fossa Verde, disput\xE9e entre Vallombra et une compagnie de mercenaires." }, "body": "\r\n## Description\r\n\r\nCette mine d'argent, ferm\xE9e depuis une g\xE9n\xE9ration apr\xE8s un effondrement, borde le territoire sauvage de la Fossa Verde. Des rumeurs de veines encore riches ont attir\xE9 la compagnie mercenaire **I Randagi della Fossa Verde**, men\xE9e par la Capitaine Orsina Vetraia, qui en a pris possession de facto.\r\n\r\nVallombra revendique l\xE9galement la mine (elle finance une partie de ses fortifications sur cette base), cr\xE9ant un diff\xE9rend qui peut se r\xE9gler par la force, la diplomatie... ou une alliance contre une menace commune.\r\n\r\n## Personnages associ\xE9s\r\n\r\n- Capitano Orsina Vetraia (I Randagi della Fossa Verde)\r\n\r\n## Utilisation en jeu\r\n\r\nN\u0153ud **politique + combat** (Arc I ou III) : n\xE9gociation de ressources, escarmouches, ou alliance tactique si les Randagi sont convaincus de rejoindre la d\xE9fense de Vallombra contre l'Ordine delle Ossa Sopite." }, "/src/content/locations/ossario-sepolto.md": { "data": { "name": "L'Ossario Sepolto", "type": "Ruines / donjon souterrain", "region": "La Riarsa (d\xE9sert)", "image": "/images/locations/ossario-sepolto.svg", "tags": ["donjon", "horreur", "enqu\xEAte", "combat"], "summary": "Temple oubli\xE9 consacr\xE9 au culte des Ossa, enfoui sous les dunes de la Riarsa, r\xE9veill\xE9 par l'Ordine delle Ossa Sopite." }, "body": `\r
## Description\r
\r
Bien avant que le Sacro Regno n'impose son culte des Ossa comme religion d'\xC9tat, un temple beaucoup plus ancien et beaucoup plus sombre honorait d\xE9j\xE0 les ossements dans ce qui est aujourd'hui la Riarsa. Enseveli depuis des si\xE8cles par les sables, il a \xE9t\xE9 red\xE9couvert par **Fra Cosma**, moine d\xE9froqu\xE9 du Sacro Regno, qui y a fond\xE9 l'Ordine delle Ossa Sopite ("l'Ordre des Os Assoupis").\r
\r
Le site se compose de trois niveaux : les **Cryptes d'Entr\xE9e** (pi\xE8ges, sentinelles squelettes), la **Nef S\xE9pulcrale** (rituels, Custodes d'Ossa), et le **C\u0153ur S\xE9pulcral**, o\xF9 Fra Cosma tente de r\xE9veiller ce qui dort sous l'autel.\r
\r
## Personnages / cr\xE9atures associ\xE9s\r
\r
- Fra Cosma, le Proph\xE8te Enseveli (boss final)\r
- Scheletro Mortificato (gardes)\r
- Custode d'Ossa (mini-boss)\r
\r
## Utilisation en jeu\r
\r
C\u0153ur de l'**Arc II** : exploration de donjon, \xE9nigmes rituelles (ordre des ossements, chants interdits), horreur et combats progressifs jusqu'\xE0 la confrontation avec Fra Cosma.` }, "/src/content/locations/vallombra.md": { "data": { "name": "Vallombra", "type": "Bourg fortifi\xE9 (base des PJ)", "region": "Marches de Gratigna, Conf\xE9d\xE9ration des Libres Cit\xE9s", "image": "/images/locations/vallombra.svg", "tags": ["hub", "politique", "gestion de quartier"], "summary": "Petit bourg viticole aux portes de la Riarsa, d\xE9pendant de Gratigna, o\xF9 les PJ commencent la campagne." }, "body": `\r
## Description\r
\r
Vallombra est un bourg fortifi\xE9 d'environ 1500 \xE2mes, blotti entre les derniers coteaux fertiles nourris par un affluent du Bastione et les premi\xE8res pierres arides de la **Riarsa**, le grand d\xE9sert au sud de la Conf\xE9d\xE9ration. Ses murs de pierre ocre, perc\xE9s d'une unique grande porte (la Porta Secca), prot\xE8gent des entrep\xF4ts \xE0 vin, un petit port fluvial et un march\xE9 couvert toujours anim\xE9 les jours de foire.\r
\r
Vallombra vit du commerce du vin et de l'huile qui transitent vers **Gratigna**, dont elle d\xE9pend politiquement et \xE9conomiquement \u2014 une d\xE9pendance de plus en plus contest\xE9e par certains notables locaux.\r
\r
## Quartiers\r
\r
- **La Porta Secca** : la porte principale et son corps de garde, tenu par le capitaine Baldassare.\r
- **Le Tinaie** (les celliers) : entrep\xF4ts \xE0 vin, c\u0153ur \xE9conomique de la ville, convoit\xE9s par la Compagnia del Tralcio.\r
- **Il Guscio** : le vieux quartier populaire, d\xE9dale de ruelles o\xF9 Renzo "la Taupe" tient ses r\xE9seaux d'informateurs.\r
- **La Piccola Curia** : chapelle de la Foi o\xF9 officie Madre Iolanda.\r
\r
## Personnages associ\xE9s\r
\r
- Contessa Serafina Dal Moro (podestat de Vallombra)\r
- Ser Baldassare (capitaine de la garde)\r
- Madre Iolanda (pr\xEAtresse)\r
- Renzo "la Taupe" (informateur)\r
\r
## Utilisation en jeu\r
\r
Vallombra sert de **hub de campagne** : march\xE9, qu\xEAtes secondaires, rumeurs, et point de d\xE9part pour la gestion de quartier (r\xE9paration des murailles, milices, relations avec Gratigna) d\xE9velopp\xE9e dans l'Arc III.` }, "/src/content/locations/villaggio-dei-salici.md": { "data": { "name": "Villaggio dei Salici", "type": "Village", "region": "Marches de Gratigna", "image": "/images/locations/villaggio-dei-salici.svg", "tags": ["enqu\xEAte", "combat", "communaut\xE9"], "summary": "Village de p\xEAcheurs et de tisserands en amont de Vallombra, frapp\xE9 par des disparitions inexpliqu\xE9es." }, "body": "\r\n## Description\r\n\r\nNich\xE9 le long de l'affluent du Bastione, en amont de Vallombra, ce village de saules et de roseaux vit de la p\xEAche et du tissage. Depuis quelques semaines, des villageois disparaissent la nuit pr\xE8s des saulaies, et des traces \xE9tranges (empreintes \xE0 trois griffes, odeur de sable br\xFBl\xE9) inqui\xE8tent les anciens.\r\n\r\nEn r\xE9alit\xE9, des \xE9claireurs de l'Ordine delle Ossa Sopite et des Sciacalli des Sables envoy\xE9s en rep\xE9rage r\xF4dent dans la r\xE9gion, cherchant des sacrifices pour les rituels de l'Ossario Sepolto.\r\n\r\n## Personnages associ\xE9s\r\n\r\n- Anziano Pietro (doyen du village, demandeur de la qu\xEAte)\r\n\r\n## Utilisation en jeu\r\n\r\nPoint d'entr\xE9e classique en **enqu\xEAte + combat** (Arc I ou II selon les choix des joueurs) : interrogatoires, pistage, embuscade nocturne contre des Sciacalli des Sables ou des \xE9claireurs squelettes." }, "/src/content/npcs/aldo-vestraro.md": { "data": { "name": "Principe Aldo Vestraro", "role": "Prince de Gratigna", "location": "Gratigna", "faction": "Casato Vestraro", "image": "/images/npcs/aldo-vestraro.svg", "alignment": "Calculateur, courtois en apparence, avant tout soucieux de sa cit\xE9", "summary": "Souverain \xE9l\xE9gant et retors de Gratigna, dont le soutien \xE0 Vallombra d\xE9pend des int\xE9r\xEAts de sa maison." }, "body": `\r
## Portrait\r
\r
Aldo Vestraro r\xE8gne sur Gratigna avec le sourire d'un homme qui n'a jamais eu \xE0 lever la voix pour obtenir ce qu'il veut. Il consid\xE8re Vallombra comme un actif utile plut\xF4t qu'une soeur cit\xE9, et n'h\xE9sitera pas \xE0 l'abandonner \xE0 son sort si le prix politique de son aide devient trop \xE9lev\xE9.\r
\r
## Utilisation en jeu\r
\r
Antagoniste politique "soft" : jamais ouvertement hostile, mais rarement franc. Ses d\xE9cisions (arm\xE9e envoy\xE9e ou non, reconnaissance de l'autonomie de Vallombra) forment l'un des grands embranchements de l'Arc III.` }, "/src/content/npcs/baldassare.md": { "data": { "name": "Ser Baldassare", "role": "Capitaine de la garde de Vallombra", "location": "Vallombra", "faction": "Conseil de Vallombra", "image": "/images/npcs/baldassare.svg", "alignment": "Loyal, direct, m\xE9fiant envers les mercenaires", "summary": "V\xE9t\xE9ran born\xE9 mais fiable, responsable de la d\xE9fense de Vallombra." }, "body": "\r\n## Portrait\r\n\r\nAncien soldat de la flotte confed\xE9r\xE9e reconverti, Baldassare dirige une garde sous-effectiv\xE9e et mal \xE9quip\xE9e. Il voit d'un mauvais \u0153il les Randagi della Fossa Verde et pousse pour un renforcement militaire plut\xF4t que diplomatique.\r\n\r\n## Utilisation en jeu\r\n\r\nAlli\xE9 tactique pour les combats \xE0 Vallombra ; source de tension si les PJ pr\xE9f\xE8rent la voie diplomatique avec les Randagi ou la Compagnia del Tralcio. Pilier de la gestion de quartier en Arc III (milices, r\xE9paration des murs)." }, "/src/content/npcs/fra-cosma.md": { "data": { "name": "Fra Cosma, le Proph\xE8te Enseveli", "role": "Chef de l'Ordine delle Ossa Sopite (antagoniste principal)", "location": "L'Ossario Sepolto", "faction": "Ordine delle Ossa Sopite", "image": "/images/npcs/fra-cosma.svg", "alignment": "Fanatique, convaincu d'agir pour un bien sup\xE9rieur", "summary": "Moine d\xE9froqu\xE9 du Sacro Regno devenu proph\xE8te d'un culte interdit, il cherche \xE0 r\xE9veiller ce qui dort sous l'Ossario Sepolto." }, "body": "\r\n## Portrait\r\n\r\nAncien confr\xE8re de Madre Iolanda, Cosma a \xE9t\xE9 exclu du clerg\xE9 du Sacro Regno pour ses th\xE9ories h\xE9r\xE9tiques sur une \u201Cv\xE9rit\xE9 plus ancienne\u201D cach\xE9e sous les Ossa officielles. Il a d\xE9couvert l'Ossario Sepolto et y a fond\xE9 son propre ordre, recrutant desesp\xE9r\xE9s et exclus dans toute la r\xE9gion.\r\n\r\n## Motivations\r\n\r\nCosma ne se voit pas comme un tyran mais comme un lib\xE9rateur : il croit que r\xE9veiller l'entit\xE9 endormie sous le temple mettra fin \xE0 l'hypocrisie du Sacro Regno. Il est sinc\xE8rement persuad\xE9 d'agir pour le bien.\r\n\r\n## Utilisation en jeu\r\n\r\nAntagoniste final des Arcs II et III. Voir la fiche ennemi [Fra Cosma](/ennemis/fra-cosma) pour ses statistiques de combat." }, "/src/content/npcs/ilaria-conti.md": { "data": { "name": "Ilaria Conti", "role": "Guildma\xEEtre de la Compagnia del Tralcio", "location": "Gratigna", "faction": "Compagnia del Tralcio", "image": "/images/npcs/ilaria-conti.svg", "alignment": "Ambitieuse, m\xE9prisante envers les \xE9lites h\xE9r\xE9ditaires, joue sa propre partie", "summary": "\xC0 la t\xEAte de la puissante guilde du vin, elle orchestre (ou profite de) la crise de Vallombra pour \xE9tendre son emprise commerciale." }, "body": "\r\n## Portrait\r\n\r\nFille de tonnelier devenue la femme la plus riche de Gratigna, Ilaria dirige la Compagnia del Tralcio, qui contr\xF4le une bonne part du n\xE9goce du vin de la r\xE9gion. Elle voit dans les troubles de Vallombra une occasion de racheter les celliers \xE0 bas prix \u2014 quitte \xE0 avoir elle-m\xEAme commandit\xE9 une partie du sabotage initial (r\xE9v\xE9lation possible en fin d'Arc I).\r\n\r\n## Utilisation en jeu\r\n\r\nAntagoniste principal de l'**Arc I** (intrigue \xE9conomique) ; peut devenir alli\xE9e de circonstance en Arc III si les PJ n\xE9gocient habilement, ou ennemie jur\xE9e si elle est publiquement d\xE9masqu\xE9e." }, "/src/content/npcs/iolanda.md": { "data": { "name": "Madre Iolanda", "role": "Pr\xEAtresse de la Foi des Ossa", "location": "Vallombra", "faction": "\xC9glise du Sacro Regno (branche locale)", "image": "/images/npcs/iolanda.svg", "alignment": "D\xE9vote, inqui\xE8te, en qu\xEAte de r\xE9demption pour son ordre", "summary": "Pr\xEAtresse locale qui soup\xE7onne l'existence d'un culte h\xE9r\xE9tique li\xE9 aux Ossa dans la r\xE9gion." }, "body": "\r\n## Portrait\r\n\r\nIolanda a \xE9t\xE9 form\xE9e au Sacro Regno avant d'\xEAtre envoy\xE9e officier \xE0 la chapelle de Vallombra. Elle a connu Fra Cosma \xE0 l'\xE9cole monastique et se sent en partie responsable de sa d\xE9rive, ce qui la pousse \xE0 aider discr\xE8tement les PJ dans l'Arc II.\r\n\r\n## Utilisation en jeu\r\n\r\nSource d'exposition sur le culte des Ossa et de la religion du Sacro Regno ; peut fournir rituels de protection, indices sur l'Ossario Sepolto, et un dilemme moral (d\xE9noncer publiquement Fra Cosma ou tenter de le sauver)." }, "/src/content/npcs/orsina-vetraia.md": { "data": { "name": "Capitano Orsina Vetraia", "role": "Cheffe de la compagnie mercenaire I Randagi della Fossa Verde", "location": "La Miniera Abbandonata", "faction": "I Randagi della Fossa Verde", "image": "/images/npcs/orsina-vetraia.svg", "alignment": "Pragmatique, m\xE9prise la noblesse conf\xE9d\xE9r\xE9e, fid\xE8le \xE0 ses hommes", "summary": "Mercenaire aguerrie venue de la Fossa Verde, elle occupe la mine contest\xE9e et pourrait devenir alli\xE9e ou ennemie selon la diplomatie des PJ." }, "body": "\r\n## Portrait\r\n\r\nOrsina a fui la Fossa Verde apr\xE8s la chute de sa compagnie d'origine face \xE0 des rivaux miniers. Install\xE9e \xE0 la Miniera Abbandonata avec ses Randagi, elle cherche avant tout la s\xE9curit\xE9 de sa troupe et une source de revenus stable, pas la guerre avec Vallombra.\r\n\r\n## Utilisation en jeu\r\n\r\nPivot du n\u0153ud **politique + combat** de la mine : combat si Vallombra attaque frontalement, alliance pr\xE9cieuse (renforts mercenaires) en Arc III si une entente est trouv\xE9e, notamment contre l'Ordine delle Ossa Sopite." }, "/src/content/npcs/renzo.md": { "data": { "name": 'Renzo "la Taupe"', "role": "Informateur et contrebandier", "location": "Vallombra", "faction": "Ind\xE9pendant", "image": "/images/npcs/renzo.svg", "alignment": "Cynique mais pas mauvais bougre, loyal \xE0 qui le paie bien", "summary": "Ferret des bas quartiers de Vallombra, il sait tout, vend tout, et n'est fid\xE8le qu'\xE0 sa bourse." }, "body": "\r\n## Portrait\r\n\r\nRenzo tient boutique de curiosit\xE9s dans le Guscio, fa\xE7ade \xE0 son vrai commerce : l'information et la contrebande de petits objets entre Vallombra, Gratigna et la Fossa Verde. Comique et bavard, il n'en est pas moins une source fiable de rumeurs, moyennant paiement (ou faveur).\r\n\r\n## Utilisation en jeu\r\n\r\nPoint d'acc\xE8s aux qu\xEAtes secondaires et aux rumeurs d'enqu\xEAte ; peut aussi vendre des informations aux PJ sur la Compagnia del Tralcio, les Randagi ou l'Ordine delle Ossa Sopite selon ce qu'il a surpris." }, "/src/content/npcs/serafina-dal-moro.md": { "data": { "name": "Contessa Serafina Dal Moro", "role": "Podestat de Vallombra (patronne principale des PJ)", "location": "Vallombra", "faction": "Conseil de Vallombra", "image": "/images/npcs/serafina-dal-moro.svg", "alignment": "Pragmatique, loyale envers Vallombra avant tout", "summary": "Dirigeante ambitieuse de Vallombra, elle engage les PJ pour prot\xE9ger et \xE9manciper sa cit\xE9." }, "body": "\r\n## Portrait\r\n\r\nLa Contessa Serafina a h\xE9rit\xE9 du titre de podestat \xE0 la mort de son p\xE8re. Th\xE9rienne au pelage gris argent\xE9, elle cultive une image de fermet\xE9 calme, mais s'inqui\xE8te en priv\xE9 de la d\xE9pendance croissante de Vallombra envers Gratigna et la Compagnia del Tralcio.\r\n\r\n## Motivations\r\n\r\n- \xC0 court terme : faire cesser le sabotage des celliers (Arc I).\r\n- \xC0 long terme : obtenir l'autonomie \xE9conomique, voire politique, de Vallombra vis-\xE0-vis de Gratigna.\r\n\r\n## Utilisation en jeu\r\n\r\nDonneuse de qu\xEAtes principale. Peut devenir une alli\xE9e ferme ou, si les PJ la trahissent ou \xE9chouent trop souvent, une figure plus dure et m\xE9fiante en Arc III." } };

async function getCollection(name) {
  const collectionPath = `/src/content/${name}/`;
  return Object.entries(contentFiles).filter(([filePath]) => filePath.replaceAll("\\", "/").includes(collectionPath)).map(([filePath, entry]) => {
    var _a;
    const fileName = (_a = filePath.replaceAll("\\", "/").split("/").pop()) != null ? _a : "";
    return {
      id: fileName.replace(/\.md$/, ""),
      data: entry.data,
      body: entry.body
    };
  });
}
async function getEntry(name, id) {
  var _a;
  const entries = await getCollection(name);
  return (_a = entries.find((entry) => entry.id === id)) != null ? _a : null;
}
function sortByOrder(entries) {
  return entries.sort((a, b) => {
    var _a, _b;
    return Number((_a = a.data.order) != null ? _a : 0) - Number((_b = b.data.order) != null ? _b : 0);
  });
}

const collections = ["arcs", "locations", "npcs", "enemies"];
const _collection__get = defineEventHandler(async (event) => {
  const collection = getRouterParam(event, "collection");
  if (!collection || !collections.includes(collection)) {
    throw createError({ statusCode: 404, statusMessage: "Collection introuvable" });
  }
  const query = getQuery$1(event);
  const id = typeof query.id === "string" ? query.id : void 0;
  const entry = id ? await getEntry(collection, id) : null;
  if (id) {
    if (!entry) throw createError({ statusCode: 404, statusMessage: "Entr\xE9e introuvable" });
    return { ...entry, bodyHtml: await marked.parse(entry.body) };
  }
  return sortByOrder(await getCollection(collection));
});

const _collection__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _collection__get
}, Symbol.toStringTag, { value: 'Module' }));

const health_get = defineEventHandler(() => ({ status: "ok" }));

const health_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: health_get
}, Symbol.toStringTag, { value: 'Module' }));

//#region src/runtime/utils/renderer/payload.ts
function renderPayloadResponse(ssrContext) {
	return {
		body: encodeForwardSlashes(stringify(splitPayload(ssrContext).payload, ssrContext["~payloadReducers"])) ,
		statusCode: getResponseStatus(ssrContext.event),
		statusMessage: getResponseStatusText(ssrContext.event),
		headers: {
			"content-type": "application/json;charset=utf-8" ,
			"x-powered-by": "Nuxt"
		}
	};
}
function renderPayloadJsonScript(opts) {
	const payload = {
		"type": "application/json",
		"innerHTML": opts.data ? encodeForwardSlashes(stringify(opts.data, opts.ssrContext["~payloadReducers"])) : "",
		"data-nuxt-data": appId,
		"data-ssr": !(opts.ssrContext.noSSR)
	};
	payload.id = "__NUXT_DATA__";
	if (opts.src) payload["data-src"] = opts.src;
	const config = uneval(opts.ssrContext.config);
	return [payload, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}` }];
}
/**
* Encode forward slashes as unicode escape sequences to prevent
* Google from treating them as internal links and trying to crawl them.
* @see https://github.com/nuxt/nuxt/issues/24175
*/
function encodeForwardSlashes(str) {
	return str.replaceAll("/", "\\u002F");
}
function splitPayload(ssrContext) {
	const { data, prerenderedAt, prefetchLinks, ...initial } = ssrContext.payload;
	const payload = {
		data,
		prerenderedAt
	};
	if (prefetchLinks?.length) payload.prefetchLinks = prefetchLinks;
	return {
		initial: {
			...initial,
			prerenderedAt
		},
		payload
	};
}

const renderSSRHeadOptions = {"omitLineBreaks":true};

//#region src/runtime/handlers/renderer.ts
globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const PAYLOAD_FILENAME = "_payload.json" ;
const PAYLOAD_BUILD_ID_PARAM = "_b";
const handler = defineRenderHandler((event) => {
	const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
	if (ssrError && !("__unenv__" in event.node.req)) throw createError({
		status: 404,
		statusText: "Page Not Found: /__nuxt_error",
		message: "Page Not Found: /__nuxt_error"
	});
	return renderRoute(event, ssrError);
});
async function renderRoute(event, ssrError) {
	const nitroApp = useNitroApp();
	const ssrContext = createSSRContext(event);
	ssrContext.head.push(appHead);
	if (ssrError) {
		const status = ssrError.status || ssrError.statusCode;
		if (status) ssrError.status = ssrError.statusCode = Number.parseInt(status);
		if (typeof ssrError.data === "string") try {
			ssrError.data = destr(ssrError.data);
		} catch {}
		setSSRError(ssrContext, ssrError);
	}
	const routeOptions = getRouteRules(event);
	if (routeOptions.ssr === false) ssrContext.noSSR = true;
	!ssrContext.noSSR && (NUXT_RUNTIME_PAYLOAD_EXTRACTION);
	const isRenderingPayload = (routeOptions.prerender) && PAYLOAD_URL_RE.test(ssrContext.url);
	if (isRenderingPayload) {
		const payloadURL = new URL(ssrContext.url, "http://localhost");
		const url = payloadURL.pathname.slice(0, -`/${PAYLOAD_FILENAME}`.length) || "/";
		payloadURL.searchParams.delete(PAYLOAD_BUILD_ID_PARAM);
		ssrContext.url = url + payloadURL.search;
		event._path = event.node.req.url = ssrContext.url;
		getPayloadCacheKey(ssrContext.url);
	}
	const renderer = await getRenderer(ssrContext);
	const canStream = NUXT_SSR_STREAMING;
	const renderRouteContext = {
		canStream,
		prefersStream: false
	};
	await nitroApp.hooks.callHook("render:route", renderRouteContext, { event });
	const _rendered = await (renderer.renderToString(ssrContext)).catch(async (error) => {
		if ((ssrContext["~renderResponse"] || ssrContext._renderResponse) && error.message === "skipping render") return {};
		const _err = !ssrError && ssrContext.payload?.error || error;
		await ssrContext.nuxt?.hooks.callHook("app:error", _err);
		throw _err;
	});
	const inlinedStyles = [];
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult: _rendered
	});
	if (ssrContext["~renderResponse"] || ssrContext._renderResponse) return ssrContext["~renderResponse"] || ssrContext._renderResponse;
	if (ssrContext.payload?.error && !ssrError) throw ssrContext.payload.error;
	if (isRenderingPayload) {
		const response = renderPayloadResponse(ssrContext);
		return response;
	}
	const NO_SCRIPTS = routeOptions.noScripts;
	const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
	if (inlinedStyles.length) ssrContext.head.push({ style: inlinedStyles });
	const link = [];
	for (const resource of Object.values(styles)) {
		if ("inline" in getQuery(resource.file)) continue;
		link.push({
			rel: "stylesheet",
			href: renderer.rendererContext.buildAssetsURL(resource.file),
			crossorigin: ""
		});
	}
	if (link.length) ssrContext.head.push({ link });
	if (!NO_SCRIPTS) {
		const dependencyOptions = ssrContext["~lazyHydratedModules"]?.size ? { exclude: ssrContext["~lazyHydratedModules"] } : void 0;
		const excludeHrefs = new Set(link.map((l) => l.href));
		for (const id of ssrContext["~neverHydratedModules"] ?? []) {
			const file = renderer.rendererContext.manifest?.[id]?.file;
			if (file) excludeHrefs.add(renderer.rendererContext.buildAssetsURL(file));
		}
		const hints = [];
		for (const l of getPreloadLinks(ssrContext, renderer.rendererContext, dependencyOptions)) if (!excludeHrefs.has(l.href)) hints.push(l);
		for (const l of getPrefetchLinks(ssrContext, renderer.rendererContext, dependencyOptions)) if (!excludeHrefs.has(l.href)) hints.push(l);
		ssrContext.head.push({ link: hints });
		ssrContext.head.push({ script: renderPayloadJsonScript({
			ssrContext,
			data: stripInlineOnlyPayloadFields(ssrContext.payload)
		})   }, {
			tagPosition: "bodyClose",
			tagPriority: "high"
		});
	}
	if (!routeOptions.noScripts) {
		const tagPosition = "head";
		ssrContext.head.push({ script: Object.values(scripts).map((resource) => ({
			type: resource.module ? "module" : null,
			src: renderer.rendererContext.buildAssetsURL(resource.file),
			defer: resource.module ? null : true,
			tagPosition,
			crossorigin: ""
		})) });
	}
	const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = renderSSRHead(ssrContext.head, renderSSRHeadOptions);
	const htmlContext = {
		htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
		head: normalizeChunks([headTags]),
		bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
		bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
		body: [replaceIslandTeleports(ssrContext, _rendered.html) , APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG],
		bodyAppend: [bodyTags]
	};
	await nitroApp.hooks.callHook("render:html", htmlContext, { event });
	return {
		body: renderHTMLDocument(htmlContext),
		statusCode: getResponseStatus(event),
		statusMessage: getResponseStatusText(event),
		headers: {
			"content-type": "text/html;charset=utf-8",
			"x-powered-by": "Nuxt"
		}
	};
}
function getPayloadCacheKey(url) {
	const { pathname, search } = new URL(url, "http://localhost");
	return (pathname === "/" ? "/" : pathname.replace(/\/$/, "")) + (search ? encodeURIComponent(search) : "") + ".json";
}
function normalizeChunks(chunks) {
	const result = [];
	for (const _chunk of chunks) {
		const chunk = _chunk?.trim();
		if (chunk) result.push(chunk);
	}
	return result;
}
function joinTags(tags) {
	return tags.join("");
}
function joinAttrs(chunks) {
	if (chunks.length === 0) return "";
	return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
	return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}
function stripInlineOnlyPayloadFields(payload) {
	if (!payload.prefetchLinks) return payload;
	const { prefetchLinks: _, ...rest } = payload;
	return rest;
}

const renderer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handler
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
