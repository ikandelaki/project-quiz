import "../styles/StartMenu.css";

const StartMenu = ({ start, setStart }) => {
  return (
    <div className={`start-menu menu-container ${start ? "disabled" : ""}`}>
      <h1 className='start-heading'>INSURANCE</h1>
      <h2 className='start-heading-description'>
        Take the test and insure the risk of getting a low grade!
      </h2>
      <div className='btn start-btn' onClick={() => setStart(true)}>
        Start
      </div>
    </div>
  );
};

export default StartMenu;
