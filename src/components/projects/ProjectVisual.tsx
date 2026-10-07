import type { ProjectVisualKey } from "@/types";
import { PitchFightVisual } from "./PitchFightVisual";
import { JurisCodeVisual } from "./JurisCodeVisual";
import { TeamSyncVisual } from "./TeamSyncVisual";
import { FCVVisual } from "./FCVVisual";
import { BatteryVisual } from "./BatteryVisual";

/** Maps a project's `visual` key to its bespoke diagram. */
export function ProjectVisual({ kind, className }: { kind: ProjectVisualKey; className?: string }) {
  switch (kind) {
    case "pitchfight":
      return <PitchFightVisual className={className} />;
    case "juriscode":
      return <JurisCodeVisual className={className} />;
    case "teamsync":
      return <TeamSyncVisual className={className} />;
    case "fcv":
      return <FCVVisual className={className} />;
    case "battery":
      return <BatteryVisual className={className} />;
  }
}
