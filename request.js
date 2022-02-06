'use strict'

const autocannon = require('autocannon')
const fs = require('fs')
let CDNRequest = JSON.parse(fs.readFileSync('request.json', 'utf-8'))
//let CDNRequest = ""
console.log(JSON.stringify(CDNRequest));

// 1K requests warm up
autocannon({
    title: 'CDNRequest Warmup',
    url: 'http://localhost:7878',
    connections: 1, //default
    pipelining: 1, // default
    amount: 10, // 15K requests
    requests: [
        {

            method: 'GET', // this should be a put for modifying secret details
            path: '/',
            headers: { // let submit some json?
                'Content-type': 'application/json; charset=utf-8'
            },
            // we need to stringify the json first
            body: JSON.stringify(CDNRequest),
        }
    ],
})

// 15K requests experiment
const instance = autocannon({
    title: 'CDNRequest',
    url: 'http://localhost:7878',
    connections: 1, //default
    pipelining: 1, // default
    amount: 100, // 15K requests
    requests: [
        {
            method: 'GET', // this should be a put for modifying secret details
            path: '/',
            headers: { // let submit some json?
                'Content-type': 'application/json; charset=utf-8'
            },
            // we need to stringify the json first
            body: JSON.stringify(CDNRequest),
        }
    ],
})

autocannon.track(instance, { renderLatencyTable: true })

