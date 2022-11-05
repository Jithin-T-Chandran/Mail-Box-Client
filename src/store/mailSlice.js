import { createSlice } from "@reduxjs/toolkit";

const intialMailState = { inboxItems: [], mail: {}, totalNotOpened: 0 };

const mailSlice = createSlice({
    name: "mail",
    initialState: intialMailState,
    reducers: {
        replaceMail(state, action) {
            state.mail = action.payload;
        },
        countNotOpened(state, action) {
            state.totalNotOpened = action.payload;
        },
        replaceInboxItems(state, action) {
            state.inboxItems = action.payload;
        },
        addMail(state, action) {
            state.inboxItems.push(action.payload);
        },
        openMail(state, action) {
            const openedMailIndex = state.inboxItems.findIndex((item) => item.key === action.payload);
            let updatedMail;
            const openedMail = state.inboxItems[openedMailIndex];
            if (openedMailIndex !== undefined) {
                const updatedItem = {
                    ...openedMail,
                    isOpen: true,
                };
                updatedMail = [...state.inboxItems];
                updatedMail[openedMailIndex] = updatedItem;
                state.inboxItems = updatedMail;
            }
        },
        deleteMail(state, action) {
            const index = state.inboxItems.findIndex((item) => item.key === action.payload);
            state.inboxItems.splice(index, 1);
        }
    }
});


export const mailActions = mailSlice.actions;

export default mailSlice;

