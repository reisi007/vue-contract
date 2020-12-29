import {Store} from 'vuex'

export function initStore() {
    return new Store({
        state: {
            readOnlyMode: false,
            acceptedSteps: 0,
            email: ''
        },
        mutations: {
            plus(state) {
                state.acceptedSteps++;
            },
            minus(state) {
                state.acceptedSteps--;
            },
            changeEMail(state, email) {
                state.email = email;
            },
            enforceReadOnly(state) {
                state.readOnlyMode = true;
            }
        }
    })
}