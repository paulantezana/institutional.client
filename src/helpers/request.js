import { notification } from 'antd';
import { push } from 'connected-react-router'
import store from '../index';
import config from './config';

const codeMessage = {    
    200: 'El servidor devolvió con éxito los datos solicitados. ',
    201: 'Datos nuevos o modificados son exitosos. ',
    202: 'Una solicitud ha ingresado a la cola de fondo (tarea asíncrona). ',
    204: 'Eliminar datos con éxito. ',
    400: 'La solicitud se envió con un error. El servidor no realizó ninguna operación para crear o modificar datos. ',
    401: 'El usuario no tiene permiso (token, nombre de usuario, contraseña es incorrecta). ',
    403: 'El usuario está autorizado, pero el acceso está prohibido. ',
    404: 'La solicitud se realizó a un registro que no existe y el servidor no funcionó. ',
    406: 'El formato de la solicitud no está disponible. ',
    410: 'El recurso solicitado se elimina permanentemente y no se obtendrá de nuevo. ',
    422: 'Al crear un objeto, se produjo un error de validación. ',
    500: 'El servidor tiene un error, por favor revise el servidor. ',
    502: 'Error de puerta de enlace. ',
    503: 'El servicio no está disponible, el servidor está temporalmente sobrecargado o mantenido. ',
    504: 'La puerta de enlace agotó el tiempo. ',
};

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    notification.error({
        message: `Error de solicitud ${response.status}: ${response.url}`,
        description: errortext,
    });
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
}

export default (path, options)=>{
    const defaultOptions = {
        // credentials: 'include',
    };

    const newOptions = { ...defaultOptions, ...options };
    if ( newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE'){
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                ...newOptions.headers,
            };
            newOptions.body = JSON.stringify(newOptions.body);
        } else {
            // newOptions.body is FormData
            newOptions.headers = {
                Accept: 'application/json',
                ...newOptions.headers,
            };
        }
    }

    const url = config.API_PATH + path;

    return fetch(url, newOptions)
        .then(checkStatus)
        .then(response => {
            if (newOptions.method === 'DELETE' || response.status === 204) {
                return response.text();
            }
            return response.json();
        })
        .catch(e => {
            const { dispatch } = store;
            const status = e.name;
            if (status === 401){
                dispatch({
                    type: 'login/logout'
                });
                return;
            }else if (status === 403){
                dispatch(push('/user/exception/403'));
                return;
            }else if (status <= 504 && status >= 500) {
                dispatch(push('/user/exception/500'));
                return;
            }else if (status >= 404 && status < 422){
                dispatch(push('/user/exception/404'));
                return;
            }else{
                dispatch(push('/user/exception/404'));
            }
        })
}