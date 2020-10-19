import * as React from 'react';
import {useEffect, useState} from 'react';
import "@testing-library/jest-dom/extend-expect";
import useRequestFetch from "../src";
import {render, waitFor} from "@testing-library/react";
import fetchMock from "fetch-mock";

const App = () => {

  const {requestResponse, setRequest} = useRequestFetch()
  const [resp, setResp] = useState<any>(null)

  useEffect(() => {
    setRequest({
      uri: "https://restcountries.eu/rest/v2/all"
    })
    setResp(requestResponse)
  }, [])

  if (resp && Object.keys(resp).length > 0) {
    return <div>yes</div>
  }

  return null

}


describe('it', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  fetchMock.mock('https://restcountries.eu/rest/v2/all', {
    body: [{name: "pulls data"}],
    status: 200
  });
  it("pulls data", async () => {
    const { getByText } = render(<App/>);
    const yesNode = await waitFor(() => getByText("yes"));
    expect(yesNode).toBeInTheDocument();
  });
});
