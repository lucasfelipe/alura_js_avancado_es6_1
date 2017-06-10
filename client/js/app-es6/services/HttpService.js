export class HttpService {

    _handleErrors(res) {
        if (!res.ok) throw new Error(res.statusText);
        return res;
    }

    get(url) {
        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }



    post(url, data) {
        return fetch(url, {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify(data)
        }).then(res => this._handleErrors(res))
    }

    // post(url, data) {
    //     return new Promise((resolve, reject) => {
    //         let xhr = new XMLHttpRequest();
    //         xhr.open('POST', url);
    //         xhr.setRequestHeader('Content-type', 'application/json');
    //         xhr.onreadystatechange = () => {
    //             if (xhr.readyState == 4) {
    //                 if (xhr.status == 200) {
    //                     resolve(xhr.responseText);
    //                 } else {
    //                     reject(xhr.responseText);
    //                 }
    //             }
    //         };
    //         xhr.send(JSON.stringify(data));
    //     });
    // }

    /* 
          0: requisição ainda não iniciada
  
          1: conexão com o servidor estabelecida
  
          2: requisição recebida
  
          4: requisição concluída e a resposta esta pronta
      */

    // get(url) {
    //     return new Promise((resolve, reject) => {
    //         let xhr = new XMLHttpRequest();
    //         xhr.open('GET', url);
    //         xhr.onreadystatechange = () => {
    //             if (xhr.readyState == 4) {
    //                 if (xhr.status == 200) {
    //                     resolve(JSON.parse(xhr.responseText));
    //                 } else {
    //                     reject(xhr.responseText);
    //                 }
    //             }
    //         };
    //         xhr.send();
    //     });
    // }
}