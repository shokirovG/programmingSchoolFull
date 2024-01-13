const initialState = {
  currentMonth: "",
  loading: "loading",
  students: [],
  spinnerLoader: "none",
  hisobot: [],
  majburiyChiqimlar: [],
};

function reducers(state = initialState, action) {
  switch (action.type) {
    case "changeMonth": {
      return {
        ...state,
        currentMonth: action.payload,
      };
    }
    case "fetchingStudents": {
      return {
        ...state,
        loading: "loading",
      };
    }
    case "fetchedStudents": {
      return {
        ...state,
        students: action.payload,
        loading: "loaded",
      };
    }
    case "addStudent": {
      return {
        ...state,
        students: [...state.students, action.payload],
        loading: "loaded",
      };
    }
    case "loaded": {
      return {
        ...state,
        loading: "loaded",
      };
    }
    case "spinnerLoading": {
      return {
        ...state,
        spinnerLoader: "loading",
      };
    }
    case "spinnerLoaded": {
      return {
        ...state,
        spinnerLoader: "loaded",
      };
    }
    case "hisobotFetched": {
      return {
        ...state,
        loading: "loaded",
        hisobot: action.payload,
      };
    }
    case "addTodo": {
      // const newHisobot = state.hisobot.map((elem) => {
      //   if (elem.month === action.payload.month) {
      //     return {
      //       ...elem,
      //       hisoblar: action.payload.newTodo,
      //     };
      //   } else {
      //     return elem;
      //   }
      // });
      return {
        ...state,
        hisobot: [
          { hisoblar: action.payload.newTodo, month: action.payload.month },
        ],
      };
    }
    case "fetchedMajburiy": {
      return {
        ...state,
        majburiyChiqimlar: action.payload,
      };
    }
    default:
      return state;
  }
}

export default reducers;
