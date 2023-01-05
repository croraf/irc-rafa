export const UsersList = () => {
  return (
    <div
      style={{
        width: "150px",
        display: "flex",
        flexDirection: "column",
        padding: "0.5rem",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            marginBottom: "0.5rem",
            fontWeight: "bold",
          }}
        >
          Admins - 1
        </div>
        <div style={{ flexGrow: 2 }}>croraf</div>
      </div>

      <div>
        <div
          style={{
            marginBottom: "0.5rem",
            fontWeight: "bold",
          }}
        >
          Online - 2
        </div>
        <div style={{ flexGrow: 2 }}>test1</div>
        <div style={{ flexGrow: 2 }}>test12</div>
      </div>
    </div>
  );
};
