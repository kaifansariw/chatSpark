import "./Settings.css";
import { useEffect, useState } from "react";

function Settings() {
  const [lightMode, setLightMode] = useState(false);
  const [showHistory, setShowHistory] = useState(true);

  useEffect(() => {
    const savedSettings =
      JSON.parse(localStorage.getItem("settings")) || {};

    setLightMode(savedSettings.lightMode || false);
    setShowHistory(
      savedSettings.showHistory !== false
    );
  }, []);

  const saveSettings = () => {
    const settings = {
      lightMode,
      showHistory,
    };

    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

    alert("Settings Saved");
  };

  return (
    <div className="settingsPage">
      <div className="settingsWrapper">

        <h1>Settings</h1>

        <div className="settingsCard">

          <div className="settingItem">
            <label>Light Mode</label>

            <input
              type="checkbox"
              checked={lightMode}
              onChange={() =>
                setLightMode(!lightMode)
              }
            />
          </div>

          <div className="settingItem">
            <label>Show Chat History</label>

            <input
              type="checkbox"
              checked={showHistory}
              onChange={() =>
                setShowHistory(!showHistory)
              }
            />
          </div>

          <button
            className="saveBtn"
            onClick={saveSettings}
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}

export default Settings;