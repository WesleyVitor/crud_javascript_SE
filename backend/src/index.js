import app from "./server.js";
const PORT = process.env.PORT || 3000;
app.listen(PORT).on("listening", () => {
  console.log(`Server is running at ${PORT}`);
});
