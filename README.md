# Git File Stats

[![Build Status](https://travis-ci.com/krmax44/git-fstat.svg?branch=master)](https://travis-ci.com/krmax44/git-fstat)
[![install size](https://packagephobia.now.sh/badge?p=git-fstat)](https://packagephobia.now.sh/result?p=git-fstat)
[![npm version](https://img.shields.io/npm/v/git-fstat)](https://www.npmjs.com/package/git-fstat)

Stats about a given file using `git log`.

## Installation

```bash
yarn add git-fstat
# or with npm
npm i git-fstat
```

## Usage

Very simple.

```js
import gitFstat from 'git-fstat';

const stats = await gitFstat('My file.txt');
console.log(stats);

/*
  {
    createdAt: Date,
    modifiedAt: Date,
    changes: number
  }
*/
```
