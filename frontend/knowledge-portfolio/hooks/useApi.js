import { useEffect, useReducer } from 'react';

// Initial state
const initialApiState = {
    data: null,
    isLoading: false,
    error: null,
}

function apiReducer(state, action) {
    if (action.type === 'API_INTERACTION') {
        return {
            ...state,
            isLoading: state.data ? false : true,
            error: null,
            success: null
        }
    }

    if (action.type === 'API_SUCCESS') {
        return {
            data: action.payload,
            isLoading: null,
            error: null,
        }
    }

    if (action.type === 'API_ERROR') {
        return {
            data: null,
            isLoading: null,
            error: action.payload,
        }
    }

    return initialApiState;
}

function useApi(url, method, body) {
    const [apiState, dispatch] = useReducer(apiReducer, initialApiState);

    const apiInteraction = useCallback(async function apiInteraction() {

        dispatch({ type: 'API_INTERACTION' });

        try {
            const response = fetch(url, {
                method: method,
                body: JSON.stringify({ body }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!reponse.ok) {
                throw new Error('API Interaction Failed');

            }

            const apiInteractionResult = await response.json();

            dispatch({ type: 'API_SUCCESS', payload: apiInteractionResult })

        } catch (error) {
            dispatch({ type: 'API_ERROR', payload: error });
        }
    }, []);

    useEffect(function () {
        apiInteraction();
    }, [apiInteraction]);

    return [apiState, apiInteraction];
}