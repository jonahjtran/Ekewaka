const run = require('./config/gemini');

async function test() {
    try {
        const response = await run("What's a good way to start saving money?");
        // The response will be logged by the run function
    } catch (error) {
        console.error('Test failed:', error);
    }
}

test(); 