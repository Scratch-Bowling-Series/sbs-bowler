

const base_url = 'http://10.0.0.211:8000';

export const apiGet = async (url, token) => {
    try{
        let response = await fetch(base_url + url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
                credentials: 'include',
            }
        });
        return await response.json();
    }catch(errors){
        console.log(errors);
    }
}

export const apiPost = async (url, formData, token=null) => {
    let headers;
    if(token){
        headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Token ' + token,
            credentials: 'include',
        }
    }
    else{
        headers = {
            'Content-Type': 'multipart/form-data',
        }
    }


    try{
        let response = await fetch(base_url + url, {
            method: 'POST',
            headers: headers,
            body: formData
        });
        return await response.json();
    }catch(errors){
        console.log(errors);
    }
}

export const apiUserData = async (token) => {
    const jsonData = await apiGet('/api/user/data/', token);
    return jsonData ? jsonData[0] : null;
}
