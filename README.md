# IntegrAuth Interview Task - Senior Software Developer Role

## Installation Steps

1. git clone https://github.com/abedeen/IntegrAuth.git
2. cd IntegrAuth
3. ./assignment.sh

## assignment.sh is a shell script that runs a node script periodically based on user input

1. The call_api.js script calls an API that the user provides as an input to the shell script

2. It to call it 3 times with an exponential backoff of initial delay 1 second and max delay 3 seconds which uses the same connection for all the requests

3. Each run save the request, response metadata in the below format in a json file formatted like "response-epoch-timestamp.json" in logs directory in the project root

    ```json
    [
      {
        "timestamp": "...", // epoch timestamp
        "request": {
          "method": "...", // GET, POST, PUT, DELETE
          "protocol": "...", // http, https
          "httpVersion": "...", // 1.0, 1.1, 2.0
          "host": "...", // hostname
          "port": "...", // port
          "pathWithQuery": "...", // path with query string
          "headers": {...}, // key:base64(value) pairs
          "length": "...", // calculated length of the raw request body
          "body": "...", // base64 encoded
        },
        "response": {
          "status": "...", // http status code
          "headers": {...}, // key:base64(value) pairs
          "length": "...", // calculated length of the raw response body
          "body": "...", // base64 encoded
        }
      }
    ]
    ```

4. The shell takes the following inputs from the user
    - API URL
    - HTTP Method
    - HTTP Version
    - Headers (key:value pairs)
      - You need to ask for each pair separately and the user can say "Done" to stop
    - Body (string)
    - Frequency (in human readable format like 1m, 1h, 1d, 1w, 1M, 1y)

5. The shell script runs the node script periodically based on the frequency provided by the user

6. A single curl command is used to run the shell script and install all the dependencies and run the script in the user's machine

7. It do not assume that the user has node.js or other dependencies installed

8. Developed with best practices in mind, written clean, maintainable code, non-repetitive code with readability in mind

9. This is the README.md file with instructions on how to run the script with the usage, expected output, and any other information that you think is necessary

Thank you for providing a chance 🚀
