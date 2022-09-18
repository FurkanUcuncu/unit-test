import store from "../../../store";
import {fetchDepartments, fetchEmployees} from "../../../store/employeeSlice";

describe('User slice tests', () => {
  it('getCurrentUser call', () => {
    store.dispatch(fetchEmployees());
  });

  it('currentUserUpdate call', () => {
    store.dispatch(fetchDepartments());
  });
});
