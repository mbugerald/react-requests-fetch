/*****
 * NOTE: The purpose for this hooks is handling all HTTP requests within a given application, while
 *      taking into consideration all methods and valid parameters required, with just a little more of an async format.
 *      Besides the [method] parameters every other params should be supplied as key value object list. Equally 3 state
 *      arguments are issues on initialization, the 3rd argument has as role returning the current state of the request,
 *      meanwhile the first handles the request parameters and the second handles the response parameters. Every,
 *      response is returned as an object with two arguments, the first representing the status code and the last
 *      carrying the response payload from its destination. Keep in mind this hook is two dimensional meaning it can
 *      compute automatically, with initial values or it can be computed dynamically with state values. Priority is given
 *      to the dynamic url therefore be aware when initiating the urls.
 * *****/

import {useEffect, useReducer, useState} from "react";

// Handle request base on provided parameters from the consumer.
const request = async (
    url: string,
    method: string | undefined,
    headers: RequestHeaders | undefined,
    body: RequestBody | undefined,
    params: RequestQueryParams | undefined,
    cache: RequestCache,
    mode: RequestMode | undefined,
    integrity: string|undefined,
    credentials: RequestCredentials|undefined,
    referrer: RequestReferral,
    redirect: RequestRedirect,
    referrerPolicy: RequestReferralPolicy,
    keepAlive: RequestKeepAlive
) => {

  // Fetch custom headers if any provided.
  const reqHeaders = new Headers()
  headers && Object.keys(headers)
      .map((h) => reqHeaders.append(String(h), String(headers[h])))

  // Handling request fetch params.
  const reqParams = new URLSearchParams();
  params && Object.keys(params)
      .map((p) => reqParams.append(String(p), params[p]))

  // Update the params list if the provided outcome is length > than 0.
  if (params && Object.keys(params).length > 0) {url = url + "?" + reqParams}

  // Conjunction of different possibilities.
  switch (method) {
    case "POST" || "post":
      const req = await fetch(url, {
        headers: reqHeaders,
        method: "POST",
        body: JSON.stringify(body),
        cache: cache ? cache: "default",
        mode: mode? mode: "cors",
        integrity: integrity,
        credentials: credentials,
        referrer: referrer,
        redirect: redirect,
        referrerPolicy: referrerPolicy,
        keepalive: keepAlive
      });
      return requestStatus(req.status, await req)
    case "PUT" || "delete":
      const reqPut = await fetch(url, {
        headers: reqHeaders,
        method: "POST",
        body: JSON.stringify(body),
        cache: cache ? cache: "default",
        mode: mode? mode: "cors",
        integrity: integrity,
        credentials: credentials,
        referrer: referrer,
        redirect: redirect,
        referrerPolicy: referrerPolicy,
        keepalive: keepAlive
      });
      return requestStatus(reqPut.status, await reqPut)
    case "DELETE" || "delete":
      const reqDelete = await fetch(url, {
        headers: reqHeaders,
        method: "POST",
        body: JSON.stringify(body),
        cache: cache ? cache: "default",
        mode: mode? mode: "cors",
        integrity: integrity,
        credentials: credentials,
        referrer: referrer,
        redirect: redirect,
        referrerPolicy: referrerPolicy,
        keepalive: keepAlive
      });
      return requestStatus(reqDelete.status, await reqDelete)
    case "PATCH" || "patch":
      const reqPatch = await fetch(url, {
        headers: reqHeaders,
        method: "POST",
        body: JSON.stringify(body),
        cache: cache ? cache: "default",
        mode: mode? mode: "cors",
        integrity: integrity,
        credentials: credentials,
        referrer: referrer,
        redirect: redirect,
        referrerPolicy: referrerPolicy,
        keepalive: keepAlive
      });
      return requestStatus(reqPatch.status, await reqPatch)
    default:
      const resp = await fetch(url, {
        method: "GET",
        headers: reqHeaders,
        cache: cache ? cache: "default",
        mode: mode? mode: "cors",
        integrity: integrity,
        credentials: credentials,
        referrer: referrer,
        redirect: redirect,
        referrerPolicy: referrerPolicy,
        keepalive: keepAlive
      });
      return requestStatus(resp.status, resp)
  }
}

// Check the request status and send out the right payload back.
const requestStatus = async (status: number, response: any |undefined) => {
  if(status === 200 || status === 201) {
    return [ status, await response.json()];
  } else {

    return [status, JSON.parse(await response.text())]
  }
}

// Header types
type RequestHeaders = {
  [key: string]: string|null|object
}


// Body types
type RequestBody = {
  [key: string]: any
}

