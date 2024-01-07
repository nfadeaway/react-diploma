const ErrorContentLoader = (props) => {

  const reloadData = () => {
    props.reloadData();
  };

  return (
    <div className="error-content-loader">
      Ошибка связи с сервером. Нажмите <span className="material-symbols-outlined" onClick={reloadData}>refresh</span> чтобы обновить данные.
    </div>
  );
};

export default ErrorContentLoader;