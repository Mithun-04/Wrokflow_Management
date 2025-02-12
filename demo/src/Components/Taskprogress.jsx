

  const CardLayout = () => {
    const layoutStyle = {
      display: "grid",
      gridTemplateAreas: `
        "completion task updates"
        "status task updates"
      `,
      gridTemplateColumns: "1fr 1.5fr 1fr",
      gridTemplateRows: "1fr 1.5fr",
      gap: "10px",
      padding: "20px",
      height: "450px",
      fontFamily: "'Roboto Mono', serif",
    };

    const cardStyle = {
      backgroundColor: "#4c4847",
      borderRadius: "20px",
      padding: "10px",
      color: "white",
      fontFamily: "'Roboto Mono', serif",
      transform: "perspective(1000px) translateZ(0)", // Enable 3D perspective
      transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Initial shadow
    };

    const cardHoverStyle = {
      transform: "perspective(1000px) translateZ(20px)", // Elevate on hover
      boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)", // Increase shadow on hover
    };

    const middleStyle = {
      gridArea: "task",
      display: "grid",
      gridTemplateRows: "1fr 1fr 1fr",
      gap: "10px",
      height: "100%",
      fontFamily: "'Roboto Mono', serif",
    };

    const circleStyle = {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: `conic-gradient(#EC540D 67%, grey 0)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      fontWeight: "bold",
      color: "white",
      fontFamily: "'Roboto Mono', serif",
    };

    const percentageCardStyle = {
      ...cardStyle,
      gridArea: "completion",
      flexDirection: "column",
    };

    const progressBarContainer = {
      width: "100%",
      backgroundColor: "lightgrey",
      borderRadius: "10px",
      overflow: "hidden",
      height: "10px",
      marginTop: "5px",
      fontFamily: "'Roboto Mono', serif",
    };

    const progressBar = (width, color) => ({
      width: width,
      height: "100%",
      backgroundColor: color,
    });

    const taskStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "95%",
      padding: "5px 10px",
      borderRadius: "10px",
      backgroundColor: "#2E2E2E",
      marginBottom: "5px",
      fontFamily: "'Roboto Mono', serif",
    };

    const buttonStyle = {
      display: "inline-block",
      padding: "9px 27px",
      background: "transparent",
      border: "2px solid white",
      borderRadius: "7px",
      color: "white",
      fontSize: "12px",
      fontWeight: 300,
      transition: "all .6s ease",
      fontFamily: "'Roboto Mono', serif",
    };

    const tickIconStyle = {
      fontSize: "18px",
      color: "#4CAF50",
    };

    return (
      <div style={layoutStyle}>
        {/* Overall Completion */}
        <div
          style={{
            ...percentageCardStyle,
            ":hover": cardHoverStyle,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = cardHoverStyle.transform;
            e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = cardStyle.transform;
            e.currentTarget.style.boxShadow = cardStyle.boxShadow;
          }}
        >
          <div style={circleStyle}>67%</div>
          <p>Overall Completion 67%</p>
        </div>

        {/* Teammates Status */}
        <div
          style={{
            ...cardStyle,
            gridArea: "status",
            alignItems: "flex-start",
            padding: "15px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = cardHoverStyle.transform;
            e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = cardStyle.transform;
            e.currentTarget.style.boxShadow = cardStyle.boxShadow;
          }}
        >
          <p style={{ marginBottom: "5px" }}>Teammates Status</p>
          <div style={{ width: "100%" }}>
            <p>Surya 80%</p>
            <div style={progressBarContainer}>
              <div style={progressBar("80%", "#EC540D")}></div>
            </div>
            <p>Mithun 50%</p>
            <div style={progressBarContainer}>
              <div style={progressBar("50%","#EC540D")}></div>
            </div>
            <p>Simritha</p>
            <div style={progressBarContainer}>
              <div style={progressBar("30%", "#EC540D")}></div>
            </div>
          </div>
        </div>

        {/* Middle Section with 3 Equal Cards */}
        <div style={middleStyle}>
          {/* Your Task Card with Tasks & "Mark as Completed" Buttons */}
          <div
            style={{
              ...cardStyle,
              alignItems: "flex-start",
              padding: "15px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = cardHoverStyle.transform;
              e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = cardStyle.transform;
              e.currentTarget.style.boxShadow = cardStyle.boxShadow;
            }}
          >
            <p>Your Tasks</p>
            <div style={{ width: "100%" }}>
              <div style={taskStyle}>
                <span>Check acces control list</span>
                <button style={buttonStyle}>Mark as Completed</button>
              </div>
              <div style={taskStyle}>
                <span>Verify synchronization</span>
                <button style={buttonStyle}>Mark as Completed</button>
              </div>
              <div style={taskStyle}>
                <span>Run launch tests</span>
                <button style={buttonStyle}>Mark as Completed</button>
              </div>
            </div>
          </div>

          <div
            style={{
              ...cardStyle,
              alignItems: "flex-start",
              padding: "15px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = cardHoverStyle.transform;
              e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = cardStyle.transform;
              e.currentTarget.style.boxShadow = cardStyle.boxShadow;
            }}
          >
            <p>Completed Works</p>
            <div style={{ width: "100%" }}>
              <div style={taskStyle}>
                <span>Construct basic template</span>
                <span style={tickIconStyle}>✔️</span>
              </div>
              <div style={taskStyle}>
                <span>Iterate design</span>
                <span style={tickIconStyle}>✔️</span>
              </div>
            </div>
          </div>

          <div
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = cardHoverStyle.transform;
              e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = cardStyle.transform;
              e.currentTarget.style.boxShadow = cardStyle.boxShadow;
            }}
          >
            Deadline
            <p>Due on 12th August 2021</p>
          </div>
        </div>

        {/* Updates Log */}
        <div
          style={{
            ...cardStyle,
            gridArea: "updates",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = cardHoverStyle.transform;
            e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = cardStyle.transform;
            e.currentTarget.style.boxShadow = cardStyle.boxShadow;
          }}
        >
          Notes
        </div>
        <div
          style={{
            ...cardStyle,
            gridArea: "updates",
            padding: "15px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = cardHoverStyle.transform;
            e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = cardStyle.transform;
            e.currentTarget.style.boxShadow = cardStyle.boxShadow;
          }}
        >
          <p>Notes</p>
          <textarea
            style={{
              width: "100%",
              height: "350px",
              borderRadius: "10px",
              padding: "5px",
              backgroundColor: "#2E2E2E",
              color:"white"
            }}
            placeholder="Write your notes here..."
          ></textarea>
        </div>
      </div>
    );
  };

  export default CardLayout;