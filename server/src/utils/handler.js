const errorHandler = (error) => {
    if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.statusText);
        return { error: true, errorStatus: error.response.status, errorMessage: error.response.statusText}
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return { error: true,  errorMessage: error.request.statusText}
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return { error: true,  errorMessage: error.message}
    }
}

const graphqlHandler = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response.data.graphql || response.data.data || response.data;
    } else {
        // throw error and go to catch block
        throw new Error(response.statusText);
    }
}

export {
    errorHandler,
    graphqlHandler
}
