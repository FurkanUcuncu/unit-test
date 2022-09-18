const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
}

const url = "http://localhost:3004/"

const post = async (params) => {
    fetch(url + params.url,{
        method:params.method,
        body:JSON.stringify(params.body),
        headers
    }).then(response=>response.json()).then(data=>console.log(data))
}

const get = async (params) => {
    return(
        await fetch(url + params.url).then(response=>response.json()).then(data=> {
            return data
        })
    )
}

const remove = async (params) => {
    return(
        await fetch(url + params.url,{
            method:params.method,
            headers
        }).then(response=>response.json()).then(data=> {
            return data
        })
    )
}

export const api = {post,get,remove}


