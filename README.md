# React Request Fetch Hook
The given dependency, <b>[react-requests-fetch]</b> is a  <a href="https://reactjs.org/">ReactJS</a> target library for handling http fetch requests considering bia-directional stateless and stateful data extraction.
The same logic and parameters used when performing http requests using the fetch api are kept, with the difference
in flexibility as to how data is retrieved. Data can be retrieved from any given source (<b>api: precisely</b>), either by initializing this hook when the component 
renders or is to render with statics variables, or dynamic variables within the source code, the same way as the <a href="https://reactjs.org/docs/hooks-state.html">react's use state hook</a> is expected to be called. 

<img alt="react" height="100" width="100" src="https://mildaintrainings.com/wp-content/uploads/2017/11/react-logo.png"/>
<img alt="fetch" height="100" width="100" src="https://www.freecodecamp.org/news/content/images/2020/08/wall-2.jpeg"/><hr/>

<h2>Installation</h2>
<p><code>npm i react-requests-fetch</code></p>
<p><code>yarn add react-requests-fetch</code></p>

<h2>Note: IMPORTANT</h2>
<p>
Keep in mind this hook is two dimensional meaning it can
compute automatically, with initial values or it can be computed dynamically with state values. Priority is given
to the dynamic url therefore be aware when initiating the urls. Just like the local react hooks, the react-requests-fetch hook
is called with two variable, the first being the response variable, and the second being the request variable. The first variable,
handles response data and the second variable handles request data. Additionally, the parameter <b>expectedResponseType</b>, has been included to determine the type of response to be expected.
from response payload. For text use <b>text</b>, for json use <b>json</b>. if left unassigned the default result expected shall be json format.
The expectedResponseType targets the primitives <b>response.json()</b> or <b>response.text()</b>.
</p>

<h5>Example: Implementation</h5>

```
import useRequestFetch from "react-requests-fetch";

const [response, setRequest] = useRequestFetch({
   uri: "https://restcountries.eu/rest/v2/all"
});

<button onClick={() => {
    setRequest({
        uri: "https://restcountries.eu/rest/v2/alpha/col"
    })
}}>Fetch Data</button>

<p>{response.loading && "Fetching..."}</p>
<pre>{JSON.stringify(response, null, 2)}</pre>
```

<p><b>Expected payload</b></p>

```
{
    "statusCode": 200,
    "loading": false,
    "payload": []
}
```

<p><b>Expected params</b></p>
<p>Thesame, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Request/Request">parameters expected</a> in the fetch api are thesame parameters to be implemented with this hook.</p>

<table>
    <thead>
        <tr>
            <td>Param</td>
            <td>Description</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><b>method</b></td>
            <td>The request method, e.g., GET, POST. The default is GET</td>
        </tr>        
        <tr>
            <td><b>headers</b></td>
            <td> Any headers you want to add to your request, contained within a Headers object or an object literal with ByteString values.</td>
        </tr>        
        <tr>
            <td><b>body</b></td>
            <td>Any body that you want to add to your request: this can be a Blob, BufferSource, FormData, URLSearchParams, USVString, or ReadableStream object. Note that a request using the GET or HEAD method cannot have a body.</td>
        </tr>        
        <tr>
            <td><b>mode</b></td>
            <td>The mode you want to use for the request, e.g., cors, no-cors, same-origin, or navigate. The default is cors.</td>
        </tr>        
        <tr>
            <td><b>credentials</b></td>
            <td>The request credentials you want to use for the request: omit, same-origin, or include. The default is same-origin.</td>
        </tr>        
        <tr>
            <td><b>cache</b></td>
            <td>The cache mode you want to use for the request.</td>
        </tr>        
        <tr>
            <td><b>redirect</b></td>
            <td>The redirect mode to use: follow, error, or manual. The default is follow</td>
        </tr>        
        <tr>
            <td><b>referrer</b></td>
            <td>A USVString specifying no-referrer, client, or a URL. The default is about:client</td>
        </tr>        
        <tr>
            <td><b>integrity</b></td>
            <td>Contains the subresource integrity value of the request (e.g., sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=)</td>
        </tr>         
    </tbody>
</table>

<br/>
<p><b>NOTE</b></p>
<p>
The above table is a replica content from https://developer.mozilla.org/en-US/docs/Web/API/Request/Request.
The Official site for fetch api in case any further information, please consult the site and get accurate variables required where needed.
</p>

<p><b>Github</b>&nbsp;<a href="https://github.com/mbugerald/react-requests-fetch">https://github.com/mbugerald/react-requests-fetch</a> </p>
