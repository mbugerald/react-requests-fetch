import * as React from 'react';
import {useEffect, useState} from 'react';
import "@testing-library/jest-dom/extend-expect";
import useRequestFetch from "../src";
import {render, waitFor} from "@testing-library/react";

const App = () => {

  const [response, request] = useRequestFetch()
  const [resp, setResp] = useState<any>(null)

  useEffect(() => {
    request("https://restcountries.eu/rest/v2/all")
    setResp(response)
  }, [])

  if (resp && Object.keys(resp).length > 0) {
    return <div>yes</div>
  }

  return null

}

describe('it', () => {
  it('pulls data', async () => {
    const { getByText } = render(<App/>);
    const yesNode = await waitFor(() => getByText("yes"));
    expect(yesNode).toBeInTheDocument();
  });
});
