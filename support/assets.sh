#!/usr/bin/env bash

mkdir -p android/app/src/main/assets
rm -rf android/app/src/main/assets/*.pdf
cp src/cheatsheets/pinout/*.pdf android/app/src/main/assets/
cp src/cheatsheets/programming/*.pdf android/app/src/main/assets/

mkdir -p ios/assets
rm -rf ios/assets/*.pdf
cp src/cheatsheets/pinout/*.pdf ios/assets/
cp src/cheatsheets/programming/*.pdf ios/assets/
