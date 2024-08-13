import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "@/node_modules/next/image";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import { editKurs } from "@/app/redux/features/kursSlice";
import { spinnerLoading } from "@/app/redux/features/loaderSlice";
import Spinner from "@/node_modules/react-bootstrap/esm/Spinner";
import { toast } from "react-toastify";
function KursEditModal({ kurs, price, _id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [kursName, setKursName] = useState(kurs);
  const [kursPrice, setKursPrice] = useState(price);
  const [errorKurs, setErrorKurs] = useState(false);
  const [validInput, setValidInput] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const editKursForm = (e) => {
    // e.preventDefault();
    const findKurs = store.kurs.kurses.findIndex((el) => el.kurs === kursName);
    // if (findKurs >= 0) {
    //   setTimeout(() => {
    //     setErrorKurs(false);
    //   }, 2000);
    //   return setErrorKurs(true);
    // }
    if (!kursName || !kursPrice) {
      setTimeout(() => {
        setValidInput(false);
      }, 2000);
      return setValidInput(true);
    }
    const updateKurs = {
      kurs: kursName,
      price: kursPrice,
      _id,
    };
    dispatch(spinnerLoading());
    dispatch(editKurs(updateKurs));
    toast.success("kurs yangilandi!");
  };
  return (
    <>
      {" "}
      <Image
        src="/edit.png"
        width="18"
        height="18"
        alt="#"
        className="cursor-pointer"
        onClick={handleShow}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kursni tahrirlash</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-[15px]" onSubmit={editKursForm}>
            <div className="flex gap-[20px] items-center">
              <label htmlFor="kurs nomi"> kurs nomi</label>
              <input
                type="text"
                placeholder="kurs nomi"
                className="bg-white shadow rounded p-[10px] w-[80%]"
                value={kursName}
                onChange={(e) => {
                  setKursName(e.target.value);
                }}
              />
            </div>
            <div className="flex gap-[20px] items-center">
              <label htmlFor="kurs narxi">kurs narxi</label>
              <input
                type="number"
                placeholder="kurs narxi"
                className="bg-white shadow rounded p-[10px]  w-[80%]"
                value={kursPrice}
                onChange={(e) => {
                  setKursPrice(e.target.value);
                }}
              />
            </div>
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
            <Button
              variant="primary"
              onClick={() => {
                editKursForm();
              }}
            >
              Tahrirlash
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default KursEditModal;
