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
import React, {useEffect, useReducer, useState} from "react";
// Handle request base on provided parameters from the consumer.
const request = async (
    url: string,
    method?: string,
    headers?: RequestHeaders,
    body?: RequestBody,
    params?: RequestQueryParams,
    cache?: RequestCache,
    mode?: RequestMode,
    integrity?: string,
    credentials?: RequestCredentials,
    referrer?: RequestReferral,
    redirect?: RequestRedirect,
    referrerPolicy?: RequestReferralPolicy,
    keepAlive?: RequestKeepAlive,
    expectedResponseType?: ExpectedResponseType
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
        method: "post",
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
      return requestStatus(req.status, await req, expectedResponseType)
    case "PUT" || "put":
      const reqPut = await fetch(url, {
        headers: reqHeaders,
        method: "put",
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
      return requestStatus(reqPut.status, await reqPut, expectedResponseType)
    case "DELETE" || "delete":
      const reqDelete = await fetch(url, {
        headers: reqHeaders,
        method: "post",
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
      return requestStatus(reqDelete.status, await reqDelete, expectedResponseType)
    case "PATCH" || "patch":
      const reqPatch = await fetch(url, {
        headers: reqHeaders,
        method: "patch",
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
      return requestStatus(reqPatch.status, await reqPatch, expectedResponseType)
    default:
      if (body) {
        const message = {"message": "GET requests cannot include the parameter body in its requests."}
        return [412, message]
      } else {
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
        return requestStatus(resp.status, resp, expectedResponseType)
      }
  }
}
// Check the request status and send out the right payload back.
const requestStatus = async (
    status: number,
    response: any |undefined,
    responseType?: ExpectedResponseType
) => {
  if(status >= 200 && status < 300) {
    if (status === 204) {return [status, null]}
    switch (responseType){
      case "json":return [status,await response.json()]
      case "text": return [status,await response.text()]
      default: return [status,await response.json()]
    }
  }
  switch (responseType){
    case "json":return [status,await response.json()]
    case "text": return [status,await response.text()]
    default: return [status,await response.json()]
  }
}
// Header types
type RequestHeaders = {[key: string]: string|null|object}
// Body types
type RequestBody = {[key: string]: any}
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
type RequestQueryParams = {[key: string]: any}
type ExpectedResponseType = "json" | "text"
// Required request params.
type RequestParams = {
  uri?: string
  method?: string
  headers?: RequestHeaders
  body?: RequestBody
  params?: RequestQueryParams
  cache?: RequestCache
  mode?: RequestMode
  integrity?: RequestIntegrity
  credentials?: RequestCredentials,
  referral?: RequestReferral,
  redirect?: RequestRedirect,
  referralPolicy?: RequestReferralPolicy,
  keepAlive?: RequestKeepAlive,
  expectedResponseType?: ExpectedResponseType
}
// Required response payload.
type ResponseParams = {statusCode: number|undefined,payload: any,loading: boolean}|any
// default response
const defaultResponseParams: ResponseParams = {statusCode: null,payload: null,loading: false}
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
// Request State interface ensure type-safe states in the hook.
interface RequestState {
  requestResponse: ResponseParams;
  setRequest: React.Dispatch<React.SetStateAction<RequestParams>>;
}
// HTTP hook handling http requests.
const useRequestFetch = (overrides?: Partial<RequestParams>): RequestState => {
  const defaultRequest:ResponseParams = {};
  const [params, setRequest] = useState<RequestParams>({
    ...defaultRequest,
    ...overrides
  });
  const [ requestResponse, dispatch] = useReducer(responseReducer, defaultResponseParams)
  useEffect(() => {
        // If static uri is provided only the get request will be performed
        // This can be useful, if the application is expected to load data from
        // the backend on DOM first load. for example account information or credentials
        if (params.uri) {
          dispatch({type: "loading", loading: true})
          try {
            request(
                params.uri,
                params.method,
                params.headers,
                params.body,
                params.params,
                params.cache,
                params.mode,
                params.integrity,
                params.credentials,
                params.referral,
                params.redirect,
                params.referralPolicy,
                params.keepAlive,
                params.expectedResponseType)
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
      },
      [
        params.body, params.cache, params.credentials,
        params.expectedResponseType, params.headers,
        params.integrity, params.keepAlive,
        params.method, params.mode, params.params,
        params.redirect, params.referral,
        params.referralPolicy, params.uri])
  return {requestResponse, setRequest}
}
export default useRequestFetch;
