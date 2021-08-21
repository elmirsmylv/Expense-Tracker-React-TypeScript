import { Record, RecordDispatch, RecordForm } from "../../types/record";
import api from "../../utils/api";

export const getRecords = () => async (dispatch: RecordDispatch) => {
  dispatch({ type: "GET_RECORDS_START" });
  try {
    const { data } = await api.get("/records");
    dispatch({ type: "GET_RECORDS_SUCCESS", payload: data });
  } catch {
    dispatch({ type: "GET_RECORDS_ERROR" });
  }
};

export const addRecord =
  (record: RecordForm) => async (dispatch: RecordDispatch) => {
    dispatch({ type: "ADD_RECORD_START" });
    try {
      const { data } = await api.post<Record>("/records", record);
      dispatch({ type: "ADD_RECORD_SUCCESS", payload: data });
    } catch {
      dispatch({ type: "ADD_RECORD_ERROR" });
    }
  };
