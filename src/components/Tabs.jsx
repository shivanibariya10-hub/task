const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      {["Profile", "Security", "Settings"].map((tab) => (
        <button
          key={tab}
          className={activeTab === tab ? "tab active" : "tab"}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
