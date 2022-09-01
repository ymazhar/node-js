async function mockedRequestHandler(handler, data) {
    const req = {
        ...data
    };

    let sendRes;
    let resStatus;
    let resJson;
    const res = {
        status: (val) => {
            resStatus = val;
            return res;
        },
        json: (val) => {
            resJson = val;
            sendRes({ json: resJson, status: resStatus });
            return res;
        }
    };

    const promise = new Promise((resolve) => {
        sendRes = resolve;
    });

    handler(req, res, (err) => {
        sendRes({ error: err, status: err.statusCode || 500 });
    });

    return promise;
}

export {
    mockedRequestHandler
};
