#!/bin/bash

while true; do
  while IFS= read -r line; do
    IFS=" " read -r -a deployments <<< "${line}";
    name="${deployments[1]}";
    available="${deployments[4]}";
  done <<< "$(kubectl get deployment --all-namespaces)"
  if [[ $name == $1 && $available -eq $2 ]]; then
    break;
  else
    printf ".";
    sleep 2s;
  fi
done

printf "\n\nDone!\n\n";
