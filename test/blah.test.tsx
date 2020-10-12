import * as React from 'react';
import {useEffect, useState} from 'react';
import "@testing-library/jest-dom/extended-expect";
import useRequestFetch from "../src";

const App = () => {

  const [response, request] = useRequestFetch()
  const [resp, setResp] = useState<any>(null)

  useEffect(() => {
    request("https://restcountries.eu/rest/v2/all")
    setResp(response)
  }, [])

  return resp

}

describe('it', () => {
  it('renders without crashing', () => {
  });
});
