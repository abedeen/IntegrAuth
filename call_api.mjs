// Read input from shellscript

/*const method = process.argv[2];
const httpVersion = process.argv[3];
const headerData = JSON.parse(process.env.HEADER_DATA);
const bodyData = process.env.BODY_DATA;
const apiURL = process.env.API_URL;
*/
import { fetch } from 'undici';
import { Buffer } from 'buffer';
const method = "GET";
const httpVersion = "1.0";
const headerData = {"a":"a", "b":"b"};
const bodyData = "";
const apiURL = "http://127.0.0.1:8000";

const httpVersionDict={"1.0":"http1.1", "1.1":"http1.1", "2.0":"http2"}
const options = {
  method: method
};
async function makeApiCallWithRetry( ) {
  const maxRetries = 3;
  const initialDelay = 1000;
  const maxDelay = 3000
  let allResponse=[]
  
  for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
    let now = null;
    let gerror=null;
    let gresponse=null;
    try {      
     now = Date.now();
     
const res = await fetch(apiURL)
const json = await res
console.log(json)
      gresponse=res;
    } catch (error) {      
      gerror=error      
    }
    allResponse.push(formatResponse(gresponse,gerror,now));
    const delay = Math.min(Math.pow(2, retryCount) * initialDelay, maxDelay);      
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}
function formatResponse(res,error,n){
const urlObj = parseUrl(apiURL)
let requestData={
    "timestamp": n,
    "request": {
      "method": method,
      "protocol": urlObj.protocol,
      "httpVersion": httpVersion,
      "host": urlObj.host,
      "port": urlObj.port,
      "pathWithQuery": urlObj.path,
      "headers": encodeHeader(headerData),
      "length": bodyData.length,
      "body": base64Encode(bodyData),
    },
    "response": {
      "status": null, 
      "headers": null,
      "length": null, 
      "body": null, 
    }
  }
  console.log("ok");
  if(res!=null){
  console.log("ok");
  }

}
function parseUrl(url) {
  const urlObj = new URL(url);

  return {
    protocol: urlObj.protocol.replace(':', ''),
    host: urlObj.hostname,
    port: (urlObj.port==''?'80':urlObj.port),
    path: urlObj.pathname + urlObj.search
  };
}


function base64Encode(string) {
  const buffer = Buffer.from(string, 'utf-8');
  const base64String = buffer.toString('base64');
  return base64String;
}
function encodeHeader(jsonObject){
for (const key in jsonObject)
  jsonObject[key]= base64Encode(jsonObject[key]+'');
return jsonObject;
}
makeApiCallWithRetry()