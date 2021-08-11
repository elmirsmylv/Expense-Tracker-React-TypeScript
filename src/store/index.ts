import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import categoryReducer from "./reducers/categoryReducer";
import { UserState } from "../types/user";
import { CategoryState } from "../types/category";
import { RecordState } from "../types/record";
import recordReducer from "./reducers/recordReducer";

export interface AppState {
  user: UserState;
  records: RecordState;
  categories: CategoryState;
}

const rootReducer = combineReducers<AppState>({
  user: userReducer,
  records: recordReducer,
  categories: categoryReducer,
});

export default rootReducer;
