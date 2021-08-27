import { RecordAction, RecordState } from "../../types/record";

const initialState: RecordState = {
  data: [],
  loading: false,
  error: "",
};

const recordReducer = (
  state: RecordState = initialState,
  action: RecordAction
): RecordState => {
  switch (action.type) {
    case "GET_RECORDS_START":
      return { ...state, loading: true, error: "" };
    case "GET_RECORDS_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "GET_RECORDS_ERROR":
      return { ...state, loading: false, error: "Records fethcing failed" };
    case "ADD_RECORD_START":
      return { ...state, loading: true, error: "" };
    case "ADD_RECORD_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [action.payload, ...state.data],
      };
    case "ADD_RECORD_ERROR":
      return { ...state, loading: false, error: "Record adding failed" };
    case "UPDATE_RECORD_START":
      return { ...state, loading: true, error: "" };
    case "UPDATE_RECORD_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.map((record) => {
          return record.id === action.payload.id ? action.payload : record;
        }),
      };
    case "UPDATE_RECORD_ERROR":
      return { ...state, loading: false, error: "Record updating failed" };
    case "DELETE_RECORD_START":
      return { ...state, loading: true, error: "" };
    case "DELETE_RECORD_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.filter((record) => {
          return record.id !== action.payload;
        }),
      };
    case "DELETE_RECORD_ERROR":
      return { ...state, loading: false, error: "Record deleting failed" };
    default:
      return state;
  }
};

export default recordReducer;
