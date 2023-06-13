#!/bin/sh

set -x
set -eE

index=0
scheme=""
url=""
for i in $(echo $BACKEND_BASE_URL | tr "://" "\n")
do
    index=$((index + 1))
    if [ $index == 1 ]; then
        scheme=$i
    else
        url=$i
    fi
done

check_str="\"production\""
change_str="backendUrl\:\"$scheme\:\\\u002F\\\u002F$url\"\,backendPort\:\"$BACKEND_BASE_PORT\""
change_str2="\"backendUrl\"\:\"$scheme\:\/\/$url\"\,\"backendPort\"\:\"$BACKEND_BASE_PORT\""

public_list=$(grep -l -r -i "$check_str" public)
server_list=$(grep -l -r -i "$check_str" server)

for i in $public_list
do
    sed -i -e "s/\($check_str\).*\(version\)/\1\,$change_str\,\2/" $i
done

for i in $server_list
do
    sed -i -e "s/\(\(NUXT_\).*\($check_str\)\).*\(\(\"version\).*\(public\)\)/\1\,$change_str2\,\4/" $i
    sed -i -e "s/\(\(public\).*\($check_str\)\).*\(\"version\)/\1\,$change_str2\,\4/" $i
done

dumb-init node ./server/index.mjs