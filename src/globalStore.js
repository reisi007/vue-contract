import {Store} from 'vuex'

export function initStore() {
    return new Store({
        state: {
            readOnlyMode: false,
            steps: 0,
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
            addStep(state) {
                state.steps++;
            },
            removeStep(state) {
                state.steps--;
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