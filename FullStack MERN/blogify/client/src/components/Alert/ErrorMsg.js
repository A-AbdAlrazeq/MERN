import { useEffect } from "react";
import Swal from "sweetalert2";
import { resetErrorAction } from "../../redux/slices/globalSlice/globalSlice";
import { useDispatch } from "react-redux";
const ErrorMsg = ({ message }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: message,
      });
      dispatch(resetErrorAction());
    }, 0);

    return () => clearTimeout(timer);
  }, [dispatch, message]);

  return null;
};

export default ErrorMsg;
