import { defineProviderDocument } from "../../definitions";

import { llms } from "./llms";
import { provider } from "./provider";
import { stt } from "./stt";
import { tts } from "./tts";

export default defineProviderDocument({
  provider,
  llms,
  stt,
  tts,
});
