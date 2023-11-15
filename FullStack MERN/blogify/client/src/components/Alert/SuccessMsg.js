import { useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { resetSuccessAction } from "../../redux/slices/globalSlice/globalSlice";

const SuccessMsg = ({ message }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Use setTimeout to delay the dispatch until after the rendering phase
    const timer = setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Good Job",
        text: message,
      });
      dispatch(resetSuccessAction());
    }, 0);

    // Cleanup the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, [dispatch, message]);

  // Since the component doesn't render anything, you can return null
  return null;
};

export default SuccessMsg;