// type request cache
type RequestCache = "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached" | undefined

// type request mode
type RequestMode = "cors" | "no-cors" | "same-origin" | "navigate"

// type request integrity
type RequestIntegrity = string | undefined

// type request credentials
type RequestCredentials = "omit" | "same-origin" | "include"

// type referral
type RequestReferral = "follow" | "error" | "manual" | undefined

// type referral policy
type RequestReferralPolicy = "" | "same-origin" | "no-referrer" | "no-referrer-when-downgrade"
    | "origin" | "strict-origin" | "origin-when-cross-origin"
    | "strict-origin-when-cross-origin" | "unsafe-url" | undefined

// type redirect
type RequestRedirect = "follow" | "error" | "manual" | undefined

// type keep alive
type RequestKeepAlive = boolean | undefined

// Request Query Parameters
type RequestQueryParams = {
  [key: string]: any
}

// Required request params.
type RequestParams = {
  uri: string
  method?: string
  headers?: RequestHeaders|undefined
  body?: RequestBody|undefined
  params?: RequestQueryParams|undefined
  cache?: RequestCache
  mode?: RequestMode
  integrity?: RequestIntegrity
  credentials?: RequestCredentials,
  referral?: RequestReferral,
  redirect?: RequestRedirect,
  referralPolicy?: RequestReferralPolicy,
  keepAlive?: RequestKeepAlive
}

// Required response payload.
type ResponseParams = {
  statusCode: number|undefined
  payload: any
  loading: boolean
}|any


// default response
const defaultResponseParams: ResponseParams = {
  statusCode: null,
  payload: null,
  loading: false
}

// reducer function handling response and loading state.
const responseReducer = (state: ResponseParams, action: ResponseParams) => {

  switch (action.type) {
    case "loading":
      state = {loading: action.loading}
      return state
    case "done":
      state = {statusCode: action.statusCode, loading: action.loading, payload: action.payload}
      return state
    default:
      return state
  }
}

// HTTP hook handling http requests.
export default function useRequestFetch(
    staticURI?: string,
    staticMethod?: string,
    staticHeaders?: RequestHeaders|undefined,
    staticBody?: RequestBody[]|undefined,
    staticParams?: RequestQueryParams[]|undefined,
    staticCache?: RequestCache,
    staticMode?: RequestMode,
    staticIntegrity?: RequestIntegrity,
    staticCredentials?: RequestCredentials,
    staticReferral?: RequestReferral,
    staticRedirect?: RequestRedirect,
    staticReferralPolicy?: RequestReferralPolicy,
    staticKeepAlive?: RequestKeepAlive
){

  const [requestParams, setRequestParams] = useState<RequestParams>({uri: ""});
  const [ response, dispatch] = useReducer(responseReducer, defaultResponseParams)

  useEffect(() => {


        const condition = (staticURI && staticURI !== "")
            || (requestParams.uri !== undefined
                && requestParams.uri !== null
                && requestParams.uri !== "")

        // If static uri is provided only the get request will be performed
        // This can be useful, if the application is expected to load data from
        // the backend on DOM first load. for example account information or credentials

        if (condition) {

          dispatch({type: "loading", loading: true})

          try {
            request(
                requestParams.uri? requestParams.uri: String(staticURI),
                requestParams.method ? requestParams.method: staticMethod,
                requestParams.headers ? requestParams.headers: staticHeaders,
                requestParams.body ? requestParams.body: staticBody,
                requestParams.params ? requestParams.params: staticParams,
                requestParams.cache ? requestParams.cache: staticCache,
                requestParams.mode ? requestParams.mode: staticMode,
                requestParams.integrity ? requestParams.integrity: staticIntegrity,
                requestParams.credentials ? requestParams.credentials: staticCredentials,
                requestParams.referral ? requestParams.referral: staticReferral,
                requestParams.redirect ? requestParams.redirect: staticRedirect,
                requestParams.referralPolicy ? requestParams.referralPolicy: staticReferralPolicy,
                requestParams.keepAlive ? requestParams.keepAlive: staticKeepAlive)
                .then(data => dispatch({
                  type: "done",
                  statusCode: data[0],
                  payload: data[1],
                  loading: false
                }))
          } catch (e) {
            return dispatch({
              type: "done",
              statusCode: 500,
              payload: String(e),
              loading: false
            })
          }
        }

      }, // eslint-disable-next-line
      [ requestParams, staticURI ])

  // example:: GET::Request Data, https://example.com::Request Data, payload::Response Data , state::Response Data
  return [response, setRequestParams]
}
