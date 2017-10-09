#!/usr/bin/env bash

mkdir -p android/app/src/main/assets/cheatsheets
rm -rf android/app/src/main/assets/cheatsheets/*
cp -a src/cheatsheets android/app/src/main/assets/

mkdir -p ios/assets
rm -rf ios/assets/*
cp -a src/cheatsheets ios/assets/cheatsheets
