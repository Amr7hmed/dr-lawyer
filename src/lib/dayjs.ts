// src/lib/dayjs.ts or src/utils/dayjs.ts
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
// import "dayjs/locale/fr";

dayjs.extend(relativeTime);

export default dayjs;
