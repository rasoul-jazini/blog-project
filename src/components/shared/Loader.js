import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "1000px",
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <TailSpin height="100" width="100" color="grey" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
