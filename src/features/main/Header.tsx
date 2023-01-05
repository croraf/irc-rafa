export const Header = ({
  activeChannel,
}: {
  activeChannel: string | undefined;
}) => {
  if (activeChannel === undefined) {
    return null;
  }

  return (
    <>
      <div>{activeChannel}</div>
      <div
        style={{
          height: "80%",
          width: "1px",
          background: "gray",
          margin: "0rem 0.5rem",
        }}
      />
      <div style={{ fontSize: "0.9rem", opacity: "0.7" }}>
        This is a channel for Ubuntu LTS support.
      </div>
    </>
  );
};
