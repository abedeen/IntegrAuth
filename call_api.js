const method = process.argv[2];
const httpVersion = process.argv[3];
const headerData = process.env.HEADER_DATA;
const bodyData = process.env.BODY_DATA;
const apiURL = process.env.API_URL;
console.log(method); // Output: arg1
console.log(httpVersion); // Output: arg2
console.log(headerData); // Output: arg2
console.log(bodyData); // Output: arg2
console.log(apiURL); // Output: arg2