export const selectStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: "10px",
    borderColor: state.isFocused ? "#00bfa6" : "#bbb",
    boxShadow: state.isFocused
      ? "0 0 6px rgba(0,191,166,0.4)"
      : "none",
    "&:hover": { borderColor: "#00bfa6" },
    minHeight: "38px",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "10px",
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: "150px",
    overflowY: "auto",
  }),
};
