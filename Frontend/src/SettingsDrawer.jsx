import "./SettingsDrawer.css";

function SettingsDrawer({
  showSettings,
  setShowSettings,
  lightMode,
  setLightMode,
  showHistory,
  setShowHistory,
  saveSettings
}) 

{
  return (
    <>
      {showSettings && (
        <>
          <div
            className="settingsOverlay"
            onClick={() => setShowSettings(false)}
          />

          <div className="settingsDrawer">

            <div className="drawerHeader">
              <h2>Settings</h2>

              <button
                onClick={() => setShowSettings(false)}
              >
                ✕
              </button>
            </div>

            <div className="settingRow">
              <label>Light Mode</label>

              <input
                type="checkbox"
                checked={lightMode}
                onChange={() =>
                  setLightMode(!lightMode)
                }
              />
            </div>

            <div className="settingRow">
              <label>Show Chat History</label>

              <input type="checkbox" checked={showHistory} onChange={() =>setShowHistory(!showHistory)} />
            </div>

            <button className="saveBtn" onClick={saveSettings}>
              Save Changes
            </button>

          </div>
        </>
      )}
    </>
  );
}

export default SettingsDrawer;