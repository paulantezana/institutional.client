import React from "react";
import {notification, Tag} from 'antd';
import { push } from 'connected-react-router';

import * as types from '../constants'
import request from '../../helpers/request';

export const getLogin = () => ({
    type: types.FETCH_LOGIN_REQUEST,
})

export const getLoginSuccess = data =>({
    type: types.FETCH_LOGIN_SUCCESS,
    data
})

export const getLoginFailure = ()=>({
    type: types.FETCH_LOGIN_FAILURE
})

export const fetchLogin = values =>{         
    return dispatch => {
        // Init fetching
        dispatch(getLogin());

        // Request server
        request('/login', {
            method: 'POST',
            body: values
        })
            .then(data => {
                if(data.success){
                    dispatch(getLoginSuccess(data));
                    localStorage.setItem('lykp',data.data.token);
                    dispatch(push('/'));
                }else{
                    notification.error({
                        message: "Iniciar sesión",
                        description: data.errors.map((error,key)=>(
                            <Tag key={key} color="red">{error}</Tag>
                        ))
                    })
                    dispatch(getLoginFailure());
                }
            })
            .catch(err=>{
                dispatch(getLoginFailure())
            })
    }
}

export const reloadLogin = () => {
    return dispatch => {
        dispatch(getLogin());
        const data = {
            data: {
                token: localStorage.getItem('lykp')
            },
            success: true,
            errors: null
        }
        dispatch(getLoginSuccess(data));
    }
}