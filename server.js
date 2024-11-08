const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8000;
const axios = require('axios');
const data = fs.readFileSync('log.json', 'utf-8');
const logData = JSON.parse(data);

app.get('/', async (req, res) => {
    console.log('logData', logData)
    for (let index = 0; index < 100; index++) {
        const logStream = {
            stream: {
                service: logData['service'],
                user: logData['user'],
                sub_component: logData['sub_component'],
                action: logData['action'],
                application_type: logData['application_type'],
                privilege: logData['privilege'],
                type: logData['type'],
                module: logData['module'],
                ip: logData['ip'],
                name: logData['name'],
                username: logData['username'],
                component: logData['component'],
            },
            values: [
                [
                    `${Date.now() * 1_000_000}`,
                    JSON.stringify(logData)
                ]
            ]
        };
        await axios.post('http://localhost:2100/loki/api/v1/push', logStream)
            .then(response => {
                console.log('Data:', response);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
