import { Portal } from './Portal';
import * as Settings from './Settings';
import axios from 'axios';

export class API {
    static readonly URL = Settings.URL + '/api/' + Settings.VERSION;

    static list(model: string): Promise<any> {
        return new Promise((resolve, reject) => {
           API.request({
                   'params': {
                       'm': model
                   }
               })
               .then((response) => {
                   resolve(response);
               })
               .catch((error) => {
                   reject(error);
               });
        });
    }

    static view(model: string, id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            API.request({
                    'params': {
                        'm': model,
                        'id': id
                    }
                })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static add(model: string, data: JSON): Promise<any> {
        return new Promise((resolve, reject) => {
            API.request({
                    'params': {
                        'm': model,
                        'a': 'add'
                    },
                    'data': data
                })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static edit(model: string, id: string, data: JSON): Promise<any> {
        return new Promise((resolve, reject) => {
            API.request({
                    'params': {
                        'm': model,
                        'a': 'add',
                        'id': id
                    },
                    'data': data
                })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static delete(model: string, id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            API.request({
                'params': {
                    'm': model,
                    'a': 'delete',
                    'id': id
                }
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static form(model: string): Promise<any> {
        return new Promise((resolve, reject) => {
            API.request({
                'params': {
                    'm': model,
                    'a': 'form'
                }
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static request(query: RequestData): Promise<any> {
        return new Promise((resolve, reject) => {
            if (Portal.DEBUG) {
                console.log(query);
            }

            query.type = (query.hasOwnProperty('type') && query.type != undefined)
                ? query.type
                : 'POST';

            if (query.type.toLowerCase() == 'post') {
                axios.post(API.url(query.params), query.data)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error)
                    })
            }
        });
    }

    private static url(params: UrlParams): string {
        const keys = Object.keys(params);

        let url: string = API.URL + "?";

        for (let key of keys) {
            // @ts-ignore
            url += key + "=" + params[key];
        }

        return url;
    }
}

interface UrlParams {
    m   :   string;
    a?  :   string;
    id? :   string;
}

interface RequestData {
    params      :   UrlParams;
    type?       :   string;
    data?       :   JSON;
}