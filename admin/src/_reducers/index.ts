import { combineReducers } from "redux";
import user from "./user_reducer";
import newFamily from "./newFamily_reducer";
import graceShare from "./graceShare_reducer";
import letters from "./letter_reducer";
import pray from "./pray_reducer";
import worship from "./worship_reducer";

const rootReducer = combineReducers({
  user,
  newFamily,
  graceShare,
  letters,
  pray,
  worship,
});

export default rootReducer;
