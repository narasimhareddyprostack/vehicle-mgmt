
const initialState = [];

function accountReducer(accounts = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case 'CREATE_ACCOUNT':
            return [...accounts, payload];

        case 'RETRIEVE_ACCOUNTS':
            return payload;

        case 'UPDATE_ACCOUNT':
            return accounts.map((account) => {
                if (account.id === payload.id) {
                    return {
                        ...account,
                        ...payload,
                    };
                } else {
                    return account;
                }
            });

        case 'DELETE_ACCOUNT':
            return accounts.filter(({ id }) => id !== payload.id);

        default:
            return accounts;
    }
};

export default accountReducer;