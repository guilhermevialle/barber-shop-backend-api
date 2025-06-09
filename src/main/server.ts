// app.listen({ port: 3030 }, () => console.log("Server running on port 3030"));

import { Time } from "@/domain/value-objects/time.vo";

(async () => {
  try {
    const time = Time.create("08:302");
    console.log(time);
  } catch (error: any) {
    console.log(error.message, error.name);
  }
})();
