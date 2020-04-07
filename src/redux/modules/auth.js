/**
 * @author {[Monty Khanna]}
 */
import Immutable from 'immutable';
import store from 'store2';
import { push } from 'react-router-redux';
import * as auth from './constants';

const initialState = Immutable.fromJS({
    isLoad: false,
    loadErr: null,
    isLogin: false,
    loginErr: null,
    user: null,
    loading: false
});

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case auth.LOAD:
            return state
                .set('isLoad', true)
                .set('loadErr', null);

        case auth.LOAD_SUCCESS:
            return state
                .set('isLoad', false)
                .set('user', action.user);

        case auth.LOAD_FAIL:
            return state
                .set('isLoad', false)
                .set('loadErr', action.error)
                .set('user', {});

        case auth.LOGIN:
            return state
                .set('isLogin', true)
                .set('loginErr', null);

        case auth.LOGIN_SUCCESS:
            return state
                .set('isLogin', false);

        case auth.LOGIN_FAIL:
            return state
                .set('isLogin', false)
                .set('loginErr', action.error)
                .set('user', null);

        case auth.LOGOUT:
        case auth.FLUSH: {
            return initialState;
        }

        default:
            return state;
    }
};

export const load = (forced) => async (dispatch, getState, api) => {
    // dont call api if user data is in state
    const user = getState().get('auth').get('user');
    if (user && !forced) {
        console.log('without Forced ===== ', user);
        return;
    }
    dispatch({ type: auth.LOAD });
    try {
        const res = await api.get('/v1/session');
        console.log('Forced ===== ', res);
        if (res.message) {
            dispatch({ type: auth.LOAD_FAIL, error: res.message });
            return;
        }
        dispatch({ type: auth.LOAD_SUCCESS, user: res });
        return res;
    } catch (error) {
        dispatch({ type: auth.LOAD_FAIL, error: error });
    }
};

export const login = (data) => async (dispatch, getState, api) => {
    dispatch({ type: auth.LOGIN });
    try {
        console.log('before calling api --- ', data);
        const res = await api.post('/v1/session', { data } );
        console.log('after calling api --- ', res);
        const { token } = res;
        store('authToken', token);

        dispatch({ type: auth.LOGIN_SUCCESS });
        dispatch(load(true));
        dispatch(push('/'));
        return res;
    } catch (err) {
        dispatch({ type: auth.LOGIN_FAIL, error: err.message });
    }
};

export const logout = () => (dispatch, getState, api) => {
    store.remove('authToken');
    dispatch({ type: auth.LOGOUT });
    dispatch({ type: 'FLUSH' });
    dispatch(push('/'));
};
