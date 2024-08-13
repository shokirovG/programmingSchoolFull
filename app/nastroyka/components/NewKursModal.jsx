import Spinner from "@/app/components/Students/Spinner";
import { addKurs } from "@/app/redux/features/kursSlice";
import {
  spinnerLoaded,
  spinnerLoading,
} from "@/app/redux/features/loaderSlice";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
function NewKursModal({ show, handleClose }) {
  const [kursName, setKursName] = useState("");
  const [kursPrice, setKursPrice] = useState("");
  const [errorKurs, setErrorKurs] = useState(false);
  const [validInput, setValidInput] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const addKursForm = (e) => {
    e.preventDefault();
    if (!kursName || !kursPrice) {
      setTimeout(() => {
        setValidInput(false);
      }, 3000);
      return setValidInput(true);
    }

    const findKurs = store.kurs.kurses.findIndex(
      (item) => item.kurs === kursName
    );
    if (findKurs < 0) {
      dispatch(spinnerLoading());
      dispatch(
        addKurs({
          kursName,
          kursPrice,
          month: localStorage.getItem("currentMonth"),
        })
      );
      setKursName("");
      setKursPrice("");
      setErrorKurs(false);
      setValidInput(false);
      // dispatch(spinnerLoaded());
      toast.success(kursName + " kursi qo`shildi!");
    } else {
      setErrorKurs(true);
      setTimeout(() => {
        setErrorKurs(false);
      }, 2000);
    }
  };
  console.log("loader", store.loader.spinnerLoader);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Yangi Kurs qo`shish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-[15px]" onSubmit={addKursForm}>
            <input
              type="text"
              placeholder="kurs nomi"
              className="bg-white shadow rounded p-[10px]"
              value={kursName}
              onChange={(e) => {
                setKursName(e.target.value);
              }}
            />
            <input
              type="number"
              placeholder="kurs narxi"
              className="bg-white shadow rounded p-[10px]"
              value={kursPrice}
              onChange={(e) => {
                setKursPrice(e.target.value);
              }}
            />
          </form>
          {errorKurs ? (
            <span className="text-red-500 mt-[10px]">
              Ushbu nomdagi kurs mavjud!
            </span>
          ) : null}
          {validInput ? (
            <span className="text-red-500 mt-[20px]">
              formani to`liq to`ldiring
            </span>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          {store.loader.spinnerLoader === "loading" ? (
            <Spinner />
          ) : (
            <Button variant="primary" onClick={addKursForm}>
              Saqlash
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewKursModal;
