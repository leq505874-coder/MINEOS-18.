import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

const TRACK = "mineos.music.track1";

function showHome(player) {
  new ActionFormData()
    .title("iPhone 18")
    .body("MINEOS 18")
    .button("Music Player")
    .show(player)
    .then((r) => {
      if (!r.canceled && r.selection === 0) showMusic(player);
    });
}

function showMusic(player) {
  new ActionFormData()
    .title("Music Player")
    .body("Track 1")
    .button("Phát")
    .button("Dừng")
    .show(player)
    .then((r) => {
      if (r.canceled) return;
      if (r.selection === 0) player.playSound(TRACK, { volume: 1.0 });
      if (r.selection === 1) player.runCommand("stopsound @s " + TRACK);
      showMusic(player);
    });
}

world.afterEvents.itemUse.subscribe((ev) => {
  if (ev.itemStack.typeId === "mineos:iphone_18") showHome(ev.source);
});
