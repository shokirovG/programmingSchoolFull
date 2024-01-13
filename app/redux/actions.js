const changeMonthAction = (month) => {
  return {
    type: "changeMonth",
    payload: month,
  };
};

const fetchingStudents = () => {
  return {
    type: "fetchingStudents",
  };
};
const fetchedStudents = (students) => {
  return {
    type: "fetchedStudents",
    payload: students,
  };
};
const addStudent = (student) => {
  return {
    type: "addStudent",
    payload: student,
  };
};
const loaded = () => {
  return {
    type: "loaded",
  };
};
const spinnerLoading = () => {
  return {
    type: "spinnerLoading",
  };
};
const spinnerLoaded = () => {
  return {
    type: "spinnerLoaded",
  };
};
const hisobotFetched = (hisobot) => {
  return {
    type: "hisobotFetched",
    payload: hisobot,
  };
};
const addTodo = (month, newTodo) => {
  return {
    type: "addTodo",
    payload: { month, newTodo },
  };
};
const fetchedMajburiy = (chiqimlar) => {
  return {
    type: "fetchedMajburiy",
    payload: chiqimlar,
  };
};
export {
  changeMonthAction,
  loaded,
  fetchingStudents,
  fetchedStudents,
  addStudent,
  spinnerLoaded,
  spinnerLoading,
  hisobotFetched,
  addTodo,
  fetchedMajburiy,
};
