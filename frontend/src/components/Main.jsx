import Banner from './elements/Banner.jsx';

const Main = (props) => {

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner/>
          {props.sections.length > 0 && props.sections.map(section => section)}
        </div>
      </div>
    </main>
  );
};

export default Main;