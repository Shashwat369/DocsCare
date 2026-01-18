import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2 style={styles.title}>Page Not Found</h2>
      <p style={styles.text}>
        Sorry, the page you are looking for doesn’t exist.
      </p>

      <Link to="/" style={styles.button}>
        Go Back Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cdefe2d2",
    textAlign: "center",
  },
  code: {
    fontSize: "96px",
    fontWeight: "bold",
    color: "#05715a",
  },
  title: {
    fontSize: "28px",
    marginBottom: "10px",
    color: "#484849"
  },
  text: {
    color: "#6b7280",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    background: "#1d836d",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default NotFound;
