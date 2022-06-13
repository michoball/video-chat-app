import { createSelector } from "reselect";

const selectRtmReducer = (state) => state.rtm;

export const selectRtmClient = createSelector(
  [selectRtmReducer],
  (rtm) => rtm.rtmClient
);

export const selectRtmChannel = createSelector(
  [selectRtmReducer],
  (rtm) => rtm.channel
);

export const selectRtmMessages = createSelector(
  [selectRtmReducer],
  (rtm) => rtm.messages
);

// export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
//   cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
// );

// export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
//   cartItems.reduce(
//     (total, cartItem) => total + cartItem.quantity * cartItem.price,
//     0
//   )
// );
