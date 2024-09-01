import app, { init } from "@/app";

const port = +process.env.PORT || 3000;

init().then(() => {
  app.listen(port, () => {
  });
});