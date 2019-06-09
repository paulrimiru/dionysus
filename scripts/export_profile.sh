#!/usr/bin/env bash

if [ ! -z "$1" ]; then
    PROFILE=${1}
    echo "Exporting profile \"${PROFILE}\""
    export AWS_ACCESS_KEY_ID="$(aws configure get aws_access_key_id --profile ${PROFILE})"
    export AWS_SECRET_ACCESS_KEY="$(aws configure get aws_secret_access_key --profile ${PROFILE})"
    export AWS_DEFAULT_REGION="$(aws configure get aws_default_region --profile ${PROFILE})"
else
    echo "Exporting default profile"
    export AWS_ACCESS_KEY_ID="$(aws configure get aws_access_key_id)"
    export AWS_SECRET_ACCESS_KEY="$(aws configure get aws_secret_access_key)"
    export AWS_DEFAULT_REGION="$(aws configure get aws_default_region)"
fi