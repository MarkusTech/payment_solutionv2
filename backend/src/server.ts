import app from "./app";
import * as colors from "colors";

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(
    colors.yellow.bold(`Server is running on http://localhost:${PORT}`)
  );
});
