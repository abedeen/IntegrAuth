#!/bin/bash
function convert_to_seconds() {
  local input="$1"
  local unit="${input//[0-9]/}"
  local value="${input//[a-zA-Z]/}"

  case "$unit" in
    "s" | "sec" | "second" | "seconds")
      seconds=$((value * 1))
      ;;
    "m" | "min" | "minute" | "minutes")
      seconds=$((value * 60))
      ;;
    "h" | "hr" | "hour" | "hours")
      seconds=$((value * 3600))
      ;;
    "d" | "day" | "days")
      seconds=$((value * 86400))
      ;;
    "w" | "wk" | "week" | "weeks")
      seconds=$((value * 604800))
      ;;
    "M" | "mon" | "month" | "months")
      # Assuming 30 days per month for simplicity
      seconds=$((value * 2592000))
      ;;
    "y" | "yr" | "year" | "years")
      # Assuming 365 days per year for simplicity
      seconds=$((value * 31536000))
      ;;
    *)
      echo "Invalid unit: $unit"
      return 1
      ;;
  esac

  echo "$seconds"
}

# Check installed commands
function install_command() {
  local isinstalled=$(checkCommand "$2" "$3")
  if [ "$isinstalled" -eq 0 ]; then
    eval "$4"
    #post installation
   local check_post_installed=$(checkCommand "$2" "$3")
  if [ "$check_post_installed" -eq 0 ]; then
    echo "$1 is not installed. Exiting the system"
    exit 1    
  fi
  fi
}

function osCommand(){
if command $1 -v  &> /dev/null; then
    echo 1
else
    echo 0
fi
}


function d(){
local output=
if [[ -n "$output" ]]; then
return 1
else
return 0
fi
}

# Read input from user
get_user_input() {
  local prompt="$1"
  read -p "$prompt: " input
  echo $input
}
function checkCommand(){
command="$1"
# Execute the command and store the output
output=$(eval "$command")

 if [ -n "$output" ]; then
return 0
fi
return 1
}

# check nodejs
isNode=$(osCommand "node")
  if [ "$isNode" -eq 0 ]; then
     # Use curl to download the Node.js installation script
    curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -

    # Install Node.js and npm
    sudo apt-get install -y nodejs
  else 
  echo "nodejs is installed"  
fi

# check npm
isNode=$(osCommand "npm")
  if [ "$isNode" -eq 0 ]; then
    sudo apt-get install -y npm
  else 
  echo "npm is installed"  
fi

# check undici
#install_command "undici" "npm list undici" "undici" "npm install undici"

checkCommand "npm list undici |grep undici@"
if [ $? -eq 0 ]; then
  echo "undici found"
else
  echo "undici not found, installing"
  npm install undici
fi

#input
api_url=$(get_user_input "API URL")
method=$(get_user_input "HTTP Method (GET, POST, PUT, DELETE)")
http_version=$(get_user_input "HTTP Version (1.0, 1.1, 2.0)")
headers=""
while true; do
  keyInp=$(get_user_input "Headers (key:value pairs) or 'Done' to finish")
  if [ "$keyInp" == "Done" ]; then
    break
  fi
  # Using read command with IFS
  IFS=":" read -r key value <<< "$keyInp"
  headers+="\"$key\": \"$(base64 <<< "$value")\""","
done
headers=${headers%?}  # Remove trailing comma
body=""
case "$method" in
  "POST"|"PUT")
    # Code to execute if method is POST or PUT
    $body=$(get_user_input "Body (string)")
    ;;
  *)
    ;;
esac

# input from user for frequency
frequency=$(get_user_input "Frequency (e.g. 1m, 1h, 1d, 1w, 1M, 1y)")

# Convert frequency to seconds
seconds=$(convert_to_seconds "$frequency")

while true; do
  echo "node api_caller.js $api_url $method $http_version $headers $body"
  sleep $seconds
done




