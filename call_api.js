// Read input from shellscript

const method = process.argv[2];
const httpVersion = process.argv[3];
const headerData = JSON.parse(process.env.HEADER_DATA);
const bodyData = process.env.BODY_DATA;
const apiURL = process.env.API_URL;


function parseUrl(url) {
  const urlObj = new URL(url);

  return {
    protocol: urlObj.protocol.replace(':', ''),
    host: urlObj.hostname,
    port: (urlObj.port==''?'80':urlObj.port),
    path: urlObj.pathname + urlObj.search
  };
}
const Buffer = require('buffer').Buffer;

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
urlObj = parseUrl(apiURL)
requestData={
    "timestamp": null,
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
      "status": null, // http status code
      "headers": null, // key:base64(value) pairs
      "length": null, // calculated length of the raw response body
      "body": null, // base64 encoded
    }
  }
console.log(requestData)