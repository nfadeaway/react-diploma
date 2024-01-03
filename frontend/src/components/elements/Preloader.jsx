const Preloader = (props) => {

  return (
    <>
      {props.title && props.title}
      <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};

export default Preloader;